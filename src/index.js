import { h , render } from 'preact' ;
import './index.css';

import Index from "./pages/index/index" ;
import registerServiceWorker from './registerServiceWorker';

let root;
function init() {
  root = render(<Index />, document.getElementById('root') , root) ;
	registerServiceWorker();
}
init() ;
