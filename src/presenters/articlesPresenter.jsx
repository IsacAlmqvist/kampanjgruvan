import { observer } from "mobx-react-lite";
import { ArticlesView } from "../views/articlesView";
export const Articles = observer(function ArticlesRender(props) {
 return (
    <>
        <ArticlesView 
            data={props.model.storesData}
            selected={props.model.selectedStores}
            handleAddItemToCart={(item, store) => props.model.addCartItem(item, store)}
            filterCategories={props.model.filterCategories}
        />
    </>
    );
});