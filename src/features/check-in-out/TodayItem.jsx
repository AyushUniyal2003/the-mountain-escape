import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import PropTypes from "prop-types"; // Import PropTypes

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}{" "}
      {/* Fixed Typo */}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

// Define prop types for TodayItem
TodayItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired, // Activity should have an id
    status: PropTypes.oneOf(["unconfirmed", "checked-in"]).isRequired, // Status should be one of the specified strings
    guests: PropTypes.shape({
      countryFlag: PropTypes.string.isRequired, // Country flag should be a string (URL)
      fullName: PropTypes.string.isRequired, // Full name should be a string
      country: PropTypes.string.isRequired, // Add country validation here
    }).isRequired, // Guests should be an object with required fields
    numNights: PropTypes.number.isRequired, // Number of nights should be a required number
  }).isRequired, // Activity prop is required and should be an object
};

export default TodayItem;
