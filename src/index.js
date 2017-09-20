const React = require('react')
const ReactDom = require('react-dom')
import Routerapp  from './routerexample'
import UrlParams  from './urlparams'
import Redirects  from './redirect'
import CustomLink  from './customlink'
import PreventTransition  from './preventingTransition'
import NoMatch  from './NoMatch'
import Recursive  from './recursivepath'
import Sidebar  from './sidebar'
import Animatetransition  from './animatetransition'
import Ambiguous  from './ambiguouscase'
import Routeconfig  from './routeconfig'
import Modalgallery  from './modalgallery'
import Modalgallerymin  from './modalgallerysimple'
import Staticrouter  from './staticrouter'


document.body.innerHTML = '<div id="root"></div>'
ReactDom.render(<Staticrouter/>, document.querySelector('#root'))