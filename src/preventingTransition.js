import React from 'react'
import {BrowserRouter as Router, Route, Link, Prompt} from 'react-router-dom'

const preventroute = i => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to='/'>Form</Link>
                </li>
                <li>
                    <Link to='/one'>One</Link>
                </li>
                <li>
                    <Link to='/two'>Two</Link>
                </li>
            </ul>
            <hr/>
            <Route path='/' exact component={Form}></Route>
            <Route path='/one' render={i => <h3>one</h3>}></Route>
            <Route path='/two' render={i => <h3>two</h3>}></Route>
        </div>
    </Router>
)

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isBlocking:false
        }
    }

    submit(e){
        e.preventDefault()
        e.target.reset()
        this.setState({
            isBlocking:false
        })
    }

    inputChange(e){
        console.log(e.target.value.length)
        this.setState({
            isBlocking:e.target.value.length > 0
        })
    }

    render(){
        return (
            <form onSubmit={e=>this.submit(e)}>
                <Prompt when={this.state.isBlocking} message={location => `are you sure you want to go to${location.pathname}`}></Prompt>
                <p>Blocking?{this.state.isBlocking?'yes, click a link or the back button':'nope'}</p>
                <p><input onChange={e=>this.inputChange(e)} /></p>
                <p><input type='submit' value='submit to stop blocking'/></p>
            </form>
        )
    }
}
export default preventroute