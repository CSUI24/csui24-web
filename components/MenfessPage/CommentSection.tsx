"use client";
import {
  Plane,
  MailCheck,
  MessageCircleMore,
  MessageSquareText,
  Send,
} from "lucide-react";
import Link from "next/link";
import { briefFamsData } from "@/modules/fams-data";
import { Img } from "react-image";
import { MenfessType } from "./types";
import { ReactionBar } from "./reactionBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import formatRelativeTime from "@/lib/formatRelativeTime";
import { useEffect, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface CommentType {
  author: string;
  content: string;
  createdAt: string;
}

const CommentSection = ({
  menfess,
  open,
  onOpenChange,
}: {
  menfess: MenfessType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [InputComment, setInputComment] = useState("");
  const { to, from, message, _count } = menfess;
  const { comments } = _count;
  const toIsFam = to.startsWith("fams/");
  const fromIsFam = from.startsWith("fams/");
  const name = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      return () => window.removeEventListener("storage", onChange);
    },
    () => window.localStorage.getItem("CommentName") ?? "SipalingAnonym",
    () => "SipalingAnonym",
  );
  const [Data, setData] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/menfess-comment?id=${menfess.id}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch menfess");
        }
        const resJSON: {
          success: boolean;
          message: string;
          data: CommentType[];
        } = await res.json();

        if (resJSON.success) {
          setData(resJSON.data);
        } else {
          console.error("Failed to fetch name:", resJSON.message);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [open, menfess.id]);

  const handleSend = async () => {
    if (InputComment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    const loader = toast.loading("Sending comment...");
    const res = await fetch("/api/menfess-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menfessId: menfess.id,
        content: InputComment,
        author: name,
      }),
    });
    const resJSON: {
      success: boolean;
      message: string;
      data: CommentType;
    } = await res.json();
    if (resJSON.success) {
      toast.success("Comment sent successfully", {
        id: loader,
      });
      setInputComment("");
      Data.push(resJSON.data);
    } else {
      toast.error(resJSON.message, {
        id: loader,
      });
      console.error("Failed to send comment:", resJSON.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#03045e] h-96 flex flex-col rounded-3xl bg-opacity-30 border border-[#717174] text-white">
        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
          {/* From and To */}
          <div className="w-full flex flex-col max-sm:gap-2 gap-4 text-white">
            <div className="w-full flex gap-3 items-center">
              {fromIsFam ? (
                <Img
                  src={
                    "/" +
                      briefFamsData.find(
                        (fam) => fam.id === from.replace("fams/", "")
                      )?.["image-filename"] || ""
                  }
                  alt="profile"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              ) : (
                <div className="flex justify-center items-center p-2 rounded-full border border-[#717174] ">
                  <Plane size={14} />
                </div>
              )}
              <div className="w-full flex flex-col">
                <p className="text-xs">From</p>
                {fromIsFam ? (
                  <Link
                    href={"/" + from}
                    className="hover:opacity-80 duration-300 transition-all cursor-pointer"
                    data-umami-event="menfess-redirect-profile"
                    data-umami-event-redirect-to={"/" + from}
                  >
                    <p className="text-lg font-bold truncate whitespace-nowrap overflow-hidden max-w-full">
                      {
                        briefFamsData.find(
                          (fam) => fam.id === from.replace("fams/", "")
                        )?.["displayed-name"]
                      }
                    </p>
                  </Link>
                ) : (
                  <p className="text-lg font-bold truncate whitespace-nowrap overflow-hidden max-w-full">
                    {from}
                  </p>
                )}
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
          {/* From and To */}
          <div className="min-h-[0.5px] w-full bg-[#D9D9D9]"></div> {/* Line */}
          {/* Message */}
          <div className="w-full h-36 min-h-36 text-white font-sans flex items-center justify-center px-6 overflow-y-auto max-h-full">
            <p className="text-center break-words w-full h-full">{message}</p>
          </div>
          {/* Message */}
          {/* Bottom */}
          <div className="w-full flex flex-col items-center gap-2 p-6 max-sm:p-3">
            <div className="w-full flex justify-between">
              <ReactionBar
                menfessId={menfess.id}
                initialReactions={menfess.reactions}
              />
              <button className="flex items-center gap-1">
                <MessageCircleMore size={25} />
                <p className="text-sm font-medium">{comments}</p>
              </button>
            </div>
          </div>
          {/* Bottom */}
          <div className="min-h-[0.5px] w-full bg-[#D9D9D9]"></div> {/* Line */}
          {/* Comment Section */}
          <div className="w-full py-2 flex flex-col gap-3">
            {isLoading ? (
              <>
                <Skeleton className="h-10 bg-white/20 w-full rounded-lg" />
                <Skeleton className="h-10 bg-white/20 w-full rounded-lg" />
                <Skeleton className="h-10 bg-white/20 w-full rounded-lg" />
              </>
            ) : Data.length > 0 ? (
              Data.map((comment, index) => {
                return (
                  <div
                    key={index}
                    className={`flex mx-1 gap-[22px] ${comment.author === name ? "flex-row-reverse" : ""}`}
                  >
                    <MessageSquareText className="mt-2" size={20} />
                    <div className="bg-blue-800/20 w-fit rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="font-bold truncate whitespace-nowrap overflow-hidden text-sm">
                          {comment.author}
                        </span>
                        <span className="ml-1 text-sm text-gray-300">•</span>
                        <span className="ml-1 truncate whitespace-nowrap overflow-hidden text-xs">
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-sm text-center">
                No comments yet. Be the first to comment!
              </div>
            )}

            {/* SEND KOMEN */}
            <div className="flex gap-3 items-center mr-3 ml-1">
              <Input
                className="bg-transparent w-full border-[#717174]"
                type="text"
                  placeholder={`Comment as ${name}.....`}
                value={InputComment}
                onChange={(e) => setInputComment(e.target.value)}
              />
              <button onClick={handleSend}>
                <Send size={25} />
              </button>
            </div>
            {/* SEND KOMEN */}
          </div>
          {/* Comment Section */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CommentSection;
