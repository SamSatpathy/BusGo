import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const { busId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Fare comes from Search page, not from fetch - so it will never be 0 / NaN
  // In BusCard, we will send fare like: navigate(`/booking/${bus._id}`, { state: { fare: bus.fare, busName: bus.busName } })
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

    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bus: busId,
        passengerName: passengerName.trim(),
        seatsBooked: seatsBooked,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // Go to MyBookings so user can SEE it, not just alert
      navigate("/my-bookings");
    } else {
      alert(data.message || "Booking failed");
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

        {/* Total will now show correctly because fare comes from Search page */}
        <p className="total">Total: ₹{fareFromSearch * seatsBooked}</p>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default Booking;