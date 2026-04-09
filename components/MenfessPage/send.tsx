"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";

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

const SendMenfess = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [from, setFrom] = useState("");

  const handleSend = async () => {
    if (to.length === 0 || from.length === 0 || message.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    const loader = toast.loading("Sending menfess...");

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
        toast.success("Menfess sent successfully", {
          id: loader,
        });
        setTo("");
        setFrom("");
        setMessage("");
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
      <h1 className="text-white font-sfPro font-[400] opacity-80 text-base sm:text-lg md:text-xl lg:text-2xl">
        Send Menfess
      </h1>
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
        <p className="text-xs text-slate-400">Message</p>
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
        Send
      </Button>
    </div>
  );
};
export default SendMenfess;
