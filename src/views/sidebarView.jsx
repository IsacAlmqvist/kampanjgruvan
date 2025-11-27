import { observer } from "mobx-react-lite";

export const SidebarView = observer(function SidebarRender(props) {

    async function handleScrapeClickACB() {
        props.scrapeStore();
    }

    function renderStoresCB(store) {
        return (
            <option key={store} value={store}>
                {store}
            </option>
        );
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
            
        </div>
    );

    function renderSelectedCB(store) {
        return (
            <li
                key={store}
                className="list-group-item d-flex justify-content-between align-items-center mx-2"
            >
                {formatStoreName(store)}
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
                {formatStoreName(store)}
            </li> 
        )   
        : null )
    }

    function formatStoreName(store) {
        return (store.replace(/\/$/, "")
                .replace(/-\d+$/, "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase()));
    }

})
    