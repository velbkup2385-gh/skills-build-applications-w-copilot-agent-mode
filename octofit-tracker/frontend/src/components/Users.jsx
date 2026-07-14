import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {users.map((user) => (
          <li key={user._id || user.id}>
            <strong>{user.name}</strong> — {user.email || user.role}
          </li>
        ))}
      </ul>
    </section>
  );
}
