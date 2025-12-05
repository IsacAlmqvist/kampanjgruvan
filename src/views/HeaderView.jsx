import { observer } from "mobx-react-lite";
import { loginWithGoogle, logout } from "../firestoreModel"

export const HeaderView = observer(function HeaderRender(props) {

    return (
        <div 
            onFocus={props.setSearchFocus}
            className="flex justify-between gap-3 w-full p-3 bg-blue-200"
        >

            <h3>KampanjGruvan</h3>

            <div className="flex-grow-1" style={{ maxWidth: "60%" }}>
                <input
                    placeholder="Sök efter dina favoritbutiker"
                    className="p-2 pl-4 border border-gray-300"
                    value={props.searchInput}
                    onChange={(e) => {props.setCurrentSearch(e.target.value);}}
                >
                </input>
            </div>

            <button onClick={props.user ? logout : loginWithGoogle}>
                {props.user ? "Logga ut" : "Logga in"}
            </button>
            
            <i >"hej"</i>

        </div>
    );

})
    