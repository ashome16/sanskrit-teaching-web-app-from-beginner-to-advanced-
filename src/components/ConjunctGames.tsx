import React, { useState } from 'react';
import '../styles/textbook-reader.css';

const CONJUNCT_GAMES = [
  { id: 'game1', title: 'Game 1 · Drop the Stick', src: './conjunct-game1.jpg', alt: 'Drop the Stick game' },
  { id: 'game2', title: 'Game 2 · Piggyback Ride', src: './conjunct-game2.jpg', alt: 'Piggyback stacking game' },
  { id: 'game3', title: 'Game 3 · Superhero Shape-Shifters', src: './conjunct-game3.jpg', alt: 'Superhero shape-shifters' },
];

const ConjunctGames: React.FC = () => {
  const [openGames, setOpenGames] = useState<Record<string, boolean>>({ game1: true });
  const toggleGame = (id: string) =>
    setOpenGames((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="conjunct-games">
      {CONJUNCT_GAMES.map((game) => {
        const open = !!openGames[game.id];
        return (
          <div key={game.id} className="varnamala-chart-toggle-wrap conjunct-game-wrap">
            <button
              type="button"
              className="varnamala-chart-toggle"
              onClick={() => toggleGame(game.id)}
              aria-expanded={open}
              aria-controls={`conjunct-${game.id}`}
            >
              {game.title}
              <span className="varnamala-chart-toggle-arrow">{open ? '▲' : '▼'}</span>
            </button>
            <div
              id={`conjunct-${game.id}`}
              className={`varnamala-chart-panel${open ? ' varnamala-chart-panel--open' : ''}`}
            >
              <img
                src={game.src}
                alt={game.alt}
                className="varnamala-chart-image"
                loading="lazy"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConjunctGames;
