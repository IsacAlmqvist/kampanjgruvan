export function HorizontalList({ props }) {
    return (
        <div className="overflow-x-auto scroll-smooth py-4">
            <div className="inline-flex gap-4 px-4">
                {props.articles.map(renderArticlesCB)}
            </div>
        </div>
    );

    function renderArticlesCB(article) {
        return (
            <div className="overflow-hidden rounded-md"
                key={article.id}
            >
                <img
                src={article.mainImgSrc}
                alt={`Photo by ${article.mainImgAlt}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
                />
            </div>
        )
    }
}