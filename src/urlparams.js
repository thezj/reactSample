import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const paramsExample = i =>(
    <Router>
        <div>
            <h2>account</h2>
            <ul>
                <li>
                    <Link to='/yahoo'>Yahoo</Link>    
                </li>
                <li>
                    <Link to='/taobao'>Taobao</Link>    
                </li>
            </ul>
            <Route path='/:siteId' component={Site}/>   
        </div>  
    </Router>  
)

const Site = router =>(
    <div>
        <h3>this is site :{router.match.params.siteId}</h3>
    </div>
)

export default paramsExample