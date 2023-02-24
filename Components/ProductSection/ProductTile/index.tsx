import Image from "next/image";

function ProductTile() {
  return (
    <div className="tile flex flex-col w-fit h-fit items-center">
      <div className="IMAGE-PART flex items-end justify-center relative w-fit h-fit overflow-visible">
        <div className="backdrop absolute aspect-square h-4/5 bg-[#EFECE1] -z-1 rounded-[50px]" />
        <Image
          className="z-10 p-5 hover:drop-shadow-xl hover:-translate-y-2 transition-all duration-200 shadow-black"
          width={200}
          height={200}
          src="/prod.png"
          alt="product"
        />
      </div>
      <div className="TEXT-PART text-lg mb-3 mt-2">
        <div className="prod-name font-semibold">Product Name</div>
        <div className="price leading-none font-light">$ 169.99</div>
      </div>
      <div className="BUTTON-PART w-4/5 h-fit py-3 text-center rounded-full text-sm font-medium bg-[#EEDD87] hover:bg-[#dcc554]">
        ADD TO CART
      </div>
    </div>
  );
}
export default ProductTile;
