import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { ScrollAreaHorizontal } from "../components/horizontalScroll";
import { scrapeStore } from "../scraping/scrapingEntry";
import { scrapeCoop } from "../scraping/coop";


export const ArticlesView = observer(function SidebarRender(props) { 
    
    const navigate = useNavigate();

    function handleDetailsClick() {
        navigate(`/?action=details&id=${article.id}`);
    }

    function renderStoresCB(store) {

        return (
            <div className="w-[95%] mx-auto" key={store.id}>
                <h2 className="text-lg font-semibold p-1 text-gray-800">{store.name}</h2>
                {chooseSuspenseCB(store)}
            </div>
        );
    }

    const chooseSuspenseCB = (store) => {
        if(store.status === "loading") return LoadingDotsCB();
        if(store.status === "scraping") return ScrapingSuspenseCB();

        const storeData = props.data.find(s => s.id === store.id);
        if (!storeData) return <div key={store.id} className="p-3 text-lg">Kunde inte ladda data</div>;

        return (
            <ScrollAreaHorizontal 
                storeData = {storeData} 
                onAddCartItem={(item, store) => props.handleAddItemToCart(item, store)}
                onUpdateCartAmount={(id, increment) => props.handleUpdateCartAmount(id, increment)}
                filterCategories={props.filterCategories}
                filterSearch={props.filterSearch}   
                cartItems={props.cartItems} 
            />
        )
    }

    const LoadingDotsCB = () => (
        <div className="flex items-center justify-center py-6">
            <div className="flex gap-1">
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" />
            </div>
        </div>
    );

    const ScrapingSuspenseCB = () => (
        <div className="flex flex-col items-center justify-center gap-3 pb-10">
            <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gray-500 animate-spin" />
        </div>

            <p className="text-sm text-gray-600 tracking-wide">
                Hämtar veckans kampanjer
            </p>
        </div>
    );

    return (
        <>
            {props.selected.map(renderStoresCB)}
        </>
    );

});



