import type { ProductDisplayProps  } from "../types";



export const ProductDisplay: React.FC<ProductDisplayProps> = ({
product,
showDescription = true,
showStockStatus = true,
onAddToCart,
children
}) => {
const {id, name, price, description, imageUrl,inStock} = product;
  const cardClasses = "bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition duration-300 hover:shadow-xl";
  const nameClasses = "text-xl font-bold text-gray-900 leading-tight";
  const priceClasses = "text-2xl font-extrabold text-indigo-600 my-2";
  const descriptionClasses = "text-gray-500 text-sm flex-grow";
  
  const statusClasses = inStock 
    ? "bg-green-100 text-green-700 border-green-300" 
    : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className={cardClasses}>
      {/* Product Image (with placeholder fallback) */}
      <div className="h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          src={imageUrl || `https://placehold.co/600x480/E0E7FF/4F46E5?text=${name.replace(/\s/g, '+')}`}
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
              // Fallback to a simpler text placeholder if image fails
              e.currentTarget.src = `https://placehold.co/600x480/E0E7FF/4F46E5?text=${name.replace(/\s/g, '+')}`;
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Name and Price */}
        <h2 className={nameClasses}>{name}</h2>
        <p className={priceClasses}>${price.toFixed(2)}</p>

        {/* Conditional Status */}
        {showStockStatus && (
          <div className={`text-xs font-semibold py-1 px-3 rounded-full border mb-3 w-max ${statusClasses}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </div>
        )}

        {/* Conditional Description */}
        {showDescription && (
          <p className={descriptionClasses}>
            {description}
          </p>
        )}
        
        {/* Custom Children Content */}
        {children && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {children}
          </div>
        )}

        {/* Add to Cart Button */}
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(id)}
            disabled={!inStock}
            className={`mt-4 w-full py-3 rounded-lg font-medium transition duration-150 shadow-md 
              ${inStock
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {inStock ? "Add to Cart" : "Currently Unavailable"}
          </button>
        )}
      </div>
    </div>
)
}

