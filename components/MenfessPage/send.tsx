"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Clock3, ImagePlus, Send, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { getMenfessTextLength } from "@/lib/menfess-text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

let visitorIdPromise: Promise<string> | null = null;

const getVisitorId = async () => {
  if (!visitorIdPromise) {
    visitorIdPromise = import("@fingerprintjs/fingerprintjs").then(
      async ({ default: FingerprintJS }) => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
      },
    );
  }

  try {
    return await visitorIdPromise;
  } catch (error) {
    visitorIdPromise = null;
    throw error;
  }
};

type ImageAttachment = {
  id: string;
  file: File;
  previewUrl: string;
};

type SignedImageUpload = {
  key: string;
  url: string;
  contentType: string;
};

const MAX_IMAGE_BYTES = 1_048_576;
const MAX_IMAGES = 4;
const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const SendMenfess = ({
  mode,
  onSubmitted,
  onClose,
}: {
  mode: "guest" | "sso";
  onSubmitted?: () => void;
  onClose: () => void;
}) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [attachments, setAttachments] = useState<ImageAttachment[]>([]);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const attachmentsRef = useRef<ImageAttachment[]>([]);
  const characterCount = getMenfessTextLength(from, to, message);

  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  useEffect(
    () => () => {
      attachmentsRef.current.forEach((attachment) =>
        URL.revokeObjectURL(attachment.previewUrl),
      );
    },
    [],
  );

  const addImages = (files: FileList | File[]) => {
    const validFiles: File[] = [];
    let rejectedCount = 0;

    Array.from(files).forEach((file) => {
      if (!SUPPORTED_IMAGE_TYPES.has(file.type) || file.size === 0) {
        rejectedCount += 1;
      } else if (file.size > MAX_IMAGE_BYTES) {
        rejectedCount += 1;
      } else {
        validFiles.push(file);
      }
    });

    const availableSlots = Math.max(0, MAX_IMAGES - attachments.length);
    const filesToAdd = validFiles.slice(0, availableSlots);
    const skippedForLimit = validFiles.length - filesToAdd.length;

    if (rejectedCount > 0) {
      toast.error("Only JPG, PNG, WebP, or GIF images up to 1 MB are allowed.");
    }
    if (skippedForLimit > 0) {
      toast.error("You can attach up to 4 images.");
    }

    const newAttachments = filesToAdd.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
    setAttachments((current) => [...current, ...newAttachments]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingFiles(false);
    if (isSubmitting) return;
    if (event.dataTransfer.files.length > 0) {
      addImages(event.dataTransfer.files);
    }
  };

  const handleSend = async () => {
    if (to.length === 0 || from.length === 0 || message.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    if (characterCount > 280) {
      toast.error(
        "Menfess must not exceed 280 characters, including From/To labels.",
      );
      return;
    }

    const loader = toast.loading(
      attachments.length > 0
        ? "Uploading images..."
        : mode === "guest"
          ? "Submitting..."
          : "Sending menfess...",
    );

    setIsSubmitting(true);

    let fingerprint: string;

    try {
      fingerprint = await getVisitorId();
    } catch (error) {
      console.error("Failed to get visitor fingerprint:", error);
      toast.error("Failed to identify your browser", {
        id: loader,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      let imageKeys: string[] = [];

      if (attachments.length > 0) {
        const uploadUrlResponse = await fetch("/api/menfess/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            files: attachments.map(({ file }) => ({
              contentType: file.type,
              size: file.size,
            })),
          }),
        });
        const uploadUrlData = await uploadUrlResponse.json();

        if (!uploadUrlResponse.ok || !uploadUrlData.success) {
          throw new Error(uploadUrlData.message || "Failed to prepare image upload");
        }

        const uploads = uploadUrlData.data as SignedImageUpload[];
        const uploadedKeys = await Promise.all(
          uploads.map(async (upload, index) => {
            const response = await fetch(upload.url, {
              method: "PUT",
              headers: { "Content-Type": upload.contentType },
              body: attachments[index].file,
            });

            if (!response.ok) {
              throw new Error("An image could not be uploaded");
            }

            return upload.key;
          }),
        );
        imageKeys = uploadedKeys;
      }

      toast.loading(
        mode === "guest" ? "Submitting for review..." : "Sending menfess...",
        { id: loader },
      );

      const res = await fetch("/api/menfess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          from,
          message,
          fingerprint,
          mode,
          imageKeys,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(mode === "guest" ? "Sent for review" : "Menfess sent", {
          id: loader,
        });
        setTo("");
        setFrom("");
        setMessage("");
        attachments.forEach((attachment) =>
          URL.revokeObjectURL(attachment.previewUrl),
        );
        setAttachments([]);
        onSubmitted?.();
      } else {
        toast.error(data.message || "Failed to send menfess", {
          id: loader,
        });
      }
    } catch (error) {
      console.error("Error sending menfess:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to send menfess",
        {
        id: loader,
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full p-10 max-lg:p-8 flex flex-col gap-4 max-sm:p-6 bg-[#03045e] border bg-opacity-30 rounded-2xl text-white ${
        mode === "guest" ? "border-amber-200/35" : "border-indigo-200/35"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-sfPro font-medium leading-tight text-slate-100 text-base sm:text-lg md:text-xl lg:text-2xl">
            {mode === "guest" ? "Send as guest" : "Send Menfess"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close menfess form"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-[background-color,color,transform] duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="flex max-sm:flex-col gap-4">
        {/* From */}
        <div className="flex flex-col gap-1 w-full">
          <p className="text-xs text-slate-400">From</p>
          <div className="relative">
            <Input
              className="bg-transparent border-[#717174]"
              type="text"
              placeholder="Who’s this from?"
              onChange={(e) => {
                setFrom(e.target.value);
              }}
              value={from}
              disabled={isSubmitting}
            />
          </div>
        </div>
        {/* End From */}
        {/* To */}
        <div className="flex flex-col gap-1 w-full">
          <p className="text-xs text-slate-400">To</p>
          <div className="relative">
            <Input
              className="bg-transparent border-[#717174]"
              type="text"
              placeholder="Who’s this for?"
              onChange={(e) => {
                setTo(e.target.value);
              }}
              value={to}
              disabled={isSubmitting}
            />
          </div>
        </div>
        {/* End To */}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-400">Message</p>
          <p
            className={`text-xs ${characterCount > 280 ? "text-red-400" : "text-slate-500"}`}
          >
            {characterCount}/280
          </p>
        </div>
        <Textarea
          className="bg-transparent border-[#717174]"
          placeholder="Type your message here."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-slate-300">Images</p>
          <p className="text-xs text-slate-500">
            Up to 4 · 1 MB each
          </p>
        </div>
        <input
          ref={imageInputRef}
          className="sr-only"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(event) => {
            if (event.target.files) addImages(event.target.files);
            event.target.value = "";
          }}
          disabled={isSubmitting}
          aria-label="Choose images to attach"
        />
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            if (!isSubmitting) setIsDraggingFiles(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            if (!isSubmitting) setIsDraggingFiles(true);
          }}
          onDragLeave={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null,
              )
            ) {
              setIsDraggingFiles(false);
            }
          }}
          onDrop={handleDrop}
          className={`rounded-xl border border-dashed px-4 py-4 transition-[border-color,background-color] duration-150 ease-out motion-reduce:transition-none ${
            isDraggingFiles
              ? "border-indigo-200 bg-indigo-200/10"
              : "border-white/20 bg-white/[0.02]"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-indigo-200">
                <ImagePlus size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-200">
                  Drag images here
                </p>
                <p className="text-xs text-slate-500">
                  JPG, PNG, WebP, or GIF
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled={isSubmitting || attachments.length >= MAX_IMAGES}
              onClick={() => imageInputRef.current?.click()}
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-white/15 px-3 text-sm text-white transition-[background-color,transform] duration-150 ease-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Choose images
            </button>
          </div>
        </div>
        {attachments.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {attachments.map((attachment, index) => (
              <div
                key={attachment.id}
                className="group relative aspect-square overflow-hidden rounded-lg border border-white/15 bg-black/20"
              >
                <img
                  src={attachment.previewUrl}
                  alt={`Selected image ${index + 1} preview`}
                  className="size-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-6">
                  <span className="truncate text-[11px] text-white/85">
                    {attachment.file.name}
                  </span>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      URL.revokeObjectURL(attachment.previewUrl);
                      setAttachments((current) =>
                        current.filter((item) => item.id !== attachment.id),
                      );
                    }}
                    aria-label={`Remove ${attachment.file.name}`}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-black/60 text-white transition-[background-color,transform] duration-150 ease-out hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-1">
        <Tooltip
          delayDuration={100}
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
        >
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={
                mode === "guest"
                  ? "Guest approval details"
                  : "UI SSO posting and privacy details"
              }
              onClick={(event) => {
                event.preventDefault();
                setTooltipOpen(true);
              }}
              className={`inline-flex shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 ${
                mode === "guest" ? "text-amber-200 0" : "text-indigo-200 "
              }`}
            >
              {mode === "guest" ? (
                <Clock3 size={18} aria-hidden="true" />
              ) : (
                <Zap size={18} aria-hidden="true" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            {mode === "guest"
              ? "Guest menfess requires no login but appears after admin approval"
              : "Posts immediately. Your privacy stays protected, and your data is secured with encryption."}
          </TooltipContent>
        </Tooltip>
        <Button
          onClick={handleSend}
          disabled={isSubmitting}
          className="min-h-11 ml-4 w-fit px-4 self-end border bg-slate-400 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-6"
          variant={"secondary"}
          data-umami-event="submit-menfess"
        >
          <Send size={15} aria-hidden="true" />
          {mode === "guest" ? "Submit for review" : "Send"}
        </Button>
      </div>
    </div>
  );
};
export default SendMenfess;
