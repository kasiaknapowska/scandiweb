import React, { Component } from "react";
import "./_Attributes.scss";

class Attributes extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
        <div className={this.props.attribute.type}>
          {this.props.attribute.items.map((item) => (
            <div
              style={
                this.props.attribute.type === "swatch"
                  ? { backgroundColor: `${item.value}` }
                  : null
              }
              key={item.id}
              onClick={() => this.props.setAttribute(this.props.attribute.name, item.value)}
            >
              {this.props.attribute.type === "text" ? item.value : null}
            </div>
          ))}
        </div>
    );
  }
}

export default Attributes;
