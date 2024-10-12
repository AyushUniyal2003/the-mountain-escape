import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
import PropTypes from 'prop-types'; // Import PropTypes

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

// Define prop types for CheckoutButton
CheckoutButton.propTypes = {
  bookingId: PropTypes.string.isRequired, // Ensure bookingId is a required string
};

export default CheckoutButton;
