import { observer } from "mobx-react-lite";
import { ArticlesView } from "../views/articlesView";
export const Articles = observer(function ArticlesRender(props) {
 return (
    <div className={"mb-8"}>
        <ArticlesView 
            data={props.model.storesData}
            selected={props.model.selectedStores}
            handleAddItemToCart={(item, store) => props.model.addCartItem(item, store)}
            handleUpdateCartAmount={(id, increment) => props.model.updateCartAmount(id, increment)}
            filterCategories={props.model.filterCategories}
            filterSearch={props.model.itemSearchInput}
            cartItems={props.model.cartItems}
            closest={props.model.closestStores}
        />
    </div>
    );
});