import { observer } from "mobx-react-lite";
import { ArticlesView } from "../views/articlesView";
export const Articles = observer(function SidebarRender(props) {
 return (
    <>
        <ArticlesView 
            data={props.model.storesData}
            selected={props.model.selectedStores}
        />
    </>
    );

});