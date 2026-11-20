import { useEffect, useState } from "react";

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/buses`)
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch bookings");
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    alert(data.message);
    fetchBookings(); // refresh list
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{booking.passengerName}</h3>
            <p>Booking ID: {booking._id}</p>
            <p>Seats: {booking.seatsBooked} | Total: ₹{booking.totalFare}</p>
            <p>Bus: {booking.bus?.busName || booking.bus?._id || "Bus details unavailable"}</p>
            <button onClick={() => handleCancel(booking._id)}>Cancel Booking</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyBooking;