import React from "react";
import { useInView } from "react-intersection-observer";
import useInteraction from "../../Hooks/useInteraction";

function CustomizeSec() {
  const { ref: myRef, inView: myElementIsVisible } = useInView();
  
  
  return (
    <div className="h-[82vh] flex justify-center items-center mt-20">
      <div className="grid grid-cols-3 gap-4 bg-[#F7F9F2]  px-12 py-14 sm:rounded-lg w-[100%] h-[100%]">
        <div className="col-start-1 col-span-2 ... grid grid-cols-3 gap-4 px-14">
          <div className="container col-start-1 col-span-1 relative   h-auto    sm:max-w-lg sm:rounded-lg">
            <div
              className={`relative cust card h-[100%] w-[100%] shadow-xl sm:rounded-lg ${
                myElementIsVisible ? "animate" : ""
              }`}
            >
              <div className="front absolute  h-[100%] w-[100%] pb-8 sm:rounded-lg"></div>
              <div
                className="back absolute bg-[#EFECE1] h-[100%] w-[100%] pb-8 sm:rounded-lg"
                ref={myRef}
              >
                <h1>hello hi</h1>
              </div>
            </div>
          </div>

          <div className="container col-start-2 col-span-1 relative  h-auto    sm:max-w-lg sm:rounded-lg">
            <div
              className={`relative cust card h-[100%] w-[100%] shadow-xl ${
                myElementIsVisible ? "animate" : ""
              }`}
            >
              <div className="front absolute  h-[100%] w-[100%] pb-8 sm:rounded-lg"></div>
              <div className="back absolute bg-[#EFECE1] h-[100%] w-[100%] pb-8 sm:rounded-lg">
                <h1>hello hi</h1>
              </div>
            </div>
          </div>
          <div className="container col-start-3 col-span-1 relative  h-auto    sm:max-w-lg sm:rounded-lg">
            <div
              className={`relative cust card h-[100%] w-[100%] shadow-xl ${
                myElementIsVisible ? "animate" : ""
              }`}
            >
              <div className="front absolute  h-[100%] w-[100%] pb-8 sm:rounded-lg"></div>
              <div className="back absolute bg-[#EFECE1] h-[100%] w-[100%] pb-8 sm:rounded-lg">
                <h1>hello hi</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-3 col-span-1 grid grid-cols-1">
          <div className="relative h-auto  pt-0 pb-8  sm:rounded-lg">
            <h1 className="text-5xl leading-none mt-0 mb-2 font-bold whitespace-nowrap">
              YOU CHOOSE <br /> WE CUSTOMIZE
            </h1>
            <br />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              aut voluptas debitis facere nostrum dolor error aspernatur at
              deserunt iste ex voluptate vero quidem illum nisi nobis
              blanditiis, quo temporibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeSec;
