import {
  ArrowRight,
  CalendarDays,
  MessageCircleMore,
  Trash2,
  Ban,
} from "lucide-react";
import { useState } from "react";
import formatRelativeTime from "@/lib/formatRelativeTime";
import Link from "next/link";
import { briefFamsData } from "@/modules/fams-data";
import { Img } from "react-image";
import { MenfessType } from "./types";
import { ReactionBar } from "./reactionBar";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const MenfessCard = ({
  menfess,
  onCommentClick,
  tokenAdmin,
}: {
  menfess: MenfessType;
  onCommentClick?: (menfess: MenfessType) => void;
  tokenAdmin: string;
}) => {
  const { to, from, message, images, createdAt, _count } = menfess;
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    index: number;
  } | null>(null);
  const [isImageStackExpanded, setIsImageStackExpanded] = useState(false);
  const { comments } = _count;
  const toIsFam = to.startsWith("fams/");
  const recipientFam = toIsFam
    ? briefFamsData.find((fam) => fam.id === to.replace("fams/", ""))
    : undefined;
  const recipientLabel = recipientFam?.["displayed-name"] ?? to;

  const handleDelete = async () => {
    const loadingToast = toast.loading("Deleting menfess...");
    try {
      const res = await fetch("/api/menfess", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenAdmin}`, // Add auth token
        },
        body: JSON.stringify({
          id: menfess.id,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete menfess");
      }
      const resJSON = await res.json();
      toast.dismiss(loadingToast);
      if (!resJSON.success) {
        toast.error("Failed to delete menfess");
      }
      toast.success(
        "Menfess deleted successfully, refresh your page to see the changes",
      );
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to delete menfess");
      console.error("Error deleting menfess:", error);
    }
  };

  const handleBan = async () => {
    const confirmed = window.confirm(
      "Ban this user fingerprint from sending future menfess?",
    );

    if (!confirmed) {
      return;
    }

    const loadingToast = toast.loading("Banning user...");

    try {
      const res = await fetch("/api/menfess-ban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenAdmin}`,
        },
        body: JSON.stringify({
          id: menfess.id,
        }),
      });

      const resJSON = await res.json();

      if (!res.ok || !resJSON.success) {
        throw new Error(resJSON.message || "Failed to ban user");
      }

      toast.success("User banned successfully", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to ban user",
        {
          id: loadingToast,
        },
      );
      console.error("Error banning user:", error);
    }
  };

  return (
    <div className="flex h-full min-h-96 w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#03045e]/35">
      <div className="relative px-5 pb-4 pt-5 max-sm:px-4 max-sm:pt-4">
        {tokenAdmin && (
          <div className="absolute right-4 top-4 flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleBan}
                  aria-label="Ban sender fingerprint"
                  className="inline-flex size-9 items-center justify-center rounded-lg text-slate-300 transition-[background-color,color,transform] duration-150 ease-out hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97]"
                >
                  <Ban size={18} aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Ban sender fingerprint</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleDelete}
                  aria-label="Delete menfess"
                  className="inline-flex size-9 items-center justify-center rounded-lg text-slate-300 transition-[background-color,color,transform] duration-150 ease-out hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97]"
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete menfess</TooltipContent>
            </Tooltip>
          </div>
        )}
        <div
          className={`grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 text-white ${tokenAdmin ? "pr-20" : ""}`}
        >
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 text-[10px] font-medium tracking-[0.08em] text-white/50">
              From
            </span>
            <p
              className="min-w-0 truncate text-base font-semibold leading-snug"
              title={from}
            >
              {from}
            </p>
          </div>
          <ArrowRight size={14} aria-hidden="true" className="text-white/35" />
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 text-[10px] font-medium tracking-[0.08em] text-white/50">
              To
            </span>
            <div className="flex min-w-0 items-center gap-1.5">
              {recipientFam?.["image-filename"] && (
                <Img
                  src={`/${recipientFam["image-filename"]}`}
                  alt=""
                  width={24}
                  height={24}
                  className="size-5 shrink-0 rounded-full object-cover"
                />
              )}
              {toIsFam ? (
                <Link
                  href={`/${to}`}
                  title={recipientLabel}
                  className="min-w-0 truncate text-base font-semibold leading-snug transition-opacity duration-150 ease-out hover:opacity-80"
                  data-umami-event="menfess-redirect-profile"
                  data-umami-event-redirect-to={`/${to}`}
                >
                  {recipientLabel}
                </Link>
              ) : (
                <p
                  className="min-w-0 truncate text-base font-semibold leading-snug"
                  title={to}
                >
                  {to}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3 h-px w-full bg-white/10" />
      </div>
      <div className="flex min-h-28 flex-1 flex-col gap-3 px-5 py-4 text-white max-sm:px-4">
        {images.length > 0 && (
          <div
            role="group"
            aria-label={`${images.length} foto menfess`}
            className="relative h-9 transition-[width] duration-200 ease-out motion-reduce:transition-none"
            style={{
              width:
                images.length === 1
                  ? 36
                  : isImageStackExpanded
                    ? images.length * 36 + (images.length - 1) * 6
                    : 68,
            }}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && images.length > 1) {
                setIsImageStackExpanded(true);
              }
            }}
            onPointerLeave={(event) => {
              if (
                event.pointerType === "mouse" &&
                !event.currentTarget.matches(":focus-within")
              ) {
                setIsImageStackExpanded(false);
              }
            }}
          >
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                tabIndex={isImageStackExpanded || index === 0 ? 0 : -1}
                onClick={() => {
                  if (images.length > 1 && !isImageStackExpanded) {
                    setIsImageStackExpanded(true);
                    return;
                  }

                  setSelectedImage({ url: image, index });
                }}
                aria-label={`View image ${index + 1} of ${images.length}`}
                className="absolute left-0 top-0 size-9 shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/20 bg-black/20 transition-[transform,border-color] duration-200 ease-out hover:border-white/60 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
                style={{
                  transform: `translateX(${isImageStackExpanded ? index * 42 : index === 0 ? 0 : 18 + (index - 1) * 5}px)`,
                  zIndex: images.length - index,
                }}
              >
                <Img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
                {index === 0 && images.length > 1 && !isImageStackExpanded && (
                  <span className="pointer-events-none absolute right-1 top-1 flex size-[18px] items-center justify-center rounded-full border border-[#03045e] bg-white text-[10px] font-semibold text-[#03045e]">
                    +{images.length - 1}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        <p
          className={`w-full break-words whitespace-pre-wrap text-left text-[15px] leading-7 text-white/90 ${images.length === 0 ? "my-auto" : ""}`}
        >
          {message}
        </p>
      </div>
      <div className="mt-auto w-full border-t border-white/10 px-5 py-4 max-sm:px-4 max-sm:py-3">
        <div className="flex w-full items-center justify-between gap-4">
          <ReactionBar
            menfessId={menfess.id}
            initialReactions={menfess.reactions}
          />
          <button
            type="button"
            onClick={() => onCommentClick?.(menfess)}
            aria-label={`View ${comments} comments`}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 text-white/80 transition-[background-color,color,transform] duration-150 ease-out hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
          >
            <MessageCircleMore size={20} aria-hidden="true" />
            <span className="text-sm font-medium">{comments}</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5 text-white/55">
          <CalendarDays size={13} aria-hidden="true" />
          <p className="text-xs">{formatRelativeTime(new Date(createdAt))}</p>
        </div>
      </div>
      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null);
        }}
      >
        <DialogContent className="max-w-5xl border-white/15 bg-[#03045e] p-4 text-white sm:p-6">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle className="text-base font-medium text-white">
              {selectedImage
                ? `Menfess image ${selectedImage.index + 1} of ${images.length}`
                : "Menfess image"}
            </DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex h-[70dvh] w-full items-center justify-center overflow-hidden rounded-lg bg-black/25">
              <Img
                src={selectedImage.url}
                alt={`Menfess image ${selectedImage.index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default MenfessCard;
