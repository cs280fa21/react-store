import { Component } from "react";
import { withRouter } from "react-router";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      card: "",
    };
  }

  updateForm = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const location = {
      pathname: "/confirmation",
      state: { name: this.state.name, total: this.props.total },
    };
    this.props.history.push(location);
  };

  render() {
    const { name, address, card } = this.state;

    const isValid =
      name.length >= 3 && address.length >= 6 && card.length >= 16;

    return (
      <Box p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
        <form onSubmit={this.handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              minLength="3"
              name="name"
              placeholder="(minimum 3 characters)"
              required
              type="text"
              value={this.state.name}
              onChange={this.updateForm}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="name">Address</FormLabel>
            <Input
              id="address"
              minLength="6"
              name="address"
              placeholder="(minimum 6 characters)"
              required
              type="text"
              value={this.state.address}
              onChange={this.updateForm}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="name">Credit Card</FormLabel>
            <Input
              id="card"
              maxLength="16"
              minLength="16"
              name="card"
              placeholder="(16-digits number)"
              required
              type="text"
              value={this.state.card}
              onChange={this.updateForm}
            />
          </FormControl>
          <FormControl mt={4}>
            <Button colorScheme="teal" disabled={!isValid} type={"submit"}>
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withRouter(Payment);
