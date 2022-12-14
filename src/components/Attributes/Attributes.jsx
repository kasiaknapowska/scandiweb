import "./_Attributes.scss";

import React, { Component } from "react";
import classNames from "classnames";

class Attributes extends Component {
  constructor(props) {
    super(props)
  }

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
              onClick={this.props.onClick ? () => this.props.setAttributes(this.props.attribute.id, item.value) : null}
              className={classNames({is_active: this.props.attributesChosen[this.props.attribute.id.toLowerCase().replaceAll(" ", "-")] === item.value})}
            >
              {this.props.attribute.type === "text" ? item.value : null}
            </div>
          ))}
        </div>
    );
  }
}

export default Attributes;
