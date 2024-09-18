import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent } from '../api'; 

const AddEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await createEvent({ title, date, userId: Number(id) });
        console.log('Event created successfully');
        navigate(`/users/${id}`); 
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
