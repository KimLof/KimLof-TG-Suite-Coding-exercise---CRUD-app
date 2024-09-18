import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../api';
import { Link } from 'react-router-dom';
import EventModal from './EventModal';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      fetchUsers(); // Päivittää listan
      setIsModalOpen(false) // SUlkee modal
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <h1>Users</h1>
      <Link to="/add-user">
        <button>Add User</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <button onClick={() => openModal(user.id)}>{user.name}</button>
              </td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/edit-user/${user.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUserId !== null && (
        <EventModal
          userId={selectedUserId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Users;
