import { observer } from "mobx-react-lite";
import { LoginView } from "../views/loginPageView";
export const Login = observer(function ArticlesRender(props) {
 return (
    <>
        <LoginView />
    </>
    );
});