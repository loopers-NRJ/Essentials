import React from "react";

function MasonryElement({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`flex  ${reverse ? "rotate-180" : ""}`}>
      <div
        className={`masonrypic flex-shrink-0 w-52 mx-1 sm:rounded-lg bg-cover   transition duration-150 hover:scale-105  `}
      ></div>
      <div
        className={` flex-shrink-0 w-96 mx-1 sm:rounded-lg bg-cover  bg-[#EFECE1] hover:bg-[#EFECE1]  transition duration-150 hover:scale-105 `}
      >
        <div className="m-6 ">
          <p className="font-normal custParaTag">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            soluta id est at. Quo quasi doloremque nesciunt dolore praesentium
            laboriosam atque nisi
          </p>
        </div>
        <div className="ml-6 ">
          <p className="custname ">Mohamed Rizwan </p>  
        </div>
      </div>
    </div>
  );
}

export default MasonryElement;
