import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities')
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
