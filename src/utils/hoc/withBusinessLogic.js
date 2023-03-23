import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addToCart, substractFromCart } from "../../redux/cartSlice";
import { addCount, substractCount } from "../../redux/counterSlice";
import { createCartItem } from "../../utils/functions";

export default function withBusinessLogic(Component) {
  class ComponentWithBusinessLogic extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        attributesChosen: {},
        attributesError: null,
      };
      this.addItem = this.addItem.bind(this);
      this.substractItem = this.substractItem.bind(this);
      this.addItemWithDefaultAttributes = this.addItemWithDefaultAttributes.bind(this);
      this.setAttributes = this.setAttributes.bind(this);
      this.addItemWithChosenAttributes = this.addItemWithChosenAttributes.bind(this);
    }

    //simple add and substract item
    addItem(item) {
      this.props.addToCart(item);
      this.props.addCount();
    }
    substractItem(item) {
      this.props.substractFromCart(item);
      this.props.substractCount();
    }

    //add to cart with default attributes
    setDefaultAttributes(attributes, item) {
      if (attributes.length) {
        attributes.forEach((attribute) => {
          item.attributesChosen = {
            ...item.attributesChosen,
            [attribute.id.toLowerCase().replaceAll(" ", "-")]:
              attribute.items[0].value,
          };
        });
      }
      return item;
    }
    addItemWithDefaultAttributes(e, product) {
      e.stopPropagation();

      const basicItem = createCartItem(product);
      const item = this.setDefaultAttributes(product.attributes, basicItem);

      this.addItem(item)
    }

    //add to cart with chosen attributes

    setAttributes(id, value) {
      this.setState((prevState) => ({
        attributesChosen: {
          ...prevState.attributesChosen,
          [id.toLowerCase().replaceAll(" ", "-")]: value,
        },
      }));
    }

    checkAttributesChosen(attributes) {
      const areAttributesChosen = attributes.every((attribute) =>
        Object.keys(this.state.attributesChosen).includes(
          attribute.id.toLowerCase().replaceAll(" ", "-")
        )
      );
      return areAttributesChosen;
    }

    addItemWithChosenAttributes(product) {
      const areAttributesChosen = this.checkAttributesChosen(
        product.attributes
      );

      if (areAttributesChosen) {
        const item = createCartItem(product, this.state.attributesChosen);
        this.setState({ attributesError: null });
        this.addItem(item)
      } else {
        this.setState({ attributesError: `Choose options` });
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          addItem={this.addItem}
          substractItem={this.substractItem}
          addItemWithDefaultAttributes={this.addItemWithDefaultAttributes}
          addItemWithChosenAttributes={this.addItemWithChosenAttributes}
          setAttributes={this.setAttributes}
          attributesChosen={this.state.attributesChosen}
          attributesError={this.state.attributesError}
        />
      );
    }
  }
  const mapDispatchToProps = {
    substractFromCart,
    addToCart,
    addCount,
    substractCount,
  };

  return connect(null, mapDispatchToProps)(ComponentWithBusinessLogic);
}
