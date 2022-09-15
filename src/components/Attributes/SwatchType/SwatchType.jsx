import React, { Component } from "react";
import "./_SwatchType.scss";

class SwatchType extends Component {
  // constructor(props) {
  //   super(props)
  // }

  
  render() {
  
    return (
      <div className="swatch_type">
        {this.props.items.map(item => <div className="swatch_type_item" style={{backgroundColor: `${item.value}`}}></div>
        )}
      </div>
    );
  }
}

export default SwatchType;
