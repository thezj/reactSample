const React = require('react')
const ReactDom = require('react-dom')

document.body.innerHTML = '<div id="root"></div>'

let mockData = [
    {
        category: "Sporting Goods",
        price: "$49.99",
        stocked: true,
        name: "Football"
    }, {
        category: "Sporting Goods",
        price: "$9.99",
        stocked: true,
        name: "Baseball"
    }, {
        category: "Sporting Goods",
        price: "$29.99",
        stocked: false,
        name: "Basketball"
    }, {
        category: "Electronics",
        price: "$99.99",
        stocked: true,
        name: "iPod Touch"
    }, {
        category: "Electronics",
        price: "$399.99",
        stocked: false,
        name: "iPhone 5"
    }, {
        category: "Electronics",
        price: "$199.99",
        stocked: true,
        name: "Nexus 7"
    }
]

class SearchProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: props.products,
            inStock: false,
            keyWord: ''
        }
    }

    search(e) {
        this.setState({keyWord: e.target.value},this.renderList)
    }

    filter(e) {
        this.setState({inStock: e.target.checked},this.renderList)
    }

    renderList() {
        console.log(this.state.inStock)
        let newProducts = this
            .props
            .products
            .filter(i => {
                let regexp = new RegExp(this.state.keyWord, 'i')
                if (i.name.match(regexp)) {
                    if (this.state.inStock) {
                        if (i.stocked) {
                            return true
                        }
                    } else {
                        return true
                    }
                }
            })
        this.setState({products: newProducts})
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" placeholder='Search...' onChange={e => this.search(e)}/>
                </div>
                <div>
                    <input id='checkbox1' type='checkbox' onChange={e => this.filter(e)}/>
                    <label htmlFor='checkbox1'>only show product in stock</label>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                        {this
                            .state
                            .products
                            .map(i => {
                                return (
                                    <tr key={i.name}>
                                        <td>{i.name}</td>
                                        <td
                                            style={{
                                            color: i.stocked
                                                ? 'green'
                                                : 'red'
                                        }}>{i.price}</td>
                                    </tr>
                                )
                            })
}
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactDom.render(
    <SearchProduct products={mockData}></SearchProduct>, document.querySelector('#root'))