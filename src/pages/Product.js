import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Box,
  Stack,
  VStack,
  Image,
  Button,
  Text,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import * as API from "../services/api";

const MIN_QUANTITY = 1;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      quantity: MIN_QUANTITY,
    };
  }

  componentDidMount() {
    API.get(this.props.match.params.id)
      .then((item) => this.setState({ item }))
      .catch((err) => console.log(err));
  }

  updateQuantity = (event) => {
    const quantity = Number.parseInt(event.target.value);
    if (quantity >= MIN_QUANTITY) {
      this.setState({ quantity });
    }
  };

  incrementQuantity = () => {
    let { quantity } = this.state;
    if (++quantity >= MIN_QUANTITY) {
      this.setState({ quantity });
    }
  };

  decrementQuantity = () => {
    let { quantity } = this.state;
    if (--quantity >= MIN_QUANTITY) {
      this.setState({ quantity });
    }
  };

  handleOnClick = (event) => {
    event.preventDefault();
    const { addToCart } = this.props;
    const { item, quantity } = this.state;
    addToCart(item, quantity);
    this.setState({ quantity: 1 }, () => this.props.history.push("/"));
  };

  render() {
    const { item, quantity } = this.state;

    return (
      <Box
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        align={"center"}
        p={5}
        my={4}
      >
        {!item ? (
          <Box m="2">
            <VStack spacing={4} align="center">
              <Box>
                <Text fontSize="lg">No item found!</Text>
              </Box>
              <Link to="/">
                <Button variant="outline">Back to product list</Button>
              </Link>
            </VStack>
          </Box>
        ) : (
          <>
            <Image
              boxSize="500px"
              objectFit="scale-down"
              loading="eager"
              src={item.image}
              alt={item.title}
            />
            <Box m="2">
              <Text fontSize="lg">{item.title}</Text>
            </Box>
            <Box m="2">
              <Text fontSize="lg" fontWeight="bold" as="kbd">
                ${item.price}
              </Text>
            </Box>
            <Box m="2" align={"left"} color="gray.500">
              <Text fontSize="lg">{item.description}</Text>
            </Box>
            <Box p={6}>
              <form>
                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput value={quantity}>
                    <NumberInputField onChange={this.updateQuantity} />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        onClick={this.incrementQuantity}
                      />
                      <NumberDecrementStepper
                        onClick={this.decrementQuantity}
                      />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Stack spacing={4} direction="row" align="center" mt={4}>
                  <Button onClick={this.handleOnClick}>Add to cart</Button>
                  <Link to="/">
                    <Button variant="outline">Back to product list</Button>
                  </Link>
                </Stack>
              </form>
            </Box>
          </>
        )}
      </Box>
    );
  }
}

export default withRouter(Product);
