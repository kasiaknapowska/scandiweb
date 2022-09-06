import React, { Component } from "react";
import {connect} from "react-redux";

class CategoryPage extends Component {
  // constructor(props) {
  //   super(props)
  // }

  
  render() {
    return (
      <div className="container category_page">
        <h1>{this.props.category}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
});


export default connect(mapStateToProps)(CategoryPage);
