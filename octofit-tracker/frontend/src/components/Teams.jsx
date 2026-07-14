import { useEffect, useState } from 'react';

function getApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/teams`;
}

async function fetchTeams() {
  const response = await fetch(getApiUrl(), { headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new Error('Failed to load teams');
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

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeams()
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
