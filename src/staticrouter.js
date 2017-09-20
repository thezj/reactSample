import * as React from 'react'
import { StaticRouter, Route } from 'react-router-dom'
import _ from 'lodash'

class Routestatus extends React.Component {
    render(){
       
        return (
            <Route render={({staticContext})=>{
                console.log('--------',_.cloneDeep(staticContext))
                if(staticContext){
                    staticContext.statusCode = this.props.statusCode
                }    
                console.log('--------',_.cloneDeep(staticContext))
                return <div>{this.props.children}</div>
            }}/>
        )
    }
}

class PrintContext extends React.Component {
    render(){
        console.log('--------',_.cloneDeep(this.props.staticContext))
        return (
            <p>static context :{JSON.stringify(this.props.staticContext)}</p>
        )
    }
}

class StaticRouterExample extends React.Component {
    constructor(props){
        super(props)
        this.staticContext = {}
    }
    render(){
        return(
            <StaticRouter location='/foo' context={this.staticContext}>
                <div>
                    <Routestatus statusCode={1000}>
                        <PrintContext staticContext={this.staticContext}></PrintContext>
                    </Routestatus>
                </div>
            </StaticRouter>
        )
    }
}

export default StaticRouterExample