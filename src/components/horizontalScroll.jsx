import { ScrollArea, Scrollbar, Thumb, Corner } from "@radix-ui/react-scroll-area"
import { Utils } from "../utilities";

export function ScrollAreaHorizontal({ storeData, onAddCartItem, filterCategories, cartItems, onUpdateCartAmount, filterSearch }) {
    return (
        <div className="w-[95%] my-3 mx-auto">
            <h2 className="font-semibold text-lg">{storeData.name}</h2>

            <ScrollArea 
                className="w-full"
                style={{ 
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <div className="flex w-max space-x-4 p-2">
                    {storeData.articles?.map(renderArticlesCB)}
                </div>
                <Scrollbar orientation="horizontal" className="flex h-2.5 touch-none select-none">
                    <Thumb className="relative flex-1 rounded-full bg-gray-300" />
                </Scrollbar>
                <Corner />
            </ScrollArea>
        </div>
    )

    function renderArticlesCB(article) {

        // Get formatted text for title and alt
        const formattedTitle = Utils.formatLongText(article.title, 40);
        const formattedAlt = Utils.formatLongText(article.mainImgAlt || article.title, 40);

        if(!(filterCategories[0] === "Visa Alla" || filterCategories.includes(article.category))) {
          return null;
        }

        const cartItem = cartItems.find(
          item => item.storeName === storeData.name && item.article.id === article.id //same article from same store
        );

        return (
            <div
              key={article.id}
              className="flex-shrink-0 w-48 rounded-lg border border-gray-400 
                p-4 flex flex-col items-center bg-white shadow-md min-h-[280px]"
            >
              <img
                src={article.mainImgSrc}
                alt={formattedAlt}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
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