import { observer } from "mobx-react-lite";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArticleCard } from "../components/Scroll";

export const CartView = observer(function CartRender(props) {
    const sortedCart = Object.values(
        props.cartItems.reduce(function(acc, item) {
            if (!acc[item.storeName]) acc[item.storeName] = [];
            acc[item.storeName].push(item);
            return acc;
        }, {})
    );
    
    function handleRenderCartRowCB(cartItems) {
        return (
            <ScrollArea
                key={cartItems[0].storeName}
                className="py-3 overflow-x-auto overflow-y-hidden"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to right, black 90%, transparent 100%)",
                    maskImage:
                        "linear-gradient(to right, black 90%, transparent 100%)",
                }}
            >
                <div className="flex space-x-4">
                    {cartItems.map(function(item) {
                        return (
                            <ArticleCard
                                key={item.article.id}
                                article={item.article}
                                storeName={item.storeName}
                                cartAmount={item.amount}
                                cartId={item.id}
                                isCart={true}
                                onAddCartItem={handleAddCartItemCB}
                                onUpdateCartAmount={props.onUpdateCartAmount}
                                className="min-w-[200px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                            />
                        );
                    })}
                </div>
                <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-theme-50 to-transparent" />
            </ScrollArea>
        );
    }
    
    function handleAddCartItemCB() {
        // Handle add cart item
    }
    
    return (
        <div className="bg-theme-50 flex flex-col">
            <div className="my-4 bg-theme-500 text-white font-bold text-xl mx-4 py-3 px-4 mb-4 rounded-lg text-center shadow-md">
                Dina sparade erbjudanden
            </div>
            
            <div className="pl-4 w-full mx-auto mb-8 flex flex-col divide-y divide-theme-500/70">
                {sortedCart.map(handleRenderCartRowCB)}
            </div>
        </div>
    );
});