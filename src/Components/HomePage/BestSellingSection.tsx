import React, { useState } from "react";
import ProductTile from "../Common/ProductTile";

function BestSellingFilterOption({
  id: key,
  children,
  active,
  onClick,
}: {
  id: string;
  children: React.ReactNode;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <div
      className={`rounded-3xl p-2 px-8 whitespace-nowrap cursor-pointer ${
        active ? "bg-[#EEDD87]" : "bg-[#EFECE1]"
      }`}
      onClick={() => onClick(key)}
    >
      {children}
    </div>
  );
}

function BestSellingSection() {
  category = category.length > 4 ? category.slice(0, 4) : category;
  const [selected, setSelected] = useState(category[0].id);
  const handleClick = (id: string) => setSelected(id);
  const getFilteredProducts = () => {
    let filtered = bestSellingProducts.filter((item) => {
      for (let i = 0; i < item.category.length; i++)
        if (item.category[i] === selected) return true;
      return false;
    });
    filtered = filtered.length > 4 ? filtered.slice(0, 4) : filtered;
    return filtered;
  };
  return (
    <section className="w-full ">
      <div className="w-full h-4/5 flex flex-col bg-[#F7F9F2] rounded-2xl overflow-hidden pb-5">
        <div className="flex my-2">
          <h1 className="text-[#6D5C00] whitespace-nowrap font-semibold text-xl tracking-wide p-4 mx-8 flex justify-center items-center">
            BESTSELLING PRODUCTS
          </h1>
          <div className="flex flex-grow justify-center md:gap-4 sm:gap-2 items-center">
            {category.map((item) => (
              <BestSellingFilterOption
                id={item.id}
                key={item.id}
                active={item.id === selected}
                onClick={handleClick}
              >
                {item.value}
              </BestSellingFilterOption>
            ))}
          </div>
          <a
            href=""
            className="mx-8 flex justify-center items-center whitespace-nowrap"
          >
            view more
          </a>
        </div>
        <div className="flex justify-evenly item-center transition-all">
          {getFilteredProducts().map((item) => (
            <ProductTile key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default BestSellingSection;

let category = [
  {
    id: "63f65942beb118114d2261ac",
    value: "SKIN CARE",
    createdAt: "2023-02-22T18:04:49.836Z",
  },
  {
    id: "63f65953beb118114d2261ad",
    value: "SERUM",
    createdAt: "2023-02-22T18:05:07.415Z",
  },
  {
    id: "63f6595dbeb118114d2261ae",
    value: "GEL",
    createdAt: "2023-02-22T18:05:17.804Z",
  },
  {
    id: "63f65974beb118114d2261af",
    value: "HYDROSOLS",
    createdAt: "2023-02-22T18:05:40.056Z",
  },
  {
    id: "63f6598bbeb118114d2261b0",
    value: "HAIR CARE",
    createdAt: "2023-02-22T18:06:03.149Z",
  },
];

let bestSellingProducts = [
  {
    id: "63f77994dd3809e779708829",
    name: "ACNE GEL",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f6595dbeb118114d2261ae"],
    price: 120,
    numberInStock: 80,
    images: ["images/1677162900254_product 1.jpg"],
    createdAt: "2023-02-23T14:35:00.264Z",
  },
  {
    id: "63f779ffdd3809e779708831",
    name: "ALOEVERA GEL",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f6595dbeb118114d2261ae"],
    price: 120,
    numberInStock: 80,
    images: ["images/1677163007168_product 3.webp"],
    createdAt: "2023-02-23T14:36:47.179Z",
  },
  {
    id: "63f77496dd3809e779708810",
    name: "Acne Serum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65953beb118114d2261ad"],
    price: 250,
    numberInStock: 100,
    images: ["images/1677161622497_product 1.jpg"],
    createdAt: "2023-02-23T14:13:42.515Z",
  },
  {
    id: "63f774dfdd3809e779708813",
    name: "Anti-Aging Serum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65953beb118114d2261ad"],
    price: 200,
    numberInStock: 100,
    images: ["images/1677161695663_product 1.jpg"],
    createdAt: "2023-02-23T14:14:55.687Z",
  },
  {
    id: "63f779cedd3809e77970882d",
    name: "CUCUMBER GEL",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f6595dbeb118114d2261ae"],
    price: 120,
    numberInStock: 80,
    images: ["images/1677162958199_product 2.webp"],
    createdAt: "2023-02-23T14:35:58.217Z",
  },
  {
    id: "63f76dffdd3809e7797087fd",
    name: "Elixir face/body oil",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65942beb118114d2261ac"],
    price: 250,
    numberInStock: 30,
    images: ["images/1677159934809_product 2.webp"],
    createdAt: "2023-02-23T13:45:35.139Z",
  },
  {
    id: "63f77269dd3809e77970880a",
    name: "Golden Glow Serum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65953beb118114d2261ad", "63f65942beb118114d2261ac"],
    price: 250,
    numberInStock: 25,
    images: ["images/1677161065509_product 4.webp"],
    createdAt: "2023-02-23T14:04:25.526Z",
  },
  {
    id: "63f77a9edd3809e779708835",
    name: "Herbal Concentrate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f6598bbeb118114d2261b0"],
    price: 110,
    numberInStock: 30,
    images: ["images/1677163166012_product 4.webp"],
    createdAt: "2023-02-23T14:39:26.133Z",
  },
  {
    id: "63f77946dd3809e779708821",
    name: "LAVANDER HYDROSOL",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65974beb118114d2261af"],
    price: 120,
    numberInStock: 80,
    images: ["images/1677162822088_product 4.webp"],
    createdAt: "2023-02-23T14:33:42.106Z",
  },
  {
    id: "63f76991beb118114d2261cc",
    name: "MHP Cleanser",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65942beb118114d2261ac"],
    price: 80,
    numberInStock: 25,
    images: ["images/1677158800063_product 1.jpg"],
    createdAt: "2023-02-23T13:26:40.679Z",
  },
  {
    id: "63f77c16dd3809e779708839",
    name: "Neem wood comb",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f6598bbeb118114d2261b0"],
    price: 95,
    numberInStock: 100,
    images: ["images/1677163542530_product 2.webp"],
    createdAt: "2023-02-23T14:45:42.551Z",
  },
  {
    id: "63f76f21dd3809e779708800",
    name: "Pigmentation pack",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65942beb118114d2261ac"],
    price: 220,
    numberInStock: 20,
    images: ["images/1677160225155_product 3.webp"],
    createdAt: "2023-02-23T13:50:25.169Z",
  },
  {
    id: "63f7797edd3809e779708825",
    name: "ROSE GEL",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f6595dbeb118114d2261ae"],
    price: 120,
    numberInStock: 80,
    images: ["images/1677162877997_product 4.webp"],
    createdAt: "2023-02-23T14:34:38.014Z",
  },
  {
    id: "63f776a0dd3809e779708819",
    name: "ROSE HYDROSOL",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65974beb118114d2261af"],
    price: 120,
    numberInStock: 80,
    images: ["images/1677162143906_product 2.webp"],
    createdAt: "2023-02-23T14:22:23.926Z",
  },
  {
    id: "63f778d7dd3809e77970881d",
    name: "TEA TREE HYDROSOL",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam, debitis perspiciatis ullam quibusdam quod dolorem impedit atque dolor et, ad, voluptates optio nesciunt inventore tenetur animi. Voluptate, ipsa autem.",
    category: ["63f65974beb118114d2261af"],
    price: 120,
    numberInStock: 80,
    images: ["images/1677162711354_product 3.webp"],
    createdAt: "2023-02-23T14:31:51.371Z",
  },
];
