import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
        <h1>Home page</h1>
        <Link to={`/users`}>
                  <button>Users</button>
                </Link>

                <Link to={`/events`}>
                  <button>Events</button>
                </Link>
        </div>
    );
};

export default Home;