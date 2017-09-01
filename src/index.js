const React = require('react')
const ReactDom = require('react-dom')
import Routerapp  from './routerexample'


document.body.innerHTML = '<div id="root"></div>'
ReactDom.render(<Routerapp></Routerapp>, document.querySelector('#root'))