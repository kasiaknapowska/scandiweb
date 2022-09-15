import React, { Component } from "react";
import "./_TextType.scss";

class TextType extends Component {
  // constructor(props) {
  //   super(props)
  // }

  
  render() {

    return (
      <div className="text_type">
        {this.props.items.map(item => <div className="text_type_item">{item.value}</div>
        )}
      </div>
    );
  }
}

export default TextType;
