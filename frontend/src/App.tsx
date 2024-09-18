import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './routes/Users';
import AddUser from './routes/AddUser';
import EditUser from './routes/EditUser';
import UserDetail from './routes/UserDetail'; 
import Events from './routes/Events';
import AddEvent from './routes/AddEvent';
import Home from './routes/Home';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/user/:id" element={<UserDetail />} /> 
        <Route path="/events" element={<Events />} />
        <Route path="/add-event/:userId" element={<AddEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
