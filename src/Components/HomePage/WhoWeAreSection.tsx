import React from "react";
import { RefObject, useRef, useState } from "react";
import StoryCard from "./StoryCard";

function StorySection() {
  const [active, setActive] = useState(1);
  const ref: RefObject<HTMLDivElement>[] = [];
  ref.push(useRef<HTMLDivElement>(null));
  ref.push(useRef<HTMLDivElement>(null));
  ref.push(useRef<HTMLDivElement>(null));

  const getClass = (index: number) =>
    index === active ? "opacity-100" : "opacity-40";

  const handleClick = (index: number) => {
    ref[index - 1].current?.scrollIntoView({
      block: "center",
      inline: "center",
    });
    setActive(index);
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-8  w-[100%] h-[80%] rounded-2xl bg-[#F7F9F2] text-center ">
        
        <h1 className="text-4xl leading-normal   font-bold whitespace-nowrap ">
              WHO WE ARE
            </h1>
        
        <div className=" overflow-hidden flex items-center gap-4 px-6 no-scrollbar scroll-smooth transition-all">
          {data.map((d) => (
            <StoryCard
              {...d}
              key={d.index}
              active={active === d.index}
              reference={ref[d.index - 1]}
              onClick={handleClick}
            />
          ))}
        </div>
        <div className="flex gap-4 px-24">
          {data.map((d, index) => (
            <div
              key={d.index}
              className={
                "border-b-2 cursor-pointer border-black flex-grow flex justify-center " +
                getClass(index + 1)
              }
              onClick={() => handleClick(index + 1)}
            >
              {d.nav}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StorySection;

const data = [
  {
    index: 1,
    title: "title of the story",
    nav: "STORY 1",
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
    mollitia nesciunt rem commodi accusantium optio molestias corporis
    aperiam nam quam, repellendus, tempore ipsa atque ex hic amet
praesentium, itaque ducimus.`,
    color: "#EEE8D1",
    image:
      "https://w0.peakpx.com/wallpaper/642/316/HD-wallpaper-mikasa-anime-attack-on-titan-shingeki-no-kyojin-snk.jpg",
  },
  {
    index: 2,
    title: "title of the story",
    nav: "STORY 2",
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
    mollitia nesciunt rem commodi accusantium optio molestias corporis
    aperiam nam quam, repellendus, tempore ipsa atque ex hic amet
praesentium, itaque ducimus.`,
    color: "#E8EBEF",
    image:
      "https://w0.peakpx.com/wallpaper/642/316/HD-wallpaper-mikasa-anime-attack-on-titan-shingeki-no-kyojin-snk.jpg",
  },
  {
    index: 3,
    title: "title of the story",
    nav: "STORY 3",
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
    mollitia nesciunt rem commodi accusantium optio molestias corporis
    aperiam nam quam, repellendus, tempore ipsa atque ex hic amet
praesentium, itaque ducimus.`,
    color: "#FFE1CC",
    image:
      "https://w0.peakpx.com/wallpaper/642/316/HD-wallpaper-mikasa-anime-attack-on-titan-shingeki-no-kyojin-snk.jpg",
  },
];
