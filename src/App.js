import './App.css';
import CrudPlanes from './Table/CrudPlanes';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrudPilots from './Table/CrudPilots';
import Home from './Table/Home';
import Footer from './Table/Footer';
import CrudReservations from './Table/CrudReservations';

function App() {
  return (
    <Router>
      <Container className="mt-4">
        <h2 className="text-center">FLIGHT SCHOOL</h2>
        <Nav variant="tabs" className="mb-4">
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/Planes" className="nav-link">
              Airplanes
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/Pilots" className="nav-link">
              Pilots
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/Reservations" className="nav-link">
              Reservations
            </Link>
          </NavItem>
          {/* Add more buttons for other components */}
        </Nav>

        <Routes>
          <Route path="/Planes" element={<CrudPlanes />} />
          <Route path="/Pilots" element={<CrudPilots />} />
          <Route path="/Reservations" element={<CrudReservations />} />
          <Route path="/" element={<Home />} />
          {/* Add routes for other components */}
        </Routes>
        <Footer />{Footer}
      </Container>
    </Router>
  );
}





//function App() {
//  return (
//      <div className="App">
//        <h2>FLIGHT SCHOOL</h2>
//        <DataGridTest />
//        
//      </div>
//    );
//  }


export default App;
