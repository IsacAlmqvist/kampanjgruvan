import { observer } from "mobx-react-lite";
import { scrapeIca } from "../webScraping";
export const ChooseLocalStoresView = observer(function ChooseLocalStoresRender(props) {
    

    async function handleTestClick() {
        const targetUrl = "https://www.ica.se/erbjudanden/ica-kvantum-liljeholmen-1003417/";
        scrapeIca(targetUrl);
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
            <h1>Choose your favourite store!</h1>

            <select
                className="form-select select-stores" 
                value={props.currentStore} 
                onChange={(e) => props.setCurrentStore(e.target.value)}
            >
                <option value="">Choose:</option>
                {props.stores.map(renderStoresCB)}
            </select>

            <button onClick={handleTestClick}>Test Knapp</button>
            
        </div>
    );

})