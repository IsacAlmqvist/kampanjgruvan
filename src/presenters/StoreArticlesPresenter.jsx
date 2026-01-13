import { observer } from "mobx-react-lite";
import { ArticlesView } from "../views/StoreArticlesView";

export const Articles = observer(function ArticlesRender(props) {
    
    function handleAddItemToCartACB(item, store) {
        props.model.addCartItem(item, store);
    }
    
    function handleUpdateCartAmountACB(id, increment) {
        props.model.updateCartAmount(id, increment);
    }
    
    function handleRemoveStoreACB(store) {
        props.model.removeStoreError(store);
    }
    
    return (
        <div className={"mb-8"}>
            <ArticlesView 
                data={props.model.storesData}
                selected={props.model.selectedStores}
                handleAddItemToCart={handleAddItemToCartACB}
                handleUpdateCartAmount={handleUpdateCartAmountACB}
                filterCategories={props.model.filterCategories}
                filterSearch={props.model.itemSearchInput}
                cartItems={props.model.cartItems}
                closest={props.model.closestStores}
                removeStore={handleRemoveStoreACB}
            />
        </div>
    );
});