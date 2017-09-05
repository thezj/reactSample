import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const CustomLinkExample = i => (
    <Router>
        <div>
            <MenuLink to='/' activeonlywhenexact={true} label='home'/>
            <MenuLink to='/about'  label='about'/>
            <hr/>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/about' component={About}></Route>
        </div>
    </Router>
)

const MenuLink = ({label,to,activeonlywhenexact})=>(
    //children 可以根据match路由的情况（匹配或不匹配）来决定渲染出什么组件，需要自己写依据 match 的判断逻辑
    <Route path={to} exact={activeonlywhenexact} children={({match})=>(
        <div>{match ?'>':''}<Link to={to}>{label}</Link></div>    
    )}></Route>
)

const Home = r => <h2>home content</h2>
const About = r => <h2>about content</h2>

export default CustomLinkExample