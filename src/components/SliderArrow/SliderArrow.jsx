import React, { Component } from "react";
import classNames from "classnames";
import "./_SliderArrow.scss";


class SliderArrow extends Component {

  
  render() {
    return (
      <div className="slider_arrow" onClick={this.props.onClick}>
        <div className={classNames({next: this.props.direction === "next", previous: this.props.direction === "previous"})}></div>
      </div>
    );
  }
}

export default SliderArrow;
