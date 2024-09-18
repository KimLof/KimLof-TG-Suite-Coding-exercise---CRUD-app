import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../api';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await getUserById(parseInt(id, 10)); // Tekee id:stä numeron
          setUser(response.data);
          setName(response.data.name || '');
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    } else {
      navigate('/users');
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(Number(id), { name }); // Tarkistaa että id on numero
      console.log('User updated successfully');
      navigate('/users');

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (user === null) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input
        type="text"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;