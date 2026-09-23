"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Send } from "lucide-react";
import { toast } from "sonner";
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

  const handleSend = async () => {
    if (to.length === 0 || from.length === 0 || message.length === 0) {
      toast.error("Please fill all fields");
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
    <div className="w-full p-10 max-lg:p-8 flex flex-col gap-4 max-sm:p-6 bg-[#03045e] border border-[#717174] bg-opacity-30 rounded-2xl text-white transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <h1 className="text-white font-sfPro font-[400] opacity-80 text-base sm:text-lg md:text-xl lg:text-2xl">
            Send Menfess
          </h1>
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
                    ? "About guest menfess"
                    : "About UI SSO menfess"
                }
                onClick={() => setTooltipOpen(true)}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
              >
                <Info size={17} aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={8}
              className="w-56 max-w-[calc(100vw-3rem)] rounded-xl border-[#717174] bg-[#101432] px-3 py-2 text-left font-sfPro text-xs font-normal leading-5 text-slate-100 shadow-xl motion-reduce:animate-none sm:w-64"
            >
              {mode === "guest"
                ? "Your menfess waits for admin approval. Encryption for stored data is planned."
                : "Your menfess is posted immediately. Your SSO identity isn't shown publicly. Encryption for stored data is planned."}
            </TooltipContent>
          </Tooltip>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-2 py-1 font-sfPro text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Cancel
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
            className={`text-xs ${from.length + to.length + message.length > 280 ? "text-red-400" : "text-slate-500"}`}
          >
            {from.length + to.length + message.length}/280
          </p>
        </div>
        <Textarea
          className="bg-transparent border-[#717174]"
          placeholder="Type your message here."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <Button
        onClick={handleSend}
        disabled={isSubmitting}
        className="w-fit px-6 self-end border bg-slate-400"
        variant={"secondary"}
        data-umami-event="submit-menfess"
      >
        <Send size={15} />
        {mode === "guest" ? "Submit for review" : "Send"}
      </Button>
    </div>
  );
};
export default SendMenfess;
