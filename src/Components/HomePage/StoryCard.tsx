import React from "react";

function StoryCard({
  index,
  title,
  desc,
  color,
  image,
  active,
  reference,
  onClick,
}: {
  index: number;
  title: string;
  desc: string;
  color: string;
  image: string;
  active: boolean;
  reference?: React.RefObject<HTMLDivElement>;
  onClick: Function;
}) {
  return (
    <div
      className={`w-[50vw] h-[50vh] rounded-2xl overflow-hidden flex gap-1 flex-shrink-0 transition-all scale ${
        active ? "opacity-100" : "opacity-40"
      }`}
      ref={reference}
      onClick={() => onClick(index)}
    >
      <div className="w-2/4 h-full overflow-hidden flex justify-center items-center">
        <img
          src={image}
          className={`w-[100%] h-[100%] transition-all ${
            active ? "scale-100" : "scale-105"
          }`}
        />
      </div>
      <div
        className={"w-2/4 h-full p-2 pr-4 overflow-hidden"}
        style={{ backgroundColor: color }}
      >
        <div className="relative top-[20%] flex flex-col gap-2">
          <h3 className="font-bold uppercase">{title}</h3>
          <p className="font-normal">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
