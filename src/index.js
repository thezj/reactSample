const React = require('react')
const ReactDom = require('react-dom')
const ReactClass = require('create-react-class')
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

class NameForm extends React.Component{
    handleSubmit(e){
        console.info(`a name was submitted:${this.input.value}`)
        e.preventDefault()
    }

    render(){
        return(
            <form onSubmit={e=>this.handleSubmit(e)}>
                <lable>
                    {/* use defaultValue to specify the initial value (or defaultChecked for checkbox or radio) */}
                    name:<input defaultValue='Jim' type='text' ref={e=>this.input = e} /> 
                </lable>
                <input type='submit' value='Submit U Name' />
            </form>
        )
    }
}

let setIntervalMinxin = {
    //lifecycle methods
    componentWillMount() {
        this.intervals = [];
    },
    iSetInterval(...params){
        this.intervals.push(setInterval(...params))
        console.log(this.intervals)
    },
    componentWillUnmount() {
        this.intervals.forEach(clearInterval)
    }
}

let Greeting = ReactClass({
    
    mixins:[setIntervalMinxin],

    //lifecycle methods
    componentDidMount(){
        this.iSetInterval(this.tick,1000)
    },

    //set the initial state
    getInitialState(){
        return {
            count:188,
            seconds:0
        }
    },
    //declare default props
    getDefaultProps(){
        return {
            name:'Mary'
        }
    },

    //own method
    handleClick(){
        alert(`hello im ${this.props.name}`)
    },
    tick(){
        this.setState({
            seconds:this.state.seconds + 1
        })
    },

    render(){
        return(
            <div>
                 hello , {this.props.name},{this.intervals}im hight {this.state.count} <input value='say Hello' type='button' onClick={this.handleClick}/>
                <p>this component has been running for {this.state.seconds}</p>
            </div>
        )
    }
})

let PlainJSHello = ReactClass({
    getDefaultProps(){
        return{
            toWhat:'im the plain js template'
        }
    },
    render(){
        return React.createElement('div',null,`Hello ${this.props.toWhat}`)
    }
})

//context example
class Button extends React.Component{
    render(){
        return(
            <button style={{background:this.context.color}}>{this.props.children}</button>
        )
    }
}
Button.contextTypes = {
    color: PropTypes.string
}

class Message extends React.Component{
    render(){
        return(
            <div>
                {this.props.text} <Button>{this.context.color}</Button>
            </div>
        )
    }
}
Message.contextTypes = {
    color: PropTypes.string
}


class MessageList extends React.Component{
    getChildContext(){
        return {color:'purple'}
    }

    render(){
        let children = this.props.message.map((m,i)=>{
            return <Message text={m} key={i}></Message>
        })
        return(
            <div>{children}</div>
        )
    }
}
MessageList.childContextTypes = {
    color:PropTypes.string
}

let helloworld = React.createElement('h1', {
    style: {
        border: '1px dotted red'
    }
}, [<MessageList message={[123,123,12344]} key='ip8'></MessageList>,<PlainJSHello toWhat='im with out JSX' key='ip7'></PlainJSHello>,<Greeting key='ip6'></Greeting>,<Greeting key='ip5' name='jim'></Greeting>,<NameForm key='ip4'></NameForm>,<AutoFocusTextInput key='ip3'></AutoFocusTextInput>,<CustomTextInput key='ip0'></CustomTextInput>,'hello world',<componentsObject.DatePicker key='ip1'/>,React.createElement(componentsObject.DatePicker,{color:10000,key:'ip2'},null)])
ReactDom.render(helloworld, document.querySelector('#root'))