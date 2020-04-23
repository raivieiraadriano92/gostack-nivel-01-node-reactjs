import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    handleGetRepositories()
  }, [])

  async function handleAddRepository() {
    try {
      const { data } = await api.post('repositories', {
        title: `Repo ${Math.random()}`,
        url: `url ${Math.random()}`,
        techs: [1, 2, 3]
      })

      setRepositories([data, ...repositories])
    } catch (err) {}
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)

      setRepositories(repositories.filter(repo => repo.id !== id))
    } catch (err) {}
  }

  async function handleGetRepositories() {
    try {
      const { data } = await api.get('repositories')

      setRepositories(data)
    } catch (err) {}
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
