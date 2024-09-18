import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, getEvents } from '../api';

interface User {
  id: number;
  name: string;
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  userId: number;
}

const UserDetail: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      if (id) {
        try {
          // Hakee käyttäjä tiedot
          const userResponse = await getUserById(Number(id));
          setUser(userResponse.data);
          
          // Hakee eventit ja näyttää vain käyttäjän omat
          const eventsResponse = await getEvents();
          const filteredEvents = eventsResponse.data.filter((event: Event) => event.userId === Number(id));
          setEvents(filteredEvents);
        } catch (error) {
          console.error('Error fetching user or events:', error);
        }
      }
    };

    fetchUserAndEvents();
  }, [id]);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };


  return (
    <div>
      {user && (
        <>
          <h1>{user.name}</h1>
          <h2>Events:</h2>
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <button onClick={() => openModal(event)}>
                  {event.title} - {new Date(event.date).toLocaleString()}
                </button>
              </li>
            ))}
          </ul>
          <a href={`/add-event/${user.id}`}>Add Event</a>
        </>
      )}
    </div>
  );
};

export default UserDetail;
