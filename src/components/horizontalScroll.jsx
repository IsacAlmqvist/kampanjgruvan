import { ScrollArea, Scrollbar, Thumb, Corner } from "@radix-ui/react-scroll-area"
import { Utils } from "../utilities";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export function ScrollAreaHorizontal({ storeData, onAddCartItem, filterCategories, cartItems, onUpdateCartAmount, filterSearch }) {

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

  const virtualizer = useVirtualizer({
    count: filteredArticles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
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
          height: 275,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map(v => {
          const article = filteredArticles[v.index];

          return (
            <div
              key={article.id}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateX(${v.start}px)`,
                width: v.size,
              }}
            >
              {renderArticlesCB(article)}
            </div>
          );
        })}
      </div>

      <Scrollbar orientation="horizontal">
        <Thumb />
      </Scrollbar>
    </ScrollArea>
  );

  function renderArticlesCB(article) {

    // Get formatted text for title and alt
    const formattedTitle = Utils.formatLongText(article.title, 40);
    const formattedAlt = Utils.formatLongText(article.title, 40);

    const cartItem = cartItems.find(
      item => item.storeName === storeData.name && item.article.id === article.id //same article from same store
    );

    return (
      <div
        key={article.id}
        className="flex-shrink-0 w-48 rounded-lg border border-gray-400 
                p-4 flex flex-col items-center bg-white shadow-md max-h-[280px] overflow-hidden"
      >
        <div className="h-32 flex items-center justify-center">
          <img
            src={article.image}
            alt={formattedAlt}
            loading="lazy"
            decoding="async"
            className="max-h-32 max-w-[90%] object-cover m-auto rounded-md"
          />
        </div>
        <div className="flex flex-col items-center flex-grow w-full">
          <span className="text-sm text-center font-medium mb-1 whitespace-pre-line min-h-[2.5em]">
            {formattedTitle}
          </span>
          <span className="text-xs text-gray-500 mb-3 mt-auto bg-orange-100 text-orange-800 px-2 py-1 rounded">{article.price}</span>

          {/* if item already in cart, let user increment or decrement amount */}
          {!cartItem ? (
            <button
              className="px-3 py-1.5 text-white bg-green-300 rounded active:scale-97 hover:bg-green-200 
                      text-sm font-medium min-w-[60px]"
              onClick={() => onAddCartItem(article, storeData.name)}
            >
              +
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => onUpdateCartAmount(cartItem.id, -1)}
              >
                -
              </button>
              <span className="px-2">{cartItem.amount}</span>
              <button
                className="px-2 py-1 bg-green-200 rounded"
                onClick={() => onUpdateCartAmount(cartItem.id, 1)}
              >
                +
              </button>
            </div>
          )}

        </div>
      </div>
    )
  }
}