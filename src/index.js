const React = require('react')
const ReactDom = require('react-dom')
import Routerapp  from './routerexample'
import UrlParams  from './urlparams'
import Redirects  from './redirect'
import CustomLink  from './customlink'


document.body.innerHTML = '<div id="root"></div>'
ReactDom.render(<CustomLink/>, document.querySelector('#root'))