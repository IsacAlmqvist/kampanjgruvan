import { ScrollArea, Scrollbar, Thumb, Corner } from "@radix-ui/react-scroll-area"


/*
export function ScrollAreaHorizontal(props) {

    return (
        <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
            <div className="flex w-max space-x-4 p-4">
                {props.articles.map(renderArticlesCB)}
            </div>
            <Scrollbar orientation="horizontal" />
        </ScrollArea>
    )

    function renderArticlesCB(article) {
        return (
            <figure key={article.id} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                    <img
                    src={article.mainImgSrc}
                    alt={`Photo by ${article.mainImgAlt}`}
                    className="aspect-[3/4] h-fit w-fit object-cover"
                    width={300}
                    height={400}
                    />
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xs">
                    {article.title} {article.price}
                    <span className="text-foreground font-semibold">
                    {article.title} {article.price}
                    </span>
                </figcaption>
            </figure>
        )
    }
}

*/


export function ScrollAreaHorizontal({ storeData }) {
    return (
        <div>
            {storeData.storeName}
            <ScrollArea 
                className="w-full rounded-md border"
                style={{ 
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <div className="flex w-max space-x-4 p-4">
                    {storeData.articles.map(renderArticlesCB)}
                </div>
                <Scrollbar orientation="horizontal" className="flex h-2.5 touch-none select-none">
                    <Thumb className="relative flex-1 rounded-full bg-border" />
                </Scrollbar>
                <Corner />
            </ScrollArea>
        </div>
    )

    function renderArticlesCB(article) {
        return (
            <figure key={article.id} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                    <img
                        src={article.mainImgSrc}
                        alt={`Photo by ${article.mainImgAlt}`}
                        className="aspect-[3/4] h-fit w-fit object-cover"
                        width={300}
                        height={400}
                    />
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xs">
                    {article.title} {article.price}
                    <span className="text-foreground font-semibold">
                        {article.title} {article.price}
                    </span>
                </figcaption>
            </figure>
        )
    }
}