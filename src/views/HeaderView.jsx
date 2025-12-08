import { observer } from "mobx-react-lite";
import { loginWithGoogle, logout } from "../firestoreModel"
import { useNavigate } from "react-router-dom";

export const HeaderView = observer(function HeaderRender(props) {

    const navigate = useNavigate();

    return (
        <div 
            onFocus={props.setSearchFocus}
            className="flex justify-between gap-3 w-full p-3 bg-green-100"
        >

            <h3
                onClick={() => navigate("/")}
            >
                KampanjGruvan
            </h3>

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


            <div 
                className="relative inline-block"
                onClick={() => navigate("/cart")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {props.cartItems.length}
                </span>
            </div>

        </div>
    );

})
    