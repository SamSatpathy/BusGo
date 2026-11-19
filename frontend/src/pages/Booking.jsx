import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Booking.css";

function Booking() {
  const { busId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fareFromSearch = location.state?.fare || 0;
  const busNameFromSearch = location.state?.busName || "Bus Booking";

  const [passengerName, setPassengerName] = useState("Sameer Satpathy");
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleBooking(e) {
    e.preventDefault();
    if (!passengerName.trim()) {
      alert("Please enter passenger name");
      return;
    }
    setLoading(true);

    try {
      // AXIOS - no localhost, no JSON.stringify, no headers needed
      const { data } = await api.post("/bookings", {
        bus: busId,
        passengerName: passengerName.trim(),
        seatsBooked: seatsBooked,
      });

      // Success - go to MyBookings
      navigate("/mybookings");
    } catch (err) {
      // axios error comes in err.response.data
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="booking-page-single">
      <form className="booking-form-single" onSubmit={handleBooking}>
        <h2>{busNameFromSearch}</h2>
        <p>Fare: ₹{fareFromSearch} per seat</p>

        <h3>Passenger Details</h3>

        <label>Passenger Name</label>
        <input
          type="text"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />

        <label>No. of Seats</label>
        <select
          value={seatsBooked}
          onChange={(e) => setSeatsBooked(Number(e.target.value))}
        >
          <option value={1}>1 Seat</option>
          <option value={2}>2 Seats</option>
          <option value={3}>3 Seats</option>
          <option value={4}>4 Seats</option>
        </select>

        <p className="total">Total: ₹{fareFromSearch * seatsBooked}</p>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default Booking;