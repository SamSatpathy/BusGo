import {Route,Routes,BrowserRouter} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import SearchResults from "./pages/SearchResults";
import Booking from "./pages/Booking";
import MyBooking from "./pages/MyBooking"
function App(){
  return (
      <BrowserRouter>
      <>
       <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/booking/:busId" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBooking />} />

       </Routes>
      </>
       
      </BrowserRouter>
  );
}
export default App;