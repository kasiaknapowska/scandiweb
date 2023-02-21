import "./_SliderArrow.scss";

import React, { PureComponent  } from "react";
import classNames from "classnames";

class SliderArrow extends PureComponent  {
  
  render() {
    return (
      <div className="slider_arrow" onClick={this.props.onClick}>
        <div className={classNames({next: this.props.direction === "next", previous: this.props.direction === "previous"})}></div>
      </div>
    );
  }
}

export default SliderArrow;
