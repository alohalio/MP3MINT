import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import App from './frontend/components/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
render( <App />, rootElement);

serviceWorker.unregister();