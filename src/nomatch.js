import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

const nomatch = i => (
    <Router>
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/old-match'>old match to be redirected</Link></li>
                <li><Link to='/will-match'>will match</Link></li>
                <li><Link to='/will-no-match'>will not match</Link></li>
                <li><Link to='/also/will/not/match'>also will not match</Link></li>
            </ul>
            <Switch>
                <Route path='/' exact render={()=> <h3>a switch renders the first child Route that matches,a Route with no path always matches</h3>}></Route>
                {/* <Route path='/:param' render={r=><h3>我在下一行代码前面，所以匹配{r.location.pathname}会先匹配到我<br /></h3>}></Route> */}
                <Redirect from='/old-match' to='/will-match'></Redirect>
                <Route path='/will-match' render={()=> <h3>matched will match</h3>}></Route>
                {/* 最后一个route会在他的上面几行route都没有匹配到path的时候，显示出来。with no path always matches */}
                <Route render={({location})=> <h3>no match for {location.pathname}</h3>}></Route>
            </Switch>
        </div>
    </Router>
)
export default nomatch