import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { ScrollAreaHorizontal } from "../components/horizontalScroll";


export const ArticlesView = observer(function SidebarRender(props) { 
    
    const navigate = useNavigate();

    return (
        <div>
            {props.data.map(renderStoresCB)}
        </div>
    );

    function handleDetailsClick() {
        navigate(`/?action=details&id=${article.id}`);
    }

    function renderStoresCB(store, index) { // index is temp, need firestore id later

        const selectedStoreNames = props.selected?.map(s => s.name) ?? [];
        if (!selectedStoreNames.includes(store.storeName)) return null;

        return (
            <div key={index}>
                <ScrollAreaHorizontal 
                    storeData = {store} 
                    onAddCartItem={(item, store) => props.handleAddItemToCart(item, store)}
                    filterCategories={props.filterCategories}    
                />
            </div>
        );
    }

});



