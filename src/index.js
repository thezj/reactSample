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

class CustomTextInput extends React.Component{
    focus(){
        this.textInput.focus()
    }
    render(){
        return(
            <div>
                <input type='text' ref={ input => this.textInput = input } />
                <input type='text' ref={this.props.inputProps} />
                <input type='button' value='Focus the text input' onClick={e=>this.focus(e)} />
            </div>
        )
    }
}

class AutoFocusTextInput extends React.Component{
    componentDidMount(){
        this.textInput.focus()
        this.blueInput.style.border = '1px dotted green'
    }
    render(){
        return(
            <CustomTextInput ref={e => this.textInput = e} inputProps={e=>this.blueInput = e} />
        )
    }
}

let helloworld = React.createElement('h1', {
    style: {
        border: '1px dotted red'
    }
}, [<AutoFocusTextInput key='ip3'></AutoFocusTextInput>,<CustomTextInput key='ip0'></CustomTextInput>,'hello world',<componentsObject.DatePicker key='ip1'/>,React.createElement(componentsObject.DatePicker,{color:10000,key:'ip2'},null)])
ReactDom.render(helloworld, document.querySelector('#root'))