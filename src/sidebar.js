import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const routes = [
    {
        path:'/',
        exact:true,
        render:i=><h3>home</h3>
    },
    {
        path:'/bubblegum',
        exact:true,
        render:i=><h3>bubblegum</h3>
    },
    {
        path:'/shoelace',
        exact:true,
        render:i=><h3>shoelace</h3>
    }
]

const sidebar = i => (
    <Router>
        <div style={{display:'flex'}}>
            <div style={{padding:'10px',width:'40%',background:'#f0f0f0'}}>
                {
                    routes.map(r=>(
                        <p key={r.path}><Link to={r.path}>{r.path}</Link></p>
                    ))
                }
                <p><Link to='/'>Home</Link></p>
                <p><Link to='/bubblegum'>Bubblegum</Link></p>
                <p><Link to='/shoelace'>Shoelace</Link></p>
            </div>
            <div style={{flex:1,padding:'10px'}}>
                <Route path='/' exact render={i=><h3>home</h3>}></Route>
                <Route path='/bubblegum' exact render={i=><h3>bubblegum</h3>}></Route>
                <Route path='/shoelace' exact render={i=><h3>shoelace</h3>}></Route>
                {
                    routes.map(r=>(
                        <Route {...r} key={r.path}></Route>
                    ))
                }
            </div>
        </div>
    </Router>
)
export default sidebar