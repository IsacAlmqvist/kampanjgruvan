import { observer } from "mobx-react-lite";
import { Filter } from "./presenters/FilterPresenter";
import { Articles } from "./presenters/articlesPresenter";
import { Header } from "./presenters/HeaderPresenter";
import { Login } from "./presenters/loginPagePresenter";
import { createHashRouter, RouterProvider } from "react-router-dom";

const Root = observer(function Root(props) {
    const router = createHashRouter([
        {
            path: "/",
            element: <Articles model={props.model} />
        },
        {
            path: "/articles",
            element: <Articles model={props.model} />
        },
        {
            path: "/login",
            element: <Login model={props.model} />
        }
    ]);

    return (
        <div className="root">
            <Header model={props.model} />
            <Filter model={props.model}/>
            <div className="mainContent"><RouterProvider router={router} /></div>
        </div>
    ); 
});

export { Root }