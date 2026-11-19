import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// ADD THESE 5 LINES - import your local images
import bus1 from "../../images/bus-1.png";
import bus2 from "../../images/bus-2.png";
import bus3 from "../../images/bus-3.png";
import bus4 from "../../images/bus-4.png";
import bus5 from "../../images/bus-5.png";

function Home() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("2026-11-17");

  function handleSearch() {
    if (!from || !to) {
      alert("Please enter From and To");
      return;
    }
    navigate(`/search?from=${from}&to=${to}&date=${date}`);
  }

  function goRoute(f, t) {
    navigate(`/search?from=${f}&to=${t}&date=${date}`);
  }

  return (
    <div>
      {/* 1. PHOTO BANNER */}
      <div className="hero-banner">
        <h1>India's No. 1 online<br />bus ticket booking site</h1>
        <p>Book buses easily with BusGo</p>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="search-bar">
        <div className="search-field">
          <span>🚌</span>
          <input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="search-field">
          <span>🚌</span>
          <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="search-field">
          <span>📅</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button className="search-btn" onClick={handleSearch}>🔍 Search buses</button>
      </div>

      {/* 3. OFFERS WITH IMAGE */}
      <div className="offers">
        <h2>Offers for you</h2>
        <div className="offer-grid">
          <div className="offer-card">
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80" alt="Bus Offer" />
            <p>Get 10% Discount - Use code BUSGO10</p>
          </div>
          <div className="offer-card">
            <img src={bus5} alt="Bus Offer" />
            <p>First Booking Free Cancellation - Code FIRSTFREE</p>
          </div>
          <div className="offer-card">
            <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80" alt="Bus Offer" />
            <p>Flat ₹100 Off - Use code TRAVEL100</p>
          </div>
        </div>
      </div>

      {/* 4. POPULAR ROUTES WITH IMAGE */}
      <div className="popular-routes">
        <h2>Popular Routes</h2>
        <div className="route-grid">
          <div className="route-card" onClick={() => goRoute("Jamshedpur", "Ranchi")}>
            <img src={bus1} alt="Jamshedpur to Ranchi" />
            <p>Jamshedpur → Ranchi</p>
            <span>From ₹250</span>
          </div>
          <div className="route-card" onClick={() => goRoute("Jamshedpur", "Kolkata")}>
            <img src={bus2} alt="Jamshedpur to Kolkata" />
            <p>Jamshedpur → Kolkata</p>
            <span>From ₹450</span>
          </div>
          <div className="route-card" onClick={() => goRoute("Ranchi", "Patna")}>
            <img src={bus3} alt="Ranchi to Patna" />
            <p>Ranchi → Patna</p>
            <span>From ₹350</span>
          </div>
          <div className="route-card" onClick={() => goRoute("Kolkata", "Dhanbad")}>
            <img src={bus4} alt="Kolkata to Dhanbad" />
            <p>Kolkata → Dhanbad</p>
            <span>From ₹300</span>
          </div>
        </div>
      </div>

      {/* 5. WHY CHOOSE BUSGO WITH IMAGE */}
      <div className="why-busgo">
        <h2>Why Choose BusGo?</h2>
        <div className="why-grid">
          <div>
            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80" alt="Safe Travel" />
            <h3>Safe Travel</h3>
            <p>Verified buses and drivers</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" alt="Easy Payment" />
            <h3>Easy Payment</h3>
            <p>UPI, Card, Net Banking</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" alt="Support" />
            <h3>24x7 Support</h3>
            <p>Help anytime you need</p>
          </div>
        </div>
      </div>

      {/* 6. FOOTER */}
      <div className="footer">
        <p>BusGo © 2026 | About | Contact | Terms</p>
        <p>Made for easy bus booking in India</p>
      </div>
    </div>
  );
}

export default Home;