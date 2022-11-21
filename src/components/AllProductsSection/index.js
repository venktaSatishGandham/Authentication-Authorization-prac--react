import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProductList()
  }

  getProductList = async () => {
    const url = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProductsList = data.products.map(each => ({
        id: each.id,
        price: each.price,
        rating: each.rating,
        brand: each.brand,
        title: each.title,
        imageUrl: each.image_url,
      }))
      this.setState({
        productsList: updatedProductsList,
        isLoading: false,
      })
    }

    console.log(response)
  }

  renderProductsList = () => {
    const {productsList, isLoading} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        {isLoading ? (
          <div className="products-list-loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
