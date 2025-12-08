import { observer } from "mobx-react-lite";
import { Utils } from "../utilities";

export const CartView = observer(function CartRender(props) { 
    
    return (
        <div className="w-full p-4 bg-gray-50 flex flex-col">
            
            <div className="gap-6 w-full mx-auto mb-8
                grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] 
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2 
                lg:grid-cols-3">
                {props.cartItems.map(renderCartItemsCB)}
            </div>
        </div>
    )

    function renderCartItemsCB(item) {

        const formattedTitle = Utils.formatLongText(item.article.title, 40);
        const formattedAlt = Utils.formatLongText(item.article.mainImgAlt || item.article.title, 40);

        console.log(item);

        return (
            <div
                key={item.article.id} 
                className="flex flex-row justify-between bg-white rounded-2xl shadow-md hover:shadow-xl 
                    hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
            >
                <div 
                    className="ms-2 p-3 cursor-pointer items-center flex flex-col"
                >
                    <p className="fs-3 font-bold text-gray-800 tracking-tight">
                        {formattedTitle}
                    </p>
                    <img
                        src={item.article.mainImgSrc}
                        alt={formattedAlt}
                        className="h-28 object-cover rounded-md -my-[20px] mx-10"
                    />
                    <p className="fs-2 ml-auto font-bold text-gray-800 tracking-tight">
                        {Utils.formatStoreName(item.store)}
                    </p>
                </div>
                
                <button
                    className="p-4 bg-gray-50 hover:bg-gray-200 border-t border-gray-100
                        w-[30%] flex items-center justify-center gap-2 text-red-400 
                        py-3 rounded-xl transition-colors duration-200"
                    onClick={() => props.onRemoveItem(item.article.id)}
                >
                    X
                </button>
            </div> 
        )
    }

});