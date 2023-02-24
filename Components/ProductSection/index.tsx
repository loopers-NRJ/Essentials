import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductTile from "./ProductTile/index";

function ProductSection() {
  return (
    <section className="w-full font-medium p-5 flex flex-col bg-[#F7F9F2] rounded-2xl">
      <div className="head flex text-lg justify-around">
        <h1 className="">BEST SELLING PRODUCTS</h1>
        <div className="filters">hair care</div>
        <div className="filters">skin care</div>
        <div className="filters">gels</div>
        <div className="filters">soaps</div>
        <a href="" className="">
          view more
        </a>
      </div>

      <div className="product-area">
        <ProductTile />
      </div>


    </section>
  );
}
export default ProductSection;
