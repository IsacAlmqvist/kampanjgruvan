import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";
import { useNavigate } from 'react-router-dom';
import { HorizontalList } from "../components/horizontalList"
import { ScrollAreaHorizontal } from "../components/horizontalScroll";


export const ArticlesView = observer(function SidebarRender(props) { 
    
    const navigate = useNavigate();

    return (
        <div className="flex gap-6 w-full max-w-7xl mx-auto mb-8
            grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] 
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3 
            lg:grid-cols-4"
        >
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
                <ScrollAreaHorizontal storeData = {store}/>
            </div>
        );
    }

});



