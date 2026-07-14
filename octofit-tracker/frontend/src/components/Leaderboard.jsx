import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard')
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
