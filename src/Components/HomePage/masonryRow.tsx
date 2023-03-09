import React, { useEffect, useRef } from "react";
import MasonryElement from "./masonryElement";

function MasonryRow({ reverse = false }: { reverse?: boolean }) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (scrollContainer.current) {
      const scrollPosition =
        window.scrollY - scrollContainer.current?.offsetHeight;
      if (scrollContainer.current && scrollPosition > 0) {
        scrollContainer.current.scrollLeft = scrollPosition * 0.3;
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    
      <div
        id="masonryContainer"
        ref={scrollContainer}
        className={`wrp flex  flex-grow pt-1 pb-1 overflow-hidden  sm:rounded-lg  h-auto w-[100%] ${
          reverse ? "rotate-180" : ""
        }`}
      >
        <MasonryElement reverse={reverse} />
        <MasonryElement reverse={reverse} />
        <MasonryElement reverse={reverse} />
        <MasonryElement reverse={reverse} />
      </div>
    
  );
}

export default MasonryRow;
