import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BusCard from "../Components/BusCard";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const navigate = useNavigate();

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/buses`);
        const data = await res.json();
        // Backend returns { buses: [...] }
        const allBuses = data.buses || data;

        // Filter by From / To from URL
        const filtered = allBuses.filter(
          (bus) =>
            bus.source.toLowerCase().includes(from.toLowerCase()) &&
            bus.destination.toLowerCase().includes(to.toLowerCase())
        );
        setBuses(filtered);
      } catch (err) {
        console.log("Server not running");
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, [from, to]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading buses...</p>;
  if (buses.length === 0) return <p style={{ textAlign: "center" }}>No buses found for {from} to {to}</p>;

  
  return (
    <div style={{ padding: "20px" }}>
      <h2>Buses from {from} to {to}</h2>

      {buses.length === 0 && <p>No buses found</p>}

      {buses.map((bus) => (
        <div
          key={bus._id}
          onClick={() =>
            navigate(`/booking/${bus._id}`, {
              state: { fare: bus.fare, busName: bus.busName },
            })
          }
          style={{
            cursor: "pointer",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            marginBottom: "15px",
            background: "white",
          }}
        >
          <h3>{bus.busName}</h3>
          <p>
            {bus.source} → {bus.destination}
          </p>
          <p>Bus No: {bus.busNumber}</p>
          <p>Fare: ₹{bus.fare} per seat</p>
          <p>Available Seats: {bus.availableSeats}</p>
          <button
            style={{
              background: "#0ea5e9",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;