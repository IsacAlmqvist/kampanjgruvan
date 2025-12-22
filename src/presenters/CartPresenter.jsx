import { observer } from "mobx-react-lite";
import { CartView } from "../views/ShoppingCartView";

export const Cart = observer(function CartRender(props) {
    
    function handleUpdateCartAmountCB(id, increment) {
        props.model.updateCartAmount(id, increment);
    }

    return (
        <>
            <CartView 
                cartItems={props.model.cartItems}
                onUpdateCartAmount={handleUpdateCartAmountCB}
            />
        </>
    );
});