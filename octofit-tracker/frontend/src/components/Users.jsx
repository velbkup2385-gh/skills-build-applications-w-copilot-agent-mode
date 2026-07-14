import { useEffect, useState } from 'react';

function getApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/users/`;
}

async function fetchUsers() {
  const response = await fetch(getApiUrl(), { headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new Error('Failed to load users');
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
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
