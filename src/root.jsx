import { observer } from "mobx-react-lite";
import { Filter } from "./presenters/FilterPresenter";
import { Articles } from "./presenters/articlesPresenter";
import { Header } from "./presenters/HeaderPresenter";
import { Login } from "./presenters/loginPagePresenter";
import { Cart } from "./presenters/cartPresenter";
import { createHashRouter, RouterProvider, redirect } from "react-router-dom";
import { useEffect } from "react"; 

const createRouter = (model) => createHashRouter([
  {
    path: "/",
    loader: () => {
        // Check if user is explicitly false/null, not just falsy
        if (!model.user && model.user !== undefined) {
            return redirect("/login");
        }
        return redirect("/articles");
    }
  },
  {
    path: "/articles",
    element: (
      <>
        <Header model={model} />
        <Filter model={model} />
        <Articles model={model} />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Header model={model} />
        <Cart model={model} />
      </>
    ),

  },
  {
    path: "/login",
    element: <Login model={model} />,
    loader: () => {
      if (model.user) {
        return redirect("/articles");
      }
      return null;
    }
  }
]);

const Root = observer(function Root(props) {
  const { model } = props;

  useEffect(() => {
    console.log("User state changed:", model.user);
  }, [model.user]);

  const router = createRouter(model);

  return (
    <div className="root">
      <RouterProvider router={router} />
    </div>
  );
});

export { Root };