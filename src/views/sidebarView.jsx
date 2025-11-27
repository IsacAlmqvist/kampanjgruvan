import { observer } from "mobx-react-lite";

export const SidebarView = observer(function SidebarRender(props) {

    async function handleScrapeClickACB() {
        // scrapeIca(storeName);
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
        <div>
            <h1>Search for your favourite store!</h1>

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

            <button onClick={handleScrapeClickACB}>Test Knapp</button>
            
        </div>
    );

    function renderSearchResultCB(store) {
        return (
            store.includes(props.searchInput.toLowerCase()) &&
            <li 
                key={store} 
                onClick={() => props.addStore(store)}
                className="list-group-item"
            >
                {store}
            </li>
        )
    }

})
    