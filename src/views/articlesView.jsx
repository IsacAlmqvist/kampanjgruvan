import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { ScrollAreaHorizontal } from "../components/horizontalScroll";
import { Utils } from "../utilities";

export const ArticlesView = observer(function SidebarRender(props) { 
    
    const navigate = useNavigate();

    function handleDetailsClick() {
        navigate(`/?action=details&id=${article.id}`);
    }

    function renderStoresCB(store) {

        return (
            <div className="w-[95%] mx-auto" key={store.name}>
                <div className="mb-1 mt-4">
                    <h2
                        className={`text-lg md:text-xl font-bold text-gray-800`}
                    >
                        {store.name}
                    </h2>
                    <div className={`h-[3px] w-24 mt-1 rounded ${Utils.getStoreBrandStyle}`} />
                </div>
                {chooseSuspenseCB(store)}
            </div>
        );
    }

    const chooseSuspenseCB = (store) => {
        if(store.status === "loading") return LoadingDotsCB();

        const storeData = props.data.find(s => s.name === store.name);
        if(store.status === "ready" && storeData)
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

        return <div key={store.id} className="p-3 text-lg">Kunde inte ladda data</div>;

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
            <div className="mb-10">
                {props.selected.map(renderStoresCB)}
            </div>
            {props.selected.length < 5 && props.closest && 
                <div className="flex items-center w-[96%] mb-3 gap-3 mx-auto">

                    <h3 className="text-xl md:text-2xl font-bold tracking-wide text-gray-800">
                        Erbjudanden nära dig
                    </h3>

                    <div className="align-center mt-1 flex-grow h-[2px] bg-gradient-to-r from-green-500 to-transparent mr-[20%]" />
                </div>
            }
            {props.closest
                .filter(store => !props.selected.some(s => s.name === store.name))
                .slice(0, 5 - props.selected.length)
                .map(renderStoresCB)}
        </>
    );

});



