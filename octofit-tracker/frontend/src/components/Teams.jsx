import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <p>{error}</p> : null}
      <ul>
        {teams.map((team) => (
          <li key={team._id || team.id}>
            <strong>{team.name}</strong> — {team.sport || team.members?.length || 'No sport'}
          </li>
        ))}
      </ul>
    </section>
  );
}
