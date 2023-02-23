import React from "react";
import { RefObject, useRef, useState } from "react";
import StoryCard from "./StoryCard";

function StorySection() {
  const [active, setActive] = useState(1);
  const getClass = (index: number) =>
    index === active ? "opacity-100" : "opacity-40";
  const handleClick = (index: number) => {
    ref[index - 1].current?.scrollIntoView({
      // behavior: "smooth",
      block: "center",
      inline: "center",
    });
    console.log(ref[index - 1].current?.scrollIntoView);

    setActive(index);
  };

  const ref: RefObject<HTMLDivElement>[] = [];
  [0, 1, 2].forEach((i) => ref.push(useRef<HTMLDivElement>(null)));

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[90%] h-[90%] rounded-2xl bg-white">
        <div className="h-[90%] overflow-hidden flex items-center gap-4 px-6 no-scrollbar scroll-smooth">
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
          <button
            className={
              "border-b-2 border-black flex-grow flex justify-center " +
              getClass(1)
            }
            onClick={() => handleClick(1)}
          >
            STORY 1
          </button>
          <button
            className={
              "border-b-2 border-black flex-grow flex justify-center " +
              getClass(2)
            }
            onClick={() => handleClick(2)}
          >
            STORY 2
          </button>
          <button
            className={
              "border-b-2 border-black flex-grow flex justify-center " +
              getClass(3)
            }
            onClick={() => handleClick(3)}
          >
            STORY 3
          </button>
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
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
    mollitia nesciunt rem commodi accusantium optio molestias corporis
    aperiam nam quam, repellendus, tempore ipsa atque ex hic amet
praesentium, itaque ducimus.`,
    color: "#EEE8D1",
    image: "images/1676718882179_product 1.jpg",
  },
  {
    index: 2,
    title: "title of the story",
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
    mollitia nesciunt rem commodi accusantium optio molestias corporis
    aperiam nam quam, repellendus, tempore ipsa atque ex hic amet
praesentium, itaque ducimus.`,
    color: "#E8EBEF",
    image: "images/1676719085668_product 2.webp",
  },
  {
    index: 3,
    title: "title of the story",
    desc: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
    mollitia nesciunt rem commodi accusantium optio molestias corporis
    aperiam nam quam, repellendus, tempore ipsa atque ex hic amet
praesentium, itaque ducimus.`,
    color: "#FFE1CC",
    image: "images/1676718882179_product 1.jpg",
  },
];
