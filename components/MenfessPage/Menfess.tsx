"use client";
import SendMenfess from "./send";
import { useState, useEffect } from "react";
import MenfessCard from "./card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { MenfessType } from "./types";
import CommentSection from "./CommentSection";

const Menfess = ({ menfess }: { menfess: MenfessType[] }) => {
  const [isSendMenfess, setIsSendMenfess] = useState(false);
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
  const [isAdmin, setIsAdmin] = useState("");

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
    const admin = localStorage.getItem("admin_key");
    if (admin) {
      setIsAdmin(admin);
    }
  }, []);

  return (
    <div className="bgGrad flex flex-col gap-10 max-lg:gap-6 max-sm:gap-4 text-white py-52 max-lg:py-48 max-sm:py-40 px-40 max-lg:px-20 max-md:px-10 max-sm:px-6">
      <CommentSection
        menfess={selectedMenfess}
        open={showCommentSection}
        onOpenChange={setShowCommentSection}
      />

      <div>
        <h1 className="text-white text-center font-monumentExt font-[400] opacity-80 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Cosmic Menfess
        </h1>
        <p className="text-center text-slate-400 font-PalanquinDark text-base sm:text-lg md:text-xl lg:text-xl">
          Share your thoughts and feelings with Cosmic community.
        </p>
      </div>

      {isSendMenfess ? (
        <SendMenfess />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <HoverBorderGradient
              containerClassName="rounded-xl"
              as="button"
              className="bg-black flex text-white items-center space-x-2 font-sfpro tracking-widest"
              onClick={() => setIsSendMenfess(true)}
            >
              <span>Create your menfess!</span>
            </HoverBorderGradient>
          </div>
          <p className="text-center text-slate-400 text-sm font-semibold">
            Menfess stays anonymous publicly. We only keep an anonymous browser
            fingerprint for moderation, abuse prevention, and banning.
          </p>
        </div>
      )}

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
                  </button>
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
                  </span>
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
                  </button>
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
                  </span>
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
                  </button>
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
    </div>
  );
};

export default Menfess;
