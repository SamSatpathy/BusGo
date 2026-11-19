import { Link } from "react-router-dom";

function BusCard({ bus }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      margin: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h3>{bus.busName} <span style={{ fontSize: "12px", color: "#666" }}>{bus.busNumber}</span></h3>
      <p><strong>{bus.source}</strong> → <strong>{bus.destination}</strong></p>
      <p>Departure: {new Date(bus.departureDateTime).toLocaleString()}</p>
      <p>Arrival: {new Date(bus.arrivalDateTime).toLocaleString()}</p>
      <p>Fare: ₹{bus.fare} | Seats: {bus.availableSeats}/{bus.totalSeats}</p>
      
      <Link to={`/book/${bus._id}`}>
        <button disabled={bus.availableSeats === 0}>
          {bus.availableSeats === 0 ? "Sold Out" : "Book Now"}
        </button>
      </Link>
    </div>
  );
}

export default BusCard;