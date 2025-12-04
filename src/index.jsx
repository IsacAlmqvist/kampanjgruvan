import "./index.css";
import {createRoot} from "react-dom/client";

import { Root } from "./root";
import { reactiveModel } from "./mobxReactiveModel";

createRoot(document.getElementById('root')).render(<Root model={reactiveModel} />);