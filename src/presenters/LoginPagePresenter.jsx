import { observer } from "mobx-react-lite";
import { LoginView } from "../views/loginPageView";

export const Login = observer(function LoginRender(props) {

    return (
        <>
            <LoginView />
        </>
    );
});