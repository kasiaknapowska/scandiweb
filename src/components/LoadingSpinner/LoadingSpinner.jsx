import "./_LoadingSpinner.scss";

import React, { PureComponent } from "react";

class LoadingSpinner extends PureComponent {
  render() {
    return (
      <div className="lds_spinner_container">
        <div className="lds_spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
