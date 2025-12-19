import { ScrollArea, Scrollbar, Thumb, Corner } from "@radix-ui/react-scroll-area"
import { Utils } from "../utilities";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export function ScrollAreaHorizontal({storeData, onAddCartItem, filterCategories, cartItems, onUpdateCartAmount, filterSearch }) {

  const parentRef = useRef(null);
  const articles = storeData.articles ?? [];

  // filter out before virtualizer
  const filteredArticles = articles.filter(article => {
    const searchQuery = filterSearch?.toLowerCase() || "";
    const searchHit = article.title.toLowerCase().includes(searchQuery);

    return (
      (filterCategories[0] === "Visa Alla" ||
        filterCategories.includes(article.category)) &&
      searchHit
    );
  });

  const CARD_WIDTH = 320;

  const virtualizer = useVirtualizer({
    count: filteredArticles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_WIDTH,
    horizontal: true,
    overscan: 3,
  });

  return (
    <ScrollArea
      ref={parentRef}
      className="w-full overflow-x-auto overflow-y-hidden"
    >
      <div
        style={{
          width: virtualizer.getTotalSize(),
          height: 170,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map(v => {
          const article = filteredArticles[v.index];
          const cartItem = cartItems.find(
            item => item.storeName === storeData.name && item.article.id === article.id
          )
          const cartAmount = cartItem?.amount || 0;
          const cartId = cartItem?.id;

          return (
            <div
              key={article.id}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateX(${v.start}px)`,
                width: CARD_WIDTH,
                paddingRight: 16
              }}
            >
              <ArticleCard 
                article={article}
                storeName={storeData.name}
                onAddCartItem={onAddCartItem}
                cartAmount={cartAmount}
                cartId={cartId}
                onUpdateCartAmount={onUpdateCartAmount}
              />
            </div>
          );
        })}
      </div>

      <Scrollbar orientation="horizontal">
        <Thumb />
      </Scrollbar>
    </ScrollArea>
  );
}

 export function ArticleCard({article, cartId, storeName, cartAmount, isCart = false, onAddCartItem, onUpdateCartAmount}) {
  const formattedTitle = Utils.formatLongText(article.title, 55);

  const brand = article.brand ? article.brand + ". " : " ";
  
  return (
    <div
      key={cartId || article.id}
      className={`
        relative h-[168px] flex-shrink-0
        rounded-xl border border-gray-300 bg-white
        shadow-md hover:shadow-lg hover:border-green-400
        transition-all overflow-hidden ${isCart && "w-[290px]"}
      `}
    >

      {/* Storename for cart items */}
      {isCart &&
        <div className={`absolute max-w-[50%] rounded-md top-0 left-1 p-1 text-[14px] font-bold 
            leading-tight line-clamp-2 z-10 bg-white/70 
            ${Utils.getStoreBrandStyle(storeName)}`}>
          {storeName}
        </div>
      }

      {/* Image */}
      <div className="absolute inset-0 flex items-center pr-7 pb-4 justify-center">
        {article.image && (
          <img
            src={article.image}
            alt={formattedTitle}
            loading="lazy"
            decoding="async"
            className="
              max-h-[120px] max-w-[85%]
              object-contain
            "
          />
        )}
      </div>
      
      {/* Price */}
      <div className="absolute right-4 top-[8px] text-[25px] font-bold text-red-600 leading-none bg-white/70 rounded pl-1 pb-1">
        {article.price.replace(":-", " kr").replace("/st", "").replace(",00", "kr")}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/40 via-white/10 to-transparent" />

      <div className="absolute bottom-1 left-3 bg-white/70 p-[2px] rounded z-10 max-w-[70%]">
        {/* Title */}
          <span className="text-md font-semibold leading-tight line-clamp-2">
            {formattedTitle}
          </span>
        {/* Brand */}
        <div className="text-[11px] text-gray-500 tracking-wide">
          {brand} {article.amount}
        </div>
      </div>

      {/* price/kg NOT DONE*/}
      {article.comparePrice && (
        <div className="absolute top-9 right-3 text-[10px] max-w-[30%] text-gray-500">
          {article.comparePrice}
        </div>
      )}

      {/* Cart controls – kept but visually minimal */}
      <div className="absolute bottom-2 right-2 z-20">
        {!cartAmount ? (
          <button
            className="w-8 h-8 text-[16px] pb-[3px] rounded-full border border-gray-200 text-gray-600 font-bold
                       hover:bg-gray-200 active:scale-95"
            onClick={() => onAddCartItem(article, storeName)}
          >
            +
          </button>
        ) : (
          <div className="flex items-center bg-white rounded-full shadow-sm">
            <button
              className="text-sm hover:bg-gray-200 active:scale-95 px-2 py-1 rounded-full"
              onClick={() => onUpdateCartAmount(cartId, -1)}
            >
              −
            </button>
            <span className="text-sm px-1">{cartAmount}</span>
            <button
              className="text-sm hover:bg-gray-200 active:scale-95 px-2 py-1 rounded-full"
              onClick={() => onUpdateCartAmount(cartId, 1)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
