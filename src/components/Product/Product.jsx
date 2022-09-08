import React, { Component } from "react";
import { connect } from "react-redux";

import "./_Product.scss";

class Product extends Component {
//   constructor(props) {
//     super(props)
//   }

  
  render() {
 const image = this.props.product.gallery[0]
 console.log(this.props.currency)
 console.log(this.props.product.prices.filter(price => price.currency.symbol === this.props.currency))
    return (
      <div className="product">
        <img src={image}/>
       <h2>{this.props.product.name}</h2>
       <p>{}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(Product);
