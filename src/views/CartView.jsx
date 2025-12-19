import { observer } from "mobx-react-lite";
import { ScrollArea, Scrollbar, Thumb, Corner } from "@radix-ui/react-scroll-area";
import { ArticleCard } from "../components/horizontalScroll";

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

    // function renderCartItemsCB(item) {

    //     const formattedTitle = Utils.formatLongText(item.article.title, 40);
    //     const formattedAlt = Utils.formatLongText(item.article.mainImgAlt || item.article.title, 40);

    //     return (
    //         <div
    //             key={item.id} 
    //             className="flex flex-row justify-between bg-white rounded-2xl shadow-md hover:shadow-xl relative
    //                 hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
    //         >
    //             <div 
    //                 className="ms-2 p-3 cursor-pointer items-center flex flex-col w-full"
    //             >
    //                 <p className="font-bold text-md text-gray-800 mr-auto z-10 max-w-[80%] tracking-tight">
    //                     {formattedTitle}
    //                 </p>

    //                 <img
    //                     src={item.article.mainImgSrc}
    //                     alt={formattedAlt}
    //                     className="h-28 object-cover rounded-md mx-auto my-auto"
    //                 />

    //                 <div className="flex justify-between items-end w-full mt-auto">
    //                     <p className="font-bold text-gray-800 tracking-tight">
    //                         {item.storeName}
    //                     </p>
    //                     <span className="text-base text-gray-500 mb-3 mt-auto bg-orange-100 text-orange-800 px-2 py-1 rounded">{item.article.price}</span>
    //                 </div>

    //                 <div className="flex items-center gap-2 absolute top-2 right-10">
    //                     <button
    //                         className="px-2 py-1 bg-gray-200 rounded"
    //                         onClick={() => props.onUpdateCartAmount(item.id, -1)}
    //                     >
    //                         -
    //                     </button>
    //                     <span className="px-1">{item.amount}</span>
    //                     <button
    //                         className="px-2 py-1 bg-green-200 rounded"
    //                         onClick={() => props.onUpdateCartAmount(item.id, 1)}
    //                     >
    //                         +
    //                     </button>
    //                 </div>
    //                 <button
    //                     className="px-2 py-1 bg-red-500 text-white rounded absolute top-2 right-2"
    //                     onClick={() => props.onUpdateCartAmount(item.id, -item.amount)}
    //                 >
    //                     X
    //                 </button>
    //             </div>
                
    //         </div> 
    //     )
    // }

});