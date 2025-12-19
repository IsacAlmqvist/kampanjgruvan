import { observer } from "mobx-react-lite";
import { CartView } from "../views/CartView";
export const Cart = observer(function CartRender(props) {
 return (
    <>
        <CartView 
            cartItems={props.model.cartItems}
            onUpdateCartAmount={(id, increment) => props.model.updateCartAmount(id, increment)}
        />
    </>
    );
});