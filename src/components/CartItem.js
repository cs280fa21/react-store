import { Component } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Stack,
  Image,
  GridItem,
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const MIN_QUANTITY = 0;

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: MIN_QUANTITY,
    };
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.item.quantity,
    });
  }

  updateQuantity = (quantity) => {
    if (quantity >= MIN_QUANTITY) {
      this.setState({ quantity }, () => {
        const { item, updateCart } = this.props;
        const { quantity } = this.state;
        updateCart(item, quantity);
      });
    }
  };

  handleOnChange = (event) => {
    const quantity = Number.parseInt(event.target.value);
    this.updateQuantity(quantity);
  };

  incrementQuantity = () => {
    let { quantity } = this.state;
    this.updateQuantity(++quantity);
  };

  decrementQuantity = () => {
    let { quantity } = this.state;
    this.updateQuantity(--quantity);
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { quantity } = this.state;
    const { item } = this.props;

    return (
      <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={4}>
        <GridItem>
          <Link to={`/product/${item.id}`}>
            <Image
              rounded="lg"
              boxSize="100px"
              objectFit="scale-down"
              src={item.image}
              alt={item.title}
              draggable="false"
              loading="lazy"
            />
          </Link>
        </GridItem>
        <GridItem colSpan={2}>
          <Stack spacing="0.5">
            <Text fontWeight="sm">{item.title}</Text>
            <Text fontSize="medium" fontWeight="bold">
              ${item.price}
            </Text>
          </Stack>
        </GridItem>
        <GridItem>
          <form onSubmit={this.handleOnSubmit}>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <NumberInput value={quantity}>
                <NumberInputField onChange={this.handleOnChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={this.incrementQuantity} />
                  <NumberDecrementStepper onClick={this.decrementQuantity} />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </form>
        </GridItem>
      </Grid>
    );
  }
}

export default CartItem;
