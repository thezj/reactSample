import React from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'

const redirect = i => (
    <Router>
        <div>
            <AuthButton></AuthButton>
            <ul>
                <li>
                    <Link to='/public'>public page</Link>
                </li>
                <li>
                    <Link to='/protected'>protected page</Link>
                </li>
            </ul>
            <Route path='/public' component={Public}></Route>
            <Route path='/login' component={Login}></Route>
            <PrivateRoute path='/protected' component={Protected} />
        </div>
    </Router>
)


const Public = i => <h3>Public content</h3>
const Protected = i => <h3>Protected content</h3>



const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const AuthButton = withRouter(({history})=>{
    return (
        fakeAuth.isAuthenticated ?(
            <p>welcome! <button onClick={()=>{fakeAuth.signout(i=>history.push('/'))}}>Sign out</button></p>
        ):(
            <p>you are not logged in</p>
        )
    )
})

const PrivateRoute = ({component:Component,...rest}) => (
    <Route {...rest} render={props=>(
        fakeAuth.isAuthenticated ? (
            <Component {...props}></Component>
        ):(
            <Redirect to={{pathname:'/login',state:{from:props.location}}}></Redirect>
        )
        )}>
    </Route>
)

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToReferrer: false
        }
    }

    login(i){
        fakeAuth.authenticate(i => {
            this.setState({redirectToReferrer: true})
        })
    }

    render(){
        let {from} = this.props.location.state || {from:{pathname:'/'}}
        let {redirectToReferrer} = this.state

        if(redirectToReferrer){
            return <Redirect to={from}></Redirect>
        }
        return(
            <div>
                {JSON.stringify(this.props)}
                <p>you must log in to view the page at {from.pathname}</p>
                <button onClick={e=>this.login(e)}>log in</button>
            </div>
        )
    }
}

export default redirect