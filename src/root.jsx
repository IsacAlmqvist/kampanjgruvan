import { observer } from "mobx-react-lite";
import { SidebarPresenter } from "./presenters/sidebarPresenter";
import { ArticlesPresenter } from "./presenters/articlesPresenter";

const Root = observer (
    function Root(props) {
        return (
        <>
            <ArticlesPresenter model = {props.model}/>
            <SidebarPresenter model = {props.model}/>
        </>
        ); 
    }
);

export { Root }