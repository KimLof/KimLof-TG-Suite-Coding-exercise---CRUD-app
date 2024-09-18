import React, { useState, useEffect } from 'react';
import { getEvents, getUsers } from '../api';


interface Event {
  id: number;
  userId: number;
  type: string;
  value: string;
  createdAt: string; 
}

interface User {
  id: number;
  name: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userMap, setUserMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const usersData: User[] = response.data;
      setUsers(usersData);
      // Muuttaa id:t käyttäjänimiksi
      const userMap = new Map(usersData.map(user => [user.id, user.name]));
      setUserMap(userMap);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>User</th>
      <th>Type</th>
      <th>Value</th>
      <th>Created At</th>
    </tr>
  </thead>
  <tbody>
    {events.map((event: Event) => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{userMap.get(event.userId) || 'Unknown'}</td>
        <td>{event.type}</td>
        <td>{event.value}</td>
        <td>{new Date(event.createdAt).toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default Events;
