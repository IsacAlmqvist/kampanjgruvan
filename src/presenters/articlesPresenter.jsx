import { observer } from "mobx-react-lite";
import { ArticlesView } from "../views/articlesView";
export const ArticlesPresenter = observer(function SidebarRender(props) {
 return (
    <>
        <ArticlesView 
            data={props.model.storesData}
            selected={props.model.selectedStores}
        />
    </>
    );

});