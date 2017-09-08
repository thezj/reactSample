import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const peeps = [
    {
        id: 0,
        name: 'michelle',
        friends: [0,1, 2, 3]
    }, {
        id: 1,
        name: 'sean',
        friends: [0, 3]
    }, {
        id: 2,
        name: 'kim',
        friends: [0, 1, 3]
    }, {
        id: 3,
        name: 'david',
        friends: [1, 2]
    }
]

const find = id => peeps.find(p => p.id == id) //return people with id


const recursive = i => (
    <Router>
        <Person match={{params:{id:0},url:''}}/>
    </Router>
)

const Person = ({match}) =>{
    const person = find(match.params.id)

    return (
        <div>
            {JSON.stringify(match)}
            <h3>{person.name}'s, friends:</h3>
            {person.friends.map(id=>(
                <p key={id}>
                    <Link to={`${match.url}/${id}`}>{find(id).name} to {`${match.url}/${id}`}</Link>
                </p>
            ))}
            <div style={{border:'1px dotted red',padding:'10px'}}>
                <Route path={`${match.url}/:id`} component={Person}></Route>
            </div>
        </div>
    )
}
export default recursive