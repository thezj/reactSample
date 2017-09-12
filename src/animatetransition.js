import React from 'react'
import {TransitionGroup,CSSTransition} from 'react-transition-group'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import './fade.less'

const animationexample = i => (
    <Router>
        <Route render={({location})=>(
            <div>
                <p><Link to='/10/90/50'>red</Link></p>
                <p><Link to='/120/100/40'>green</Link></p>
                <p><Link to='/200/100/40'>blue</Link></p>
                <p><Link to='/310/100/50'>pink</Link></p>
                {JSON.stringify(location)}
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames='fade' timeout={{ enter: 500, exit: 0 }}>
                        <Route path='/:h/:s/:l' render={r=><div style={{background:`hsl(${r.match.params.h},${r.match.params.s}%,${r.match.params.l}%)`}}>{`hsl(${r.match.params.h},${r.match.params.s}%,${r.match.params.l}%)`}</div>}></Route>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            )}>
        </Route>
    </Router>
)

export default animationexample