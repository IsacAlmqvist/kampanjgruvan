import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { ScrollAreaHorizontal } from "../components/horizontalScroll";


export const ArticlesView = observer(function SidebarRender(props) { 
    
    const navigate = useNavigate();

    return (
        <div>
            {props.selected.map(renderStoresCB)}
        </div>
    );

    function handleDetailsClick() {
        navigate(`/?action=details&id=${article.id}`);
    }

    function renderStoresCB(store) {

        if(store.status === "loading") return <>loading...</>;
        if(store.status === "scraping") return <>scraping...</>;

        const storeData = props.data.find(s => s.id === store.id);
        console.log(storeData);

        if (!storeData) return <>Could not load data</>;

        return (
            <div key={store.id}>
                <ScrollAreaHorizontal 
                    storeData = {storeData} 
                    onAddCartItem={(item, store) => props.handleAddItemToCart(item, store)}
                    onUpdateCartAmount={(id, increment) => props.handleUpdateCartAmount(id, increment)}
                    filterCategories={props.filterCategories}
                    filterSearch={props.filterSearch}   
                    cartItems={props.cartItems} 
                />
            </div>
        );
    }

});



