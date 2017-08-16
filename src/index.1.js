// 加载模块
const React = require('react')
const ReactDOM = require('react-dom')

import './index.less'
import errorFunction from './errorfun.js'
// errorFunction()

//初始化dom元素
document.body.innerHTML = '<div id="root"></div><div id="root2"></div>'

let formatName = user => {
    return `${user.firstName} ${user.lastName}`
}

let user0 = {
    firstName: 'Jim',
    lastName: 'Zeng'
}
let color0 = 'purple'

//function component
let WelcomeComponent = props =>{
    return <div>im.function component. {props.name}</div>
}

//class component
class WelcomeComponentClass extends React.Component{
    render(){
        return <div>im class component {this.props.name}</div>  
    }
}

let elementNameObject = React.createElement(
    'h1', {
        className: 'test',
        style: { borderColor: color0, borderWidth: '3px' }
    }, 
    `hello,${formatName(user0)},${2 + 3},${new Date().getTime()}`,
    React.createElement('div',{key:1},`class component in createElement:`,<WelcomeComponentClass key='1' name='LILI'></WelcomeComponentClass>)
)

class Toggle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isToggleOn:true
        }
        // this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        console.log(this)
        this.setState(prevState=>{
            return {
                isToggleOn:!prevState.isToggleOn
            }
        })
    }

    render(){
        return (
            //JS函数运行在不通的上下文环境中，会具有不同的this对象
            //这里的this.handleClick(e) 函数具有上下文环境为 当前组件。那么在函数里面的语句也继承了这个父级上下文环境的内容。
            <button onClick={(e) => { this.handleClick(e) }}>
                {this.state.isToggleOn?'ON':'OFF'}
            </button>
        )
    }
}

//conditional rendering
class Greeting extends React.Component{
    constructor(props){
        super(props)
    }
    
   
    render(){
        if(this.props.isLoggedIn){
            return(
                <div>welcome back!</div>  
            )
        }else{
            return(
                <div>please sign up.</div>  
            )
        }
    }
    
}

//conditional 
class LoginControl extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn:false
        }
    }

    handleLoginClick(e){
        console.log(e,this)
        this.setState({
            isLoggedIn:true
        })
    }

    handleLogoutClick(e){
         console.log(e,this)
        this.setState({
            isLoggedIn:false
        })
    }

    render(){
        
        return(
            <div>
                <Greeting isLoggedIn={this.state.isLoggedIn}></Greeting>
                {/* { !this.state.isLoggedIn ? <button onClick={e => this.handleLoginClick(e)}>Login</button> : <button onClick={e => this.handleLogoutClick(e)}>Logout</button>}  */}
                <button onClick={e => {!this.state.isLoggedIn ? this.handleLoginClick(e) : this.handleLogoutClick(e)}}>{!this.state.isLoggedIn ? 'Login' :'Logout'}</button>
            </div> 
        )
        
    }
}

//controlled component
class MyForm extends React.Component{

     constructor(props){
        super(props)
        this.state = {
            value:'initial',
            valueTextarea:`我是多行信息  
            斯蒂芬   
            sad as 
            `,
            flavors:'coconut'
        }
    }

    // handleSelect(event){
    //     this.setState({
    //         flavors:event.target.value
    //     })
    // }

    // handleChangeTextarea(event){
    //     this.setState({
    //         valueTextarea:event.target.value
    //     })
    // }

