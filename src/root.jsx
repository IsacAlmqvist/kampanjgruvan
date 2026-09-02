import { observer } from "mobx-react-lite";
import { Filter } from "./presenters/FilterPresenter";
import { Articles } from "./presenters/StoreArticlesPresenter";
import { Header } from "./presenters/HeaderPresenter";
import { Login } from "./presenters/LoginPresenter";
import { Cart } from "./presenters/CartPresenter";
import { createHashRouter, RouterProvider, redirect } from "react-router-dom";
import { useEffect } from "react"; 
import { LikedStores } from "./presenters/LikedStoresPresenter";

function createRouterCB(model) {
  return createHashRouter([
    {
      path: "/",
      loader: function rootLoaderACB() {
        if (!model.hasCheckedAuth && !model.user && model.user !== undefined) {
          model.hasCheckedAuth = true;
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
          <LikedStores model={model}/>
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
      loader: function loginLoaderACB() {
        if (model.user) {
          return redirect("/articles");
        }
        return null;
      }
    }
  ]);
}

export const Root = observer(function Root(props) {
  const { model } = props;
  
  function handleMountACB() {
    model.handleGetLocation();
  }
  
  function handleUserChangeCB() {
  }
  
  useEffect(handleMountACB, []);
  useEffect(handleUserChangeCB, [model.user]);
  
  const router = createRouterCB(model);
  
  return (
    <div className="bg-theme-50">
      {model.ready 
        ?
      <RouterProvider router={router} />
        :
      (  
        <div className="flex items-center justify-center h-[100%]">
            <div className="flex gap-3">
                <span className="w-5 h-5 bg-theme-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-5 h-5 bg-theme-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-5 h-5 bg-theme-300 rounded-full animate-bounce" />
            </div>
        </div>
      )}
    </div>
  );
});