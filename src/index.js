const React = require('react')
const ReactDom = require('react-dom')

document.body.innerHTML = '<div id="root"></div>'

const componentsObject = {
    DatePicker(props){
        return (
            <div>imagine a {props.color} datepicker here</div> 
        )
    }
}

let helloworld = React.createElement('h1', {
    style: {
        border: '1px dotted red'
    }
}, ['hello world',<componentsObject.DatePicker key='ip1' color='red'/>,React.createElement(componentsObject.DatePicker,{color:'blue',key:'ip2'},null)])
ReactDom.render(helloworld, document.querySelector('#root'))