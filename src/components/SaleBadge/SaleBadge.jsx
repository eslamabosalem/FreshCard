export default function SaleBadge({ product, top }) {
  return (
    <>
      {product?.priceAfterDiscount > 0 && (
        <div
          className={`bg-red-700 cursor-default text-sm h-12 w-12 absolute z-30 ${top} -right-1 rounded-full`}
        >
          <div className="flex flex-col justify-center items-center bg-red-700 w-full h-full hover:bg-red-500 text-white font-bold py-3 rounded-full shadow-lg hover:text-white shadow-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 animate-pulse active:animate-bounce">
            Sale
            <span>
              {Math.round(
                ((product?.price - product?.priceAfterDiscount) /
                  product?.price) *
                  100
              )}
              %
            </span>
          </div>
        </div>
      )}
    </>
  );
}
