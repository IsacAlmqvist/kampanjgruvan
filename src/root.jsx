import { observer } from "mobx-react-lite";
import { HeaderPresenter } from "./presenters/HeaderPresenter";
import { ArticlesPresenter } from "./presenters/articlesPresenter";

const Root = observer (
    function Root(props) {
        return (
        <div className="root">
            <HeaderPresenter model = {props.model}/>
            <ArticlesPresenter model = {props.model}/>
        </div>
        ); 
    }
);

export { Root }