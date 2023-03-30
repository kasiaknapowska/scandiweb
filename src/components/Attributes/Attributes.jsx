import "./_Attributes.scss";

import React, { PureComponent } from "react";
import classNames from "classnames";

class Attributes extends PureComponent {

  render() {
    const attribute = this.props.attribute;
    return (
        <div className={attribute.type}>
          {attribute.items.map((item) => (
            <div
              style={
                attribute.type === "swatch"
                  ? { backgroundColor: `${item.value}` }
                  : null
              }
              key={item.id}
              onClick={this.props.isClickable ? () => this.props.setAttributes(attribute.id, item.value) : null}
              className={classNames({is_active: this.props.attributesChosen[attribute.id.toLowerCase().replaceAll(" ", "-")] === item.value})}
            >
              {attribute.type === "text" ? item.value : null}
            </div>
          ))}
        </div>
    );
  }
}

export default Attributes;
