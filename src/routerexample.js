import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const Home = i => (
    <div>
        <h2>Home</h2>
    </div>
)

const AboutTopic = i => (
    <div>
        <h3>im about second part:{JSON.stringify(i)}</h3>
    </div>
)

const About = i => (
    <div>
        <h2>About</h2>
        <div style={{
            border: '1px dotted blue'
        }}>

            <ul>
                <li>
                    <Link to={`${i.match.url}/introduce`}>introduce</Link>
                </li>
                <li>
                    <Link to={`${i.match.url}/family`}>family</Link>
                </li>
            </ul>
            <hr/>
            <Route
                exact
                path={i.match.url}
                render={i => (
                <h3>Please select a topic</h3>
            )}/>
            <Route path={`${i.match.url}/:topic`} component={AboutTopic}/>
        </div>
    </div>
)

const basicexample = i => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to='/'>HOME</Link>
                </li>
                <li>
                    <Link to='/about'>ABOUT</Link>
                </li>
            </ul>
            <hr/>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
        </div>
    </Router>
)

export default basicexample