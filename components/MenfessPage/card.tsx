import {
  Plane,
  MailCheck,
  CalendarDays,
  MessageCircleMore,
  Trash2,
  Ban,
  Expand,
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
  const { comments } = _count;
  const toIsFam = to.startsWith("fams/");
  const imageSpaceClass =
    images.length === 0
      ? ""
      : tokenAdmin
        ? "pr-32 max-sm:pr-28"
        : images.length === 1
          ? "pr-16 max-sm:pr-12"
          : "pr-28 max-sm:pr-20";

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
    <div className="w-full min-h-96 rounded-xl bg-[#03045e] flex flex-col bg-opacity-30 border border-[#717174] overflow-hidden">
      <div className="relative h-fit p-6 max-sm:p-3 flex flex-col gap-2">
        {tokenAdmin && (
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleBan}
                  aria-label="Ban sender fingerprint"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Ban size={22} aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Ban sender fingerprint</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleDelete}
                  aria-label="Delete menfess"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Trash2 size={22} aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete menfess</TooltipContent>
            </Tooltip>
          </div>
        )}
        <div
          className={`w-full flex flex-col max-sm:gap-2 gap-4 text-white ${imageSpaceClass}`}
        >
          <div className="w-full flex gap-3 items-center">
            <div className="flex justify-center items-center p-2 rounded-full border border-[#717174] ">
              <Plane size={14} />
            </div>
            <div className="w-full flex flex-col">
              <p className="text-xs">From</p>
              <p className="text-lg font-bold truncate whitespace-nowrap overflow-hidden max-w-full">
                {from}
              </p>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center">
            {toIsFam ? (
              <Img
                src={
                  "/" +
                    briefFamsData.find(
                      (fam) => fam.id === to.replace("fams/", "")
                    )?.["image-filename"] || ""
                }
                alt="profile"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <div className="flex justify-center items-center p-2 rounded-full border border-[#717174] ">
                <MailCheck size={14} />
              </div>
            )}
            <div className="w-full flex flex-col">
              <p className="text-xs">To</p>
              {toIsFam ? (
                <Link
                  href={"/" + to}
                  className="hover:opacity-80 duration-300 transition-all cursor-pointer"
                  data-umami-event="menfess-redirect-profile"
                  data-umami-event-redirect-to={"/" + to}
                >
                  <p className="text-lg font-bold truncate whitespace-nowrap overflow-hidden max-w-full">
                    {
                      briefFamsData.find(
                        (fam) => fam.id === to.replace("fams/", "")
                      )?.["displayed-name"]
                    }
                  </p>
                </Link>
              ) : (
                <p className="text-lg font-bold truncate whitespace-nowrap overflow-hidden max-w-full">
                  {to}
                </p>
              )}
            </div>
          </div>
        </div>
        {images.length > 0 && (
          <div
            className={`absolute right-6 bottom-8 grid gap-1 max-sm:right-3 max-sm:bottom-5 ${
              images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage({ url: image, index })}
                aria-label={`View image ${index + 1} of ${images.length}`}
                className="group relative size-9 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-black/20 transition-[border-color,transform] duration-150 ease-out hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 max-sm:size-7"
              >
                <Img
                  src={image}
                  alt={`Menfess image ${index + 1}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/55 to-transparent p-1 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  <Expand size={12} aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        )}
        <div className="h-[0.5px] w-full bg-[#D9D9D9]"></div>
      </div>
      <div className="w-full min-h-24 text-white font-sans flex flex-col justify-center gap-3 px-6 py-4">
        <p className="text-center break-words w-full whitespace-pre-wrap">{message}</p>
      </div>
      <div className="w-full flex flex-col items-center gap-2 p-6 max-sm:p-3">
        <div className="w-full flex justify-between">
          <ReactionBar
            menfessId={menfess.id}
            initialReactions={menfess.reactions}
          />
          <button
            // href={`/menfess/${menfess.id}`}
            onClick={() => onCommentClick?.(menfess)}
            className="flex items-center gap-1"
          >
            <MessageCircleMore size={25} />
            <p className="text-sm font-medium">{comments}</p>
          </button>
        </div>

        <div className="flex gap-2 items-center self-end">
          <CalendarDays size={14} />
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
