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


document.body.innerHTML = '<div id="root"></div>'
ReactDom.render(<Sidebar/>, document.querySelector('#root'))