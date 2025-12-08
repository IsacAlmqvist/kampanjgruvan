import { observer } from "mobx-react-lite";
import { Filter } from "./presenters/FilterPresenter";
import { Articles } from "./presenters/articlesPresenter";
import { Header } from "./presenters/HeaderPresenter";
import { Login } from "./presenters/loginPagePresenter";
import { Cart } from "./presenters/cartPresenter";
import { createHashRouter, RouterProvider } from "react-router-dom";

const Root = observer(function Root(props) {
    const router = createHashRouter([
        {
            path: "/",
            element: (
                <>
                    <Header model = {props.model}/>
                    <Filter model = {props.model}/>
                    <Articles model = {props.model}/>
                </>
            )
        },
        {
            path: "/articles",
            element: (
                <>
                    <Header model = {props.model}/>
                    <Filter model = {props.model}/>
                    <Articles model = {props.model}/>
                </>
            )        
        },
        {
            path: "/cart",
            element: (
                <>
                    <Header model = {props.model}/>
                    <Cart model = {props.model}/>
                </>
            )
        },
        {
            
        }
    ]);

    return (
        <div className="root">
            <RouterProvider router={router} />
        </div>
    ); 
});

export { Root }