import { observer } from "mobx-react-lite";
import { Sidebar } from "./presenters/sidebarPresenter";
import { Articles } from "./presenters/articlesPresenter";
import { Header } from "./presenters/HeaderPresenter";
import { createHashRouter, RouterProvider } from "react-router-dom";

const Root = observer (

    function Root(props) {


    const router = createHashRouter([
        {
            path: "/",
            element: <Articles model = {props.model}/>
        },
        {
            path: "/articles",
            element: <Articles model = {props.model}/>
        }
    ]);

        return (
        <div className="root">
            {/* <div className="sidebar"><Sidebar model={props.model} /></div> */}
            <div className=""><Header model={props.model} /></div>
            <div className="mainContent"><RouterProvider router={router} /></div>
        </div>
        ); 
    }
);

export { Root }