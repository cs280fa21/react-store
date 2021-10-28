import { Component } from "react";
import { Switch, Route } from "react-router";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Header from "./components/Header";
import { Container } from "@chakra-ui/react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
    };
  }

  addToCart = (item, quantity) => {
    this.setState(
      (state) => {
        const currQuantity = state.cart[item.id]
          ? state.cart[item.id].quantity + quantity
          : quantity;
        return {
          cart: Object.assign(state.cart, {
            [item.id]: { ...item, quantity: currQuantity },
          }),
        };
      },
      () => {
        window.alert("Item added to the cart!");
      }
    );
  };

  // PRE: item is already in the cart!
  updateCart = (item, quantity) => {
    const cart = this.state.cart;
    if (quantity === 0) {
      delete cart[item.id];
      window.alert("Removed from cart");
    } else {
      cart[item.id].quantity = quantity;
    }

    this.setState({
      cart,
    });
  };

  clearCart = () => {
    this.setState({ cart: {} });
  };

  render() {
    const { cart } = this.state;

    return (
      <Container>
        <Switch>
          <Route exact path="/">
            <Header numItems={Object.keys(cart).length} />
            <Shop addToCart={this.addToCart} />
          </Route>
          <Route path="/product/:id">
            <Product addToCart={this.addToCart} />
          </Route>
          <Route path="/cart">
            <Header numItems={Object.keys(cart).length} />
            <Cart items={Object.values(cart)} updateCart={this.updateCart} />
          </Route>
          <Route path="/confirmation">
            <Confirmation clearCart={this.clearCart} />
          </Route>
        </Switch>
      </Container>
    );
  }
}

export default App;
