import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './fade.less'

class ModalSwitch extends React.Component {

    constructor(props) {
        super(props)
        this.previousLocation = this.props.location

        console.log(`this.previousLocation============${JSON.stringify(this.previousLocation)}`)
    }

    componentWillUpdate(nextProps) {
        let {location} = this.props
        //set previousLocation if props.location isn't modal
        if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
            console.log(`componentWillUpdated location============${JSON.stringify(this.props.location)}`)
            console.log(`this.previousLocation============${JSON.stringify(this.previousLocation)}`)
        }
        
    }

    render() {
        let {location} = this.props
        console.log(`right now location ============${JSON.stringify(location)}`)
        //从gallery路由中链接过来的路由信息中会带有state:{modal:true}这个信息，通过这个来判断是否是模态框modal
        let isModal = !!(location.state && location.state.modal && this.previousLocation !== location)

        return(
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path='/' component={Home} />
                    <Route path='/gallery' component={Gallery} />
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

const Thumbnail = ({color}) => <div style={{width:50,height:50,background:color}} />
const Image = ({color}) => <div style={{width:400,height:400,background:color}} />

const Home = r => (
    <div>
        <Link to='/gallery'>visit the gallery</Link>
        <p><Link to='/img/2'>tomato</Link></p>
        <p><Link to='/img/4'>Crimson</Link></p>
    </div>
)

const Gallery = r => (
    <div>
        {images.map(i=>(
            //由于这里的路由链接信息中加入了一个state:{modal:true} 所以 在后面的路由渲染组件中就通过这个来判断是否是模态框modal
            <Link key={i.id} to={{pathname:`/img/${i.id}`,state:{modal:true}}}>
                <Thumbnail color={i.color}></Thumbnail>
                <p>{i.title}</p>
            </Link>
        ))}
    </div>
)

const ImageView = ({match}) =>{
    const image = images[parseInt(match.params.id,10)]
    if(!image){
        return <div>image not found</div>
    }
    return (
        <div>
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
        <Route component={ModalSwitch}/>
    </Router>
)

export default modalgallery