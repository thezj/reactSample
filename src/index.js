const React = require('react')
const ReactDom = require('react-dom')
import Routerapp  from './routerexample'
import UrlParams  from './urlparams'
import Redirects  from './redirect'
import CustomLink  from './customlink'
import PreventTransition  from './preventingTransition'


document.body.innerHTML = '<div id="root"></div>'
ReactDom.render(<PreventTransition/>, document.querySelector('#root'))