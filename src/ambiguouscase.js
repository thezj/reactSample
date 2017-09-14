import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './fade.less'

const ambiguous = i => (
    <Router>
        <div>

            <p>
                <Link to='/about'>about</Link>
            </p>
            <p>
                <Link to='/company'>company</Link>
            </p>
            <p>
                <Link to='/kim'>kim</Link>
            </p>
            <p>
                <Link to='/chris'>chris</Link>
            </p>
            <Switch>
                <Route path='/about' render={r=><h3>about</h3>}></Route>
                <Route path='/company' render={r=><h3>company</h3>}></Route>
                <Route path='/:user' render={r=><h3>hello, {r.match.params.user}</h3>}></Route>
            </Switch>
        </div>

    </Router>
)

export default ambiguous