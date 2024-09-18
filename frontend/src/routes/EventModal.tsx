import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, getUserById } from '../api';

interface EventModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ userId, isOpen, onClose }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [newEventType, setNewEventType] = useState(''); 
  const [newEventValue, setNewEventValue] = useState('');
  const [username, setUsername] = useState(''); 
  const [error, setError] = useState(''); 

// >Eventin tyypit
  const eventTypes = ['login', 'logout', 'payment', 'signup', 'error'];

  useEffect(() => {
    if (isOpen) {
      fetchEvents();
      fetchUser();
    }
  }, [isOpen, userId]);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data.filter((event: any) => event.userId === userId));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await getUserById(userId);
      setUsername(response.data.name); 
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleAddEvent = async () => {
    if (!newEventType || !newEventValue) {
      setError('Both Event Type and Event Value are required.');
      return;
    }
    setError(''); // Poistaa errorin jos molemmissa kentissä on dataa
    try {
      await createEvent({ userId, type: newEventType, value: newEventValue });
      setNewEventType('');
      setNewEventValue('');
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Events for {username}</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <div>
                <strong>Type:</strong> {event.type}<br />
                <strong>Date:</strong> {new Date(event.createdAt).toLocaleString()}<br />
                <strong>Value:</strong> {event.value}
              </div>
            </li>
          ))}
        </ul>
        <div>
          <select
            value={newEventType}
            onChange={(e) => setNewEventType(e.target.value)}
          >
            <option value="" disabled>Select Event Type</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input
            type="text"
            value={newEventValue}
            onChange={(e) => setNewEventValue(e.target.value)}
            placeholder="Event Value"
          />
          <button onClick={handleAddEvent}>Add Event</button>
          {error && <p className="error">{error}</p>} 
        </div>
      </div>
    </div>
  );
};

export default EventModal;
