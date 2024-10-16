import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword component
import './App.css';
import  { EventProvider } from'./context/EventContext'
import { UserProvider } from './context/UserContext'
import UpcomingEvents from './components/UpcomingEvents';
import CompletedEvents from './components/CompletedEvents';
import Dashboard from './components/Dashboard';
import MyEvents from './components/MyEvents';

const App = () => {
  return (
    <UserProvider>
     <EventProvider>
    <Router>
      <div className="App">
        <Routes>
          {/* Default route for Login */}
          <Route path="/" element={<Login />} />

          {/* Route for Signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* Route for Forgot Password page */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected route for Home page */}
          <Route path="/home" element={<Home />} >
            <Route path="/home" element={<Dashboard />} />
            <Route path="myevents" element={<MyEvents />} />
            <Route path="upcomingevents" element={<UpcomingEvents />} />
            <Route path="completedevents" element={<CompletedEvents />} />
          </Route>
        </Routes>
      </div>
    </Router>
    </EventProvider>
    </UserProvider>
  );
};

export default App;
