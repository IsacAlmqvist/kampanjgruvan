import { observer } from "mobx-react-lite";
import { CartView } from "../views/cartView";
export const Cart = observer(function CartRender(props) {
 return (
    <>
        <CartView 
            cartItems={props.model.cartItems}
            onRemoveItem={(id) => props.model.removeCartItem(id)}
        />
    </>
    );
});