import { Component } from "react";
import Item from "../components/ShopItem";
import { Grid } from "@chakra-ui/react";
import * as API from "../services/api";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    API.getAll()
      .then((items) => this.setState({ items }))
      .catch((err) => console.log(err));
  }

  render() {
    const { addToCart } = this.props;
    const { items } = this.state;
    return (
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={5}>
        {items.map((item, index) => (
          <Item item={item} key={index} addToCart={addToCart} />
        ))}
      </Grid>
    );
  }
}

export default Shop;
