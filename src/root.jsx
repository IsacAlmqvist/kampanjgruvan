import { ChooseLocalStoresPresenter } from "../presenters/chooseLocalStoresPresenter";
import { observer } from "mobx-react-lite";

const Root = observer (
    function Root(props) {
        return <ChooseLocalStoresPresenter model = {props.model}/>;
    }
);

export { Root }