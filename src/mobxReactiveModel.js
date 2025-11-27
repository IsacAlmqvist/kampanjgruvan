import { observable, configure, reaction } from "mobx";
import { model } from "./AppModel";
import { connectToPersistence } from "./firestoreModel";

configure({ enforceActions: "never" });

export const reactiveModel = observable(model);

connectToPersistence(reactiveModel, reaction);