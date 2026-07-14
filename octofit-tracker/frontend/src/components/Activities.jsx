import { useEffect, useState } from 'react';

function getApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/activities/`;
}

async function fetchActivities() {
  const response = await fetch(getApiUrl(), { headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new Error('Failed to load activities');
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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id || activity.id}>
            <strong>{activity.type}</strong> — {activity.duration} min
          </li>
        ))}
      </ul>
    </section>
  );
}
