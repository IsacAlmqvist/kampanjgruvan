import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";
import { useNavigate } from 'react-router-dom';

export const SidebarView = observer(function SidebarRender(props) {

    const navigate = useNavigate();

    async function handleScrapeClickACB() {
        props.scrapeStore();
        navigate("/articles");
    }

    return (
        <div className="sidebar">

            <div className="m-2">
                <input
                    className="form-control select-stores"
                    placeholder="Search..."
                    value={props.searchInput}
                    onChange={(e) => {props.setCurrentSearch(e.target.value);}}
                >
                </input>
                <ul className="list-group">
                    {props.searchInput && props.stores.map(renderSearchResultCB)}
                </ul>
            </div>

            <ul className="list-group">
                {props.selectedStores.map(renderSelectedCB)}
            </ul>

            <button className="btn btn-primary m-2" onClick={handleScrapeClickACB}>SCRAPE</button>
            <button className="btn btn-primary m-2" onClick={props.getCategoriesTestACB}>LLM-TEST</button>
            
        </div>
    );

    function renderSelectedCB(store) {
        return (
            <li
                key={store}
                className="list-group-item d-flex justify-content-between align-items-center mx-2"
            >
                {Utils.formatStoreName(store)}
                <button
                    className="text-danger p-0"
                    onClick={() => props.removeSelected(store)}
                >
                    X
                </button>
            </li>
        )
    }

    function renderSearchResultCB(store) {
        const query = props.searchInput?.toLowerCase() || "";

        return (
            store.includes(query) ? (
            <li 
                key={store} 
                onClick={() => props.addStore(store)}
                className="list-group-item"
            >
                {Utils.formatStoreName(store)}
            </li> 
        )   
        : null )
    }

})
    