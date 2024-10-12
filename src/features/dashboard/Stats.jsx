import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings.length;

  //2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3.
  const checkins = confirmedStays.length;

  // 4.
  // num checked in nights / all available nights (num days  * num cabins)
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
// Define prop types
Stats.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  confirmedStays: PropTypes.arrayOf(
    PropTypes.shape({
      numNights: PropTypes.number.isRequired,
    })
  ).isRequired,
  numDays: PropTypes.number.isRequired,
  cabinCount: PropTypes.number.isRequired,
};

export default Stats;
