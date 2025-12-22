import { observer } from "mobx-react-lite";
import { ScrollAreaHorizontal } from "../components/Scroll";
import { Utils } from "../utilities";

export const ArticlesView = observer(function SidebarRender(props) {
    function renderStoresCB(store) {
        return (
            <div className="w-[98%] ml-auto" key={store.name}>
                <div className="mb-1 mt-4">
                    <h2 className="text-lg md:text-xl font-bold text-theme-800">
                        {store.name}
                    </h2>
                    <div className={`h-[3px] w-26 mb-2 mt-[2px] rounded shadow-sm ${Utils.getStoreLineStyle(store.name)}`} />
                </div>
                {chooseSuspenseCB(store)}
            </div>
        );
    }
    
    function chooseSuspenseCB(store) {
        if (store.status === "loading") return LoadingDotsCB();
        
        const storeData = props.data.find(function(s) {
            return s.name === store.name;
        });
        
        if (store.status === "ready" && storeData) {
            const storeArticles = storeData.articles ?? [];
            const hasFilteredArticles = storeArticles.some(function(article) {
                const searchQuery = props.filterSearch?.toLowerCase() || "";
                const searchHit = article.title.toLowerCase().includes(searchQuery);
                return (
                    (props.filterCategories[0] === "Visa Alla" ||
                    props.filterCategories.includes(article.category)) &&
                    searchHit
                );
            });
            
            if (!hasFilteredArticles) return null;
            
            return (
                <ScrollAreaHorizontal 
                    storeData={storeData} 
                    onAddCartItem={handleAddCartItem}
                    onUpdateCartAmount={handleUpdateCartAmount}
                    filterCategories={props.filterCategories}
                    filterSearch={props.filterSearch}   
                    cartItems={props.cartItems} 
                    className="bg-theme-50 rounded-xl p-2"
                />
            )
        }
        
        setTimeout(function() {
            Utils.quickAlert("Kunde inte hämta erbjudanden från " + store.name);
            props.removeStore(store);
        }, 0);
        
        return <></>;
    }
    
    function LoadingDotsCB() {
        return (
            <div className="flex items-center justify-center py-6">
                <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 bg-theme-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2.5 h-2.5 bg-theme-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2.5 h-2.5 bg-theme-300 rounded-full animate-bounce" />
                </div>
            </div>
        );
    }
    
    function handleAddCartItem(item, store) {
        props.handleAddItemToCart(item, store);
    }
    
    function handleUpdateCartAmount(id, increment) {
        props.handleUpdateCartAmount(id, increment);
    }
    
    function filterClosestStoresCB(store) {
        return !props.selected.some(function(s) {
            return s.name === store.name;
        });
    }
    
    return (
        <div className="pb-10">
            <div className="mb-10">
                {props.selected.map(renderStoresCB)}
            </div>
            {props.selected.length < 5 && props.closest && 
                <div className="flex items-center w-[96%] mb-3 gap-3 mx-auto">
                    <h3 className="text-2xl font-bold tracking-wide text-theme-800">
                        Erbjudanden nära dig
                    </h3>
                    <div className="align-center mt-1 flex-grow h-[2px] bg-gradient-to-r from-theme-500 to-transparent mr-[15%]" />
                </div>
            }
            {props.closest
                .filter(filterClosestStoresCB)
                .slice(0, 5 - props.selected.length)
                .map(renderStoresCB)}
        </div>
    );
});