    handleChange(event){

        const valueName = event.target.name

        this.setState({
            [valueName]:event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
    }

    render(){
        return(
            <form onSubmit={e=>this.handleSubmit(e)}>
                <div>{this.state.flavors}</div>
                <select value={this.state.flavors} name='flavors' onChange={e=>this.handleChange(e)}>
                    <option value="grapefruit">grapefruit</option>
                    <option value="lime">lime</option>
                    <option value="coconut">coconut</option>
                    <option value="mango">mango</option>
                </select>
                <pre>{this.state.valueTextarea}</pre>
                <textarea value={this.state.valueTextarea} name='valueTextarea' onChange={e=>this.handleChange(e)} /><br />
                <div>{this.state.value}</div>
                <input type="text" value={this.state.value} name='value' onChange={e=>this.handleChange(e)}/><br />
                <input type="submit" value='Submit'/>
            </form>
        )
    }
}

class BoilingVerdict extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <p>{ this.props.celsius >=100 ? 'the water would boil.':'the water would not boil.' }</p>
        )
    }
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props)
    }
    handleChange(e){
        this.props.onChange({
            temperature:+e.target.value,
            scale:(this.props.scale === 'c'?'celsius':'fahrenheit')
        })
    }
    render(){
        let temperature = this.props.parenttemperature
        if(this.props.scale === 'f'){
            temperature = ((temperature*1.8 + 32))
        }
        return(
            <div>
                enter temperature in {this.props.scale === 'c'?'celsius':''}{this.props.scale === 'f'?'fahrenheit':''} 
                <input type='number' value={temperature} onChange={e=>this.handleChange(e)} />
            </div> 
        )
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            celsius:0
        }
    }
    handleChange(e){
        let temperature = e.temperature
        if(e.scale === 'fahrenheit'){
            temperature = (((temperature - 32)/1.8))
        }
        this.setState({
            celsius:temperature
        })
    }
    render(){
        return(
            <div>
                <TemperatureInput scale='c' parenttemperature={this.state.celsius} onChange={e=>this.handleChange(e)}></TemperatureInput>    
                <TemperatureInput scale='f' parenttemperature={this.state.celsius} onChange={e=>this.handleChange(e)}></TemperatureInput>    
                <BoilingVerdict celsius={this.state.celsius}></BoilingVerdict>
            </div>
        )
    }
}

//children prop
class FancyBorder extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div style={{borderColor:this.props.color,borderWidth:1,borderStyle:'dotted',margin:10,display:'flex'}}>
                <div style={{border:'1px dotted green',margin:10}}>
                    {this.props.left}
                </div>
                <div>
                    {this.props.center}
                </div>
                <div style={{border:'1px solid red',margin:10}}>
                    {this.props.right}
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

let WelcomeStr = props=>{
    return(
        <em>welcome</em>
    )
}

let ThankStr = props=>{
    return(
        <em>thank you for visiting our spacecraft</em>
    )
}

// let Clock = props =>{
class Clock extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            date:new Date(),
            counter:8
        }
    }

    //own method
    tick(){  
        //wrong
        // this.state.date = new Date()
        //right
        this.setState({
            date:new Date()
        })
        // this.setState({
        //     counter:this.state.counter + this.props.increment
        // })
        this.setState((prevState,props)=>{
            // console.log(prevState,props)
            return {
                counter:prevState.counter+props.increment
            }   
        })
    }

    //lifecycle methods
    componentDidMount(){
        this.timerID = setInterval(i=>this.tick(),1000)
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    render(){

        //rendering multiple components
        let numbers = [1,2,3,3,5]
        let listItems = numbers.map(function(n,index){return <li key={index}>{this.content+n}</li>},{content:'项目'})

        return (
        //这里用于放表达式的还是一对花括号，不过中间放的是对象值的时候 就看起来是两个了，样式的值要一个对象。。。
        <h1 style={{ borderColor: color0, borderWidth: '3px' }}>
            <FancyBorder color='blue'
                left={
                    <WelcomeStr></WelcomeStr>
                }    
                right={
                    <ThankStr></ThankStr>
                } 
                center={
                    <div>im at center</div>
                } 
            >
            <i>im the normal children</i>             
            </FancyBorder>
            <Calculator></Calculator>
            <MyForm></MyForm>
            hello,{formatName(user0)},{2 + 2},{this.state.date.toLocaleTimeString()}
            <div>
                {this.state.counter}
            </div>
            <div>
                function Component in jsx:<WelcomeComponent name='LILIAN' />
            </div>
            <div>
                <Toggle></Toggle>
            </div>
            <Greeting isLoggedIn={new Date().getTime()%2 === 1 ? true : false}></Greeting>
            <LoginControl></LoginControl>
            <ol>{listItems}</ol>
            <ul>
                {
                    numbers.map((n,index,array)=> <li key={index}>{n}of[{array}]</li>)
                }
            </ul>
        </h1>
        )
    }
}

//react渲染根元素
ReactDOM.render(
    <Clock increment={5}/>,
    document.querySelector('#root')
)
console.log('rendered')


// setInterval(tick,1000)
ReactDOM.render(
    elementNameObject,
    document.querySelector('#root2')
)