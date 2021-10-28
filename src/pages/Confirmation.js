import { Link } from "react-router-dom";
import { Component } from "react";
import { withRouter } from "react-router";
import { Box, Heading, Stack, Button, Text } from "@chakra-ui/react";

class Confirmation extends Component {
  componentWillUnmount() {
    this.props.clearCart();
  }

  render() {
    const name = this.props.location.state
      ? this.props.location.state.name
      : undefined;
    const total = this.props.location.state
      ? this.props.location.state.total
      : 0;

    return (
      <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
        <Stack spacing={6}>
          {!name ? (
            <Heading>No order has been placed!</Heading>
          ) : (
            <>
              <Heading>Success! 🎉</Heading>
              <Text fontSize="lg">
                Thank you, <Text as="i">{name}</Text>!
              </Text>
              <Text fontSize="lg">
                Your <Text as="kbd">${total.toFixed(2)}</Text> order is
                confirmed!
              </Text>
              <Text fontSize="lg">
                Please allow 1-3 business day(s) for shipping!
              </Text>
            </>
          )}
          <Link to="/">
            <Button>Back to store!</Button>
          </Link>
        </Stack>
      </Box>
    );
  }
}

export default withRouter(Confirmation);
