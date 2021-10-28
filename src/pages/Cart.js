import React, { Component } from "react";
import Payment from "../components/Payment";
import Item from "../components/CartItem";
import { Box, Text } from "@chakra-ui/react";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    const total = this.props.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.setState({
      total,
    });
  }

  render() {
    const { total } = this.state;
    const { items, updateCart } = this.props;

    return (
      <>
        <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
          {items.length ? (
            items.map((item, index) => (
              <Item item={item} key={index} updateCart={updateCart} />
            ))
          ) : (
            <Box>The shopping cart is empty!</Box>
          )}
        </Box>
        <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
          <Text fontSize="3xl">Total is ${total.toFixed(2)}</Text>
        </Box>
        <Payment total={total} />
      </>
    );
  }
}

export default Cart;
