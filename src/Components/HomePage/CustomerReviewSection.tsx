import React from "react";
import MasonryRow from "./masonryRow";

function Masonry() {
  return (
    <>
    <div className="h-[82vh] w-full flex justify-center items-center mt-20">
      <div className="w-[100%] h-[100%] rounded-2xl bg-[#F7F9F2]">
      <div className="flex flex-col h-full w-full pb-3 pt-3">
      <MasonryRow />
      <MasonryRow reverse />
      <MasonryRow />
      </div>
    
    </div>
    </div>
    </>
  );
}

export default Masonry;
