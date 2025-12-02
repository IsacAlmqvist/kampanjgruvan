import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";

export const ArticlesView = observer(function SidebarRender(props) { 
    
    return (
        <div className="d-flex">
            {props.data.map(renderStoresCB)}
        </div>
    );

    function renderStoresCB(store, index) { // index is temp, need firestore id later

        if (!props.selected.includes(store.storeName)) return null;

        return (
            <div key={index}>
                <h3>{Utils.formatStoreName(store.storeName)}</h3>
                <ul className="list-group">
                    {store.articles.map(renderArticlesCB)}
                </ul>
            </div> 
        );
    }

    function renderArticlesCB(article, index) { // index is temp, need firestore id later
        return (
            <li key={index} className="list-group-item">
                <span>{article.title} {article.price}</span>
            </li>
        )
    }

});