import { observable, configure, reaction } from "mobx";
import { model } from "./AppModel";
import { connectToPersistence, setupAuthListener } from "./firestoreModel";
import { Utils } from "./utilities";

configure({ enforceActions: "never" });

export const reactiveModel = observable(model);

connectToPersistence(reactiveModel, reaction);
setupAuthListener(reactiveModel, reaction);

reaction(
  () => reactiveModel.userPosition,
  pos => {
    if (!pos) return;
    reactiveModel.allStores = Utils.sortStoresByDistance(reactiveModel.allStores, pos);
    reactiveModel.fetchClosestStores();
  }
);

window.myModel= reactiveModel;