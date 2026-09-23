"use client";
import SendMenfess from "./send";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import MenfessCard from "./card";
import { MenfessType } from "./types";
import CommentSection from "./CommentSection";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import type { SsoSessionUser } from "@/lib/sso-types";

const Menfess = ({
  menfess,
  ssoUser,
}: {
  menfess: MenfessType[];
  ssoUser: SsoSessionUser | null;
}) => {
  const router = useRouter();
  const [sendMode, setSendMode] = useState<"guest" | "sso" | null>(null);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [ssoError, setSsoError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [selectedMenfess, setSelectedMenfess] = useState<MenfessType>({
    id: "",
    to: "",
    from: "",
    message: "",
    createdAt: "",
    reactions: [],
    _count: {
      comments: 0,
    },
  });
  const isAdmin = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      return () => window.removeEventListener("storage", onChange);
    },
    () => window.localStorage.getItem("admin_key") ?? "",
    () => "",
  );

  // Pagination settings
  const cardsPerPage = 10;
  const totalPages = Math.ceil(menfess.length / cardsPerPage);

  // Get current posts
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = menfess.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("sso_error");
    if (error === "config") {
      setSsoError("UI SSO is not configured yet. Please try again later.");
    } else if (error === "login") {
      setSsoError("UI SSO login could not be completed. Please try again.");
    }

    const fetchData = async () => {
      try {
        const res = await fetch("/api/getName", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch menfess");
        }
        const resJSON: {
          success: boolean;
          message: string;
          data: string;
        } = await res.json();

        if (resJSON.success) {
          localStorage.setItem("CommentName", resJSON.data);
        } else {
          console.error("Failed to fetch menfess");
        }
      } catch (error) {
        console.error("Error fetching menfess:", error);
      }
    };
    if (!localStorage.getItem("CommentName")) {
      fetchData();
    }
  }, []);

  return (
    <div className="bgGrad flex flex-col justify-center gap-10 max-lg:gap-6 max-sm:gap-4 text-white py-52 max-lg:py-48 max-sm:py-40 px-40 max-lg:px-20 max-md:px-10 max-sm:px-6">
      {ssoUser && showCommentSection && (
        <CommentSection
          menfess={selectedMenfess}
          open={showCommentSection}
          onOpenChange={setShowCommentSection}
        />
      )}

      <div>
        <h1 className="text-white text-center font-monumentExt font-[400] opacity-80 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Pacil Menfess
        </h1>
        <p className="text-center text-slate-400 font-PalanquinDark text-base sm:text-lg md:text-xl lg:text-xl">
          Share your thoughts and feelings with Pacil community.
        </p>
      </div>

      {ssoError && (
        <div
          role="alert"
          className="mx-auto w-full max-w-2xl rounded-xl border border-rose-200/30 bg-rose-200/5 px-4 py-3 text-center text-sm text-rose-100"
        >
          {ssoError}
        </div>
      )}

      {ssoUser && (
        <p className="text-center font-sfPro text-sm text-slate-400">
          Signed in as <span className="text-slate-200">{ssoUser.name}</span>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <a
            href="/auth/sso/logout"
            className="underline-offset-4 transition-colors hover:text-white focus-visible:underline"
          >
            Sign out
          </a>
        </p>
      )}

      {sendMode ? (
        <SendMenfess
          key={sendMode}
          mode={sendMode}
          onClose={() => setSendMode(null)}
          onSubmitted={() => {
            const submittedMode = sendMode;
            setSendMode(null);
            if (submittedMode === "sso") router.refresh();
          }}
        />
      ) : (
        <div className="flex w-full flex-col items-center gap-1">
          {ssoUser ? (
            <HoverBorderGradient
              containerClassName="w-full max-w-72 rounded-full duration-150 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
              as="button"
              className="flex min-h-11 items-center justify-center bg-black font-sfPro text-white tracking-[0.03em]"
              onClick={() => setSendMode("sso")}
            >
              <span className="font-PalanquinDark text-base">
                Create your menfess!
              </span>
            </HoverBorderGradient>
          ) : (
            <a
              href="/auth/sso/login"
              className="block w-full max-w-72 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <HoverBorderGradient
                containerClassName="w-full rounded-full duration-150 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
                as="div"
                className="flex min-h-11 items-center justify-center bg-black font-sfPro text-white tracking-[0.03em]"
              >
                <span>Continue with SSO UI</span>
              </HoverBorderGradient>
            </a>
          )}
          <div className="flex items-center">
            <Tooltip
              delayDuration={150}
              open={openTooltip}
              onOpenChange={setOpenTooltip}
            >
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setSendMode("guest")}
                  className="inline-flex min-h-11 items-center rounded-lg px-2 font-sfPro text-sm text-slate-300 underline decoration-slate-500 underline-offset-4 transition-[color,transform] duration-150 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  Send as guest
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={8}
                className="w-56 max-w-[calc(100vw-3rem)] rounded-xl border-[#717174] bg-[#101432] px-3 py-2 text-left font-sfPro text-xs font-normal leading-5 text-slate-100 shadow-xl motion-reduce:animate-none sm:w-64"
              >
                SSO menfess are posted immediately; guest menfess wait for admin
                approval. Your SSO identity isn&apos;t shown publicly. Encryption
                for stored data is planned.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {!ssoUser ? null : (
        <>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-10">
            {currentCards.map((menfess) => (
              <MenfessCard
                onCommentClick={(e) => {
                  setSelectedMenfess(e);
                  setShowCommentSection(true);
                }}
                key={menfess.id}
                menfess={menfess}
                tokenAdmin={isAdmin}
              />
            ))}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md bg-[#03045e] flex flex-col bg-opacity-30 border border-[#717174] ${
                  currentPage === 1
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-[#03045e] text-white hover:border-[#717174]"
                } transition-colors duration-200`}
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {(() => {
                  // Logic to show only 5 pages with truncation
                  const pageButtons = [];

                  // Always show first page
                  if (totalPages > 0) {
                    pageButtons.push(
                      <button
                        key={0}
                        onClick={() => paginate(1)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center border border-[#717174] ${
                          currentPage === 1
                            ? "bg-white text-black cursor-not-allowed"
                            : "bg-[#03045e] text-white bg-opacity-30 hover:border-[#717174]"
                        } transition-colors duration-200`}
                      >
                        1
                      </button>,
                    );
                  }

                  // Add ellipsis if current page is far from the first page
                  if (currentPage > 3) {
                    pageButtons.push(
                      <span
                        key="leftEllipsis"
                        className="w-8 h-8 flex items-center justify-center text-white"
                      >
                        ...
                      </span>,
                    );
                  }

                  // Calculate range of pages to show
                  let startPage = Math.max(2, currentPage - 1);
                  let endPage = Math.min(totalPages - 1, currentPage + 1);

                  // Adjust to show up to 3 pages in the middle
                  if (currentPage <= 3) {
                    endPage = Math.min(totalPages - 1, 4);
                  } else if (currentPage >= totalPages - 2) {
                    startPage = Math.max(2, totalPages - 3);
                  }

                  // Add middle pages
                  for (let i = startPage; i <= endPage; i++) {
                    pageButtons.push(
                      <button
                        key={i}
                        onClick={() => paginate(i)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center border border-[#717174] ${
                          currentPage === i
                            ? "bg-white text-black cursor-not-allowed"
                            : "bg-[#03045e] text-white bg-opacity-30 hover:border-[#717174]"
                        } transition-colors duration-200`}
                      >
                        {i}
                      </button>,
                    );
                  }

                  // Add ellipsis if current page is far from the last page
                  if (currentPage < totalPages - 2) {
                    pageButtons.push(
                      <span
                        key="rightEllipsis"
                        className="w-8 h-8 flex items-center justify-center text-white"
                      >
                        ...
                      </span>,
                    );
                  }

                  // Always show last page if there's more than one page
                  if (totalPages > 1) {
                    pageButtons.push(
                      <button
                        key={totalPages}
                        onClick={() => paginate(totalPages)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center border border-[#717174] ${
                          currentPage === totalPages
                            ? "bg-white text-black cursor-not-allowed"
                            : "bg-[#03045e] text-white bg-opacity-30 hover:border-[#717174]"
                        } transition-colors duration-200`}
                      >
                        {totalPages}
                      </button>,
                    );
                  }

                  return pageButtons;
                })()}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md bg-[#03045e] flex flex-col bg-opacity-30 border border-[#717174] ${
                  currentPage === totalPages
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-[#03045e] text-white hover:border-[#717174]"
                } transition-colors duration-200`}
              >
                Next
              </button>
            </div>
          )}

          {/* Page indicator */}
          <div className="text-center text-slate-400">
            Page {currentPage} of {totalPages}{" "}
            {menfess.length > 0
              ? `• Showing ${indexOfFirstCard + 1}-${Math.min(indexOfLastCard, menfess.length)} of ${menfess.length} menfess`
              : ""}
          </div>
        </>
      )}
    </div>
  );
};

export default Menfess;
