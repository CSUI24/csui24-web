import {
  Plane,
  MailCheck,
  CalendarDays,
  MessageCircleMore,
  Trash2,
  Ban,
} from "lucide-react";
import formatRelativeTime from "@/lib/formatRelativeTime";
import Link from "next/link";
import { briefFamsData } from "@/modules/fams-data";
import { Img } from "react-image";
import { MenfessType } from "./types";
import { ReactionBar } from "./reactionBar";
import { toast } from "sonner";
const MenfessCard = ({
  menfess,
  onCommentClick,
  tokenAdmin,
}: {
  menfess: MenfessType;
  onCommentClick?: (menfess: MenfessType) => void;
  tokenAdmin: string;
}) => {
  const { to, from, message, createdAt, _count } = menfess;
  const { comments } = _count;
  const toIsFam = to.startsWith("fams/");

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
    <div className="w-full h-96 rounded-xl bg-[#03045e] flex flex-col bg-opacity-30 border border-[#717174] overflow-hidden">
      <div className="relative h-fit p-6 max-sm:p-3 flex flex-col gap-2">
        {tokenAdmin && (
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <button onClick={handleBan} title="Ban sender fingerprint">
              <Ban size={22} />
            </button>
            <button onClick={handleDelete} title="Delete menfess">
              <Trash2 size={25} />
            </button>
          </div>
        )}
        <div className="w-full flex flex-col max-sm:gap-2 gap-4 text-white">
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
        <div className="h-[0.5px] w-full bg-[#D9D9D9]"></div>
      </div>
      <div className="w-full h-full text-white font-sans flex items-center justify-center px-6 overflow-y-auto max-h-full">
        <p className="text-center break-words w-full h-full">{message}</p>
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
    </div>
  );
};
export default MenfessCard;
