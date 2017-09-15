import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'



const Sandwiche = r => <h2>sandwiche</h2>
const Tacos = ({routes}) => (
    <div>
        <h2>tacos</h2>
        <ul>
            <p><Link to='/tacos/bus'>bus</Link></p>
            <p><Link to='/tacos/cart'>cart</Link></p>
        </ul>
        {routes.map((route,i)=> <RouteWithSubRoutes key={i} {...route} />)}
    </div>
)
const Bus = r=> <h3>bus</h3>
const Cart = r=> <h3>cart</h3>

const routes = [
    {
        path:'/sandwiches',
        component:Sandwiche
    },
    {
        path:'/tacos',
        component:Tacos,
        routes:[
            {
                path:'/tacos/bus',
                component:Bus
            },
            {
                path:'/tacos/cart',
                component:Cart
            }
        ]
    }
]

const RouteWithSubRoutes = route => (
    <Route path={route.path} render={r=>(
        <div>
            {console.log(r,route)}
            {/* this {...r} can removed */}
            <route.component {...r} routes={route.routes} />    
        </div>
    )}></Route>
)

const routeconfig = i => (
    <Router>
          <div>
            <ul>
                <p><Link to='/sandwiches'>sandwiches</Link></p>
                <p><Link to='/tacos'>tacos</Link></p>
            </ul>
            {routes.map((route,i)=> <RouteWithSubRoutes key={i} {...route} />)}
            {/* 
            
            <RouteWithSubRoutes key={0}  path='/sandwiches' component={Sandwiche} />
            <RouteWithSubRoutes key={1}  path='/tacos' component={Tacos} />
            
             */}
        </div>
    </Router>
)

export default routeconfig