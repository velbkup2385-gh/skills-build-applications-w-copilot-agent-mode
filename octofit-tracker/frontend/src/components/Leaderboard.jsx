import { useEffect, useState } from 'react';

function getApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/leaderboard/`;
}

async function fetchLeaderboard() {
  const response = await fetch(getApiUrl(), { headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new Error('Failed to load leaderboard');
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

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard()
      .then(setEntries)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {entries.map((entry) => (
          <li key={entry._id || entry.id}>
            <strong>{entry.userId?.name || entry.name}</strong> — {entry.score} pts
          </li>
        ))}
      </ul>
    </section>
  );
}
