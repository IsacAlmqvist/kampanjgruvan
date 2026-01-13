import { observer } from "mobx-react-lite";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArticleCard } from "../components/Scroll";
import { Utils } from "../utilities";

export const CartView = observer(function CartRender(props) {
    const sortedCart = Object.values(
        props.cartItems.reduce(function(acc, item) {
            if (!acc[item.storeName]) acc[item.storeName] = [];
            acc[item.storeName].push(item);
            return acc;
        }, {})
    );
    
    return (
        <div className="bg-theme-50 flex flex-col">
            
            <div className="my-4 bg-theme-500 text-white font-bold text-xl mx-4 py-3 px-4 mb-6 rounded-lg text-center shadow-md">
                Dina sparade erbjudanden
            </div>
            
            <div className="pl-4 w-full mx-auto mb-16 flex flex-col">
                {sortedCart.map(CartRow)}
            </div>
        </div>
    );

    function CartRow(cartItems) {

        const totalOre = cartItems.reduce((sumOre, item) => {
            const orePerItem = Utils.priceStringToOre(item.article.price);
            const qty = Number((item.amount / Utils.getMultiBuyCount(item.article.price))) || 0;
            return sumOre + orePerItem * qty;
        }, 0);

        return (
            <div key={cartItems[0].storeName}>
                <ScrollArea
                    className="py-1 overflow-x-auto overflow-y-hidden"
                    style={{
                        WebkitMaskImage:
                            "linear-gradient(to right, black 90%, transparent 100%)",
                        maskImage:
                            "linear-gradient(to right, black 90%, transparent 100%)",
                    }}
                >
                    <div className={`font-bold text-lg pb-1
                        ${Utils.getStoreTextStyle(cartItems[0].storeName)}`}>
                    {cartItems[0].storeName}
                    </div>

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
                                className="min-w-[200px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                            />
                        ))}
                    </div>

                </ScrollArea>

                <div className="mt-3 pr-4 flex">
                    <div className="text-[15px] shadow-sm text-theme-600 bg-theme-100 px-3 py-1 rounded-full">
                        Totalt: <span className="font-semibold">
                            {Utils.formatOreToSek(totalOre)}
                        </span>
                    </div>
                </div>

                <div className="align-center mt-3 mb-2 flex-grow h-[1px] bg-gradient-to-r from-theme-400 to-transparent mr-[15%]" />
            </div>
        );
    }
});