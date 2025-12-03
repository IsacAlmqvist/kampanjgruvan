import { observer } from "mobx-react-lite";

export const HeaderView = observer(function HeaderRender(props) {

    return (
        <div 
            className="d-flex justify-content-between gap-3 w-100 p-3 bg-blue-200"
            onFocus={props.setSearchFocus}
        >

            <h3>KampanjGruvan</h3>

            <div className="flex-grow-1" style={{ maxWidth: "60%" }}>
                <input
                    className="fs-5 p-2 ps-4 form-control select-stores rounded-pill"
                    placeholder="Sök efter dina favoritbutiker"
                    value={props.searchInput}
                    onChange={(e) => {props.setCurrentSearch(e.target.value);}}
                >
                </input>
            </div>
            
            <i className="bi bi-cart3 fs-1"></i>

        </div>
    );

})
    