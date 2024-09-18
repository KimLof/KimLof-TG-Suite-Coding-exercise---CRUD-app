import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../api'; // Import updateUser function
import EventModal from './EventModal';
import AddUserModal from './AddUserModal';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null); // Track which user is being edited
  const [editedName, setEditedName] = useState<string>(''); // Store the edited name

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
      fetchUsers();
      setIsEventModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openEventModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedUserId(null);
  };

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const startEditing = (userId: number, currentName: string) => {
    setEditingUserId(userId);
    setEditedName(currentName);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditedName('');
  };

  const handleSave = async (userId: number) => {
    try {
      await updateUser(userId, { name: editedName }); // Update the user
      fetchUsers(); // Refresh the user list
      setEditingUserId(null); // Exit editing mode
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container">
      <div className="header-row">
        <button className="btn-primary" onClick={openAddUserModal}>Add User</button>
      </div>
      <table className="user-table">
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
            <tr key={user.id} onClick={() => openEventModal(user.id)}>
              <td>{user.id}</td>
              <td onClick={(e) => e.stopPropagation() /* Prevent modal from opening */}>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent row click when clicking input
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td className="action-buttons" onClick={(e) => e.stopPropagation() /* Prevent modal */}>
                {editingUserId === user.id ? (
                  <>
                    <button className="btn-save" onClick={() => handleSave(user.id)}>Save</button>
                    <button className="btn-cancel" onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                                      <button className="btn-edit" onClick={(e) => {
                      e.stopPropagation();
                      startEditing(user.id, user.name);
                    }}>Edit</button>
                    <button className="btn-secondary" onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddUserModal isOpen={isAddUserModalOpen} onClose={closeAddUserModal} onUserAdded={fetchUsers} />
      )}

      {/* Event Modal */}
      {selectedUserId !== null && (
        <EventModal
          userId={selectedUserId}
          isOpen={isEventModalOpen}
          onClose={closeEventModal}
        />
      )}
    </div>
  );
};

export default Users;
