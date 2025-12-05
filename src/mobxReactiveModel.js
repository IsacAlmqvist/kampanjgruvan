import { observable, configure, reaction } from "mobx";
import { model } from "./AppModel";
import { connectToPersistence, setupAuthListener } from "./firestoreModel";

configure({ enforceActions: "never" });

export const reactiveModel = observable(model);

connectToPersistence(reactiveModel, reaction);
setupAuthListener(reactiveModel, reaction)

window.myModel= reactiveModel;