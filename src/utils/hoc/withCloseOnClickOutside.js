import React, { PureComponent } from "react";

export default function withCloseOnClickOutside(Component) {
  class ComponentWithCloseOnClickOutside extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };
      this.wrapperRef = React.createRef();
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.setIsOpen = this.setIsOpen.bind(this);
    }
    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(e) {
      if (
        this.state.isOpen &&
        this.wrapperRef &&
        !this.wrapperRef.current.contains(e.target)
      ) {
        this.setState({ isOpen: false });
      }
    }
    setIsOpen() {
      this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
      return (
        <Component
          {...this.props}
          isOpen={this.state.isOpen}
          wrapperRef={this.wrapperRef}
          setIsOpen={this.setIsOpen}
        />
      );
    }
  }
  return ComponentWithCloseOnClickOutside;
}
