"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { briefFamsData } from "@/modules/fams-data";
import { useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";

const SendMenfess = () => {
  const [to, setTo] = useState("");
  const [paciliansTo, setPaciliansTo] = useState("");
  const [suggestionsTo, setSuggestionsTo] = useState(false);
  const filteredTo = useMemo(() => {
    return briefFamsData.filter((entry) => {
      const name = entry["full-name"].toLowerCase();
      return name.includes(to.toLowerCase());
    });
  }, [to]);

  const [from, setFrom] = useState("");

  const handleSend = async () => {
    if (to.length === 0 || from.length === 0 || message.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    const menfess = {
      to: to,
      from: from,
      message: message,
    };
    if (paciliansTo) {
      setTo("fams/" + paciliansTo);
      setPaciliansTo("");
      menfess.to = "fams/" + paciliansTo;
    }
    console.log(to, from, message);
    const loader = toast.loading("Sending menfess...");

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
  };

  const [message, setMessage] = useState("");
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
                setPaciliansTo("");
              }}
              value={to}
              onFocus={() => {
                setSuggestionsTo(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestionsTo(false);
                }, 200);
              }}
            />
            <div
              className={`${suggestionsTo ? "" : "hidden"} absolute w-full h-fit max-h-48 bg-white rounded-b-lg overflow-y-auto overflow-x-hidden flex flex-col gap-1`}
            >
              {filteredTo.map((entry) => {
                return (
                  <div
                    className="p-2 text-black hover:translate-x-2 transition-all flex items-center gap-2 cursor-pointer rounded-b-lg"
                    key={entry.id}
                    onClick={() => {
                      setPaciliansTo(entry.id);
                      setTo(entry.id);
                      filteredTo.length = 0;
                    }}
                  >
                    <Image
                      src={"/" + entry["image-filename"]}
                      alt={entry["full-name"]}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    <p className="text-sm font-sfReg">{entry["full-name"]}</p>
                  </div>
                );
              })}
            </div>
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
