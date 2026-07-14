import { useEffect, useState } from 'react';

function getApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/workouts`;
}

async function fetchWorkouts() {
  const response = await fetch(getApiUrl(), { headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new Error('Failed to load workouts');
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

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id || workout.id}>
            <strong>{workout.name}</strong> — {workout.category} ({workout.duration} min)
          </li>
        ))}
      </ul>
    </section>
  );
}
