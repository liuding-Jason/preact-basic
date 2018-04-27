import { h , render } from 'preact' ;
import './index.css';
// import App from './App';
import Worklist from "./pages/worklist/index" ;
import registerServiceWorker from './registerServiceWorker';

let root;
function init() {
  root = render(<Worklist />, document.getElementById('root') , root) ;
	registerServiceWorker();
}
init() ;
