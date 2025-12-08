import { ScrollArea, Scrollbar, Thumb, Corner } from "@radix-ui/react-scroll-area"
import { Utils } from "../utilities";

export function ScrollAreaHorizontal({ storeData }) {
    return (
        <div className="w-[95%] my-3 mx-auto">
            <h2 className="font-semibold text-lg">{Utils.formatStoreName(storeData.storeName)}</h2>

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
        return (
            <div
              key={article.id}
              className="flex-shrink-0 w-30 rounded-lg border border-gray-400 
                p-4 flex flex-col items-center bg-white shadow-md"
            >
              <img
                src={article.mainImgSrc}
                alt={article.mainImgAlt || article.title}
                className="w-full object-cover rounded-md mb-2"
              />
              <span className="text-sm text-center font-medium mb-1 truncate">
                {article.title}
              </span>
              <span className="text-xs text-gray-500 mb-2">{article.price}</span>
              <button
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 text-xs"
                onClick={() => onAddItem?.(article)}
              >
                +
              </button>
            </div>
        )
    }
}