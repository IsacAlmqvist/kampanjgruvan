import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";

export const CartView = observer(function CartRender(props) { 
    
    return (
        <div className="w-full p-4 bg-gray-50 flex flex-col">
            
            <div className="w-full bg-[#34D399] text-white font-bold text-xl py-3 px-4 mb-4 text-center">
                Your Cart
            </div>
            
            <div className="gap-6 w-full mx-auto mb-8
                grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] 
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-3">
                {props.cartItems.map(renderCartItemsCB)}
            </div>
        </div>
    )

    function renderCartItemsCB(item) {

        const formattedTitle = Utils.formatLongText(item.article.title, 40);
        const formattedAlt = Utils.formatLongText(item.article.mainImgAlt || item.article.title, 40);

        return (
            <div
                key={item.id} 
                className="flex flex-row justify-between bg-white rounded-2xl shadow-md hover:shadow-xl relative
                    hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
            >
                <div 
                    className="ms-2 p-3 cursor-pointer items-center flex flex-col w-full"
                >
                    <p className="font-bold text-md text-gray-800 mr-auto z-10 max-w-[80%] tracking-tight">
                        {formattedTitle}
                    </p>

                    <img
                        src={item.article.mainImgSrc}
                        alt={formattedAlt}
                        className="h-28 object-cover rounded-md mx-auto my-auto"
                    />

                    <div className="flex justify-between items-end w-full mt-auto">
                        <p className="font-bold text-gray-800 tracking-tight">
                            {item.storeName}
                        </p>
                        <span className="text-base text-gray-500 mb-3 mt-auto bg-orange-100 text-orange-800 px-2 py-1 rounded">{item.article.price}</span>
                    </div>

                    <div className="flex items-center gap-2 absolute top-2 right-10">
                        <button
                            className="px-2 py-1 bg-gray-200 rounded"
                            onClick={() => props.onUpdateCartAmount(item.id, -1)}
                        >
                            -
                        </button>
                        <span className="px-1">{item.amount}</span>
                        <button
                            className="px-2 py-1 bg-green-200 rounded"
                            onClick={() => props.onUpdateCartAmount(item.id, 1)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded absolute top-2 right-2"
                        onClick={() => props.onUpdateCartAmount(item.id, -item.amount)}
                    >
                        X
                    </button>
                </div>
                
            </div> 
        )
    }

});