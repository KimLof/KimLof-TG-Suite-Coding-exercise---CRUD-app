import React, { useState } from 'react';
import { createUser } from '../api';
import { Link } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUser({ name });
      setName(''); // Tyhjentää kentän jos haluaa monta käyttäjää lisätä
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
              <Link to="/users">
        <button>Users</button>
      </Link>
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="User Name"
      />
      <button type="submit">Add User</button>
    </form>
    </div>
  );
};

export default AddUser;