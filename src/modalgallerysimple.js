import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './fade.less'

class ModalSwitch extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let {location} = this.props
        //从gallery路由中链接过来的路由信息中会带有state:{modal:true}这个信息，通过这个来判断是否是模态框modal
        let isModal = !!location.inModal

        return(
            <div>
                <Switch location={isModal ? {pathname:'/nomatch'} : location}>
                    <Route exact path='/' component={Home} />
                    <Route path='/img/:id' component={ImageView} />
                </Switch>
                {isModal ? <Route path='/img/:id' component={Modal} /> : null}
            </div>
        )
    }
}

const images= [
    {id:0,title:'img0',color:'DarkOrchid'},
    {id:1,title:'img1',color:'LimeGreen'},
    {id:2,title:'img2',color:'Tomato'},
    {id:3,title:'img3',color:'#789'},
    {id:4,title:'img4',color:'Crimson'},
]

const Image = ({color}) => <div style={{width:400,height:400,background:color}} />

const Home = r => (
    <div>
        <p><Link to={{pathname:'/img/4',inModal:true}}>tomato in modal</Link></p>
        <p><Link to='/img/4'>Crimson</Link></p>
    </div>
)


const ImageView = ({match,history}) =>{
    const back = e =>{
        e.stopPropagation()
        history.goBack()
    }
    const image = images[parseInt(match.params.id,10)]
    if(!image){
        return <div>image not found</div>
    }
    return (
        <div onClick={back}>
            <h1>{image.title}</h1>
            <Image color={image.color}></Image>
        </div>
    )
}

const Modal = ({match,history})=>{
    const image = images[parseInt(match.params.id, 10)]
    if (!image) {
      return null
    }

    const back = e =>{
        e.stopPropagation()
        history.goBack()
        console.log(history)
    }

    return (
        <div onClick={back} className='modalback'>
            <div className='modal'>
                <Image color={image.color}></Image>
            </div>
        </div>
    )
}

const modalgallery = i => (
    <Router>
        {/* 这里通过一个空路由匹配来封装，并在封装这一层中 获取到inModal 的值 后分配后续的路由匹配器，达到一个路由链接两个组件匹配 */}
        <Route component={ModalSwitch}/>
    </Router>
)

export default modalgallery