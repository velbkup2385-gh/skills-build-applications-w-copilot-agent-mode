import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts')
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
