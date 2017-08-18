const React = require('react')
const ReactDom = require('react-dom')
const PropTypes = require('prop-types')

document.body.innerHTML = '<div id="root"></div>'

const componentsObject = {
    DatePicker(props){
        return (
            <div>imagine a {props.color} datepicker here</div> 
        )
    }
}

componentsObject.DatePicker.propTypes = {
    color:PropTypes.string
}

componentsObject.DatePicker.defaultProps = {
    color:'yellow'
}

let helloworld = React.createElement('h1', {
    style: {
        border: '1px dotted red'
    }
}, ['hello world',<componentsObject.DatePicker key='ip1'/>,React.createElement(componentsObject.DatePicker,{color:10000,key:'ip2'},null)])
ReactDom.render(helloworld, document.querySelector('#root'))