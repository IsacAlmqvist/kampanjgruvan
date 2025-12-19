import { observer } from "mobx-react-lite";
import { ScrollArea} from "@radix-ui/react-scroll-area";
import { ArticleCard } from "../components/Scroll";

export const CartView = observer(function CartRender(props) {
    
    // sort by storeName
    const sortedCart = Object.values(
        props.cartItems.reduce((acc, item) => {
            if (!acc[item.storeName]) acc[item.storeName] = [];
            acc[item.storeName].push(item);
            return acc;
        }, {})
    );
    
    return (
        <div className="w-full p-4 bg-gray-50 flex flex-col">
            
            <div className="w-full bg-[#34D399] text-white font-bold text-xl py-3 px-4 mb-4 text-center">
                Dina sparade erbjudanden
            </div>
            
            <div className="gap-6 w-full mx-auto mb-8">
                {sortedCart.map(CartRow)}
            </div>
        </div>
    )

    function CartRow(cartItems) {
        return (
            <ScrollArea key={cartItems[0].storeName} className="my-4 p-1 w-full overflow-x-auto overflow-y-hidden">
                <div className="flex space-x-4">
                    {cartItems.map(item => (
                    <ArticleCard
                        key={item.article.id}
                        article={item.article}
                        storeName={item.storeName}
                        cartAmount={item.amount}
                        cartId={item.id}
                        isCart={true}
                        onAddCartItem={() => {}}
                        onUpdateCartAmount={props.onUpdateCartAmount}
                    />
                    ))}
                </div>
            </ScrollArea>
        );
    }
});