"use client";
const CSStudy = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-white text-4xl font-sfReg">CStudy</h1>
      <div className="py-28 flex justify-center px-12">
        <div className="bg-[#5C5757] bg-opacity-60 flex flex-col  items-center justify-center rounded-2xl">
          <p className="text-white text-xl px-20 py-12 max-w-[45rem] text-center max-sm:text-sm max-sm:px-10 font-sfReg">
          Find your learning materials through our Notion created by Academic Team CSUI 2024!
          </p>
          <div className="pb-16">
            <button
              className="bg-[#D9D9D9] px-12 py-4 max-sm:text-sm max-sm:py-2 max-sm:px-6 rounded-xl transition-all duration-500 hover:opacity-60 text-black text-xl font-sfPro font-medium"
              onClick={() =>
                window.open(
                  "https://lava-pest-110.notion.site/CSUI-24-Official-Notion-10c5dfbd0488805da8d0e363d22fcdcf",
                  "_blank"
                )
              }
            >
              Notion CSUI 24
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSStudy;
