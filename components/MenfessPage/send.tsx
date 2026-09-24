"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock3, Send, X, Zap } from "lucide-react";
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
  const characterCount = getMenfessTextLength(from, to, message);

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
      mode === "guest" ? "Submitting..." : "Sending menfess...",
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

    const menfess = {
      to,
      from,
      message,
      fingerprint,
      mode,
    };

    try {
      const res = await fetch("/api/menfess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menfess),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(mode === "guest" ? "Sent for review" : "Menfess sent", {
          id: loader,
        });
        setTo("");
        setFrom("");
        setMessage("");
        onSubmitted?.();
      } else {
        toast.error(data.message, {
          id: loader,
        });
      }
    } catch (error) {
      console.error("Error sending menfess:", error);
      toast.error("Failed to send menfess", {
        id: loader,
      });
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
        />
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
              ? "Guest menfess requires no login and appears after admin approval."
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
