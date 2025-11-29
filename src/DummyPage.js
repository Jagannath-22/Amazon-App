import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DummyPage.css';

const premiumPalettes = [
  ['#1f1c2c', '#928DAB'], // Dark royal
  ['#0f2027', '#203a43', '#2c5364'], // Deep ocean
  ['#4b6cb7', '#182848'], // Indigo night
  ['#373B44', '#4286f4'], // Slate blue
  ['#1c92d2', '#f2fcfe'], // Clean premium
   ['#fdfbfb', '#ebedee'],
  ['#f6d365', '#fda085'],
  ['#cfd9df', '#e2ebf0'],
  ['#a1c4fd', '#c2e9fb'],
  ['#6c4561ff', '#a5a791ff'],
];

function DummyPage() {
  const { pageName } = useParams();
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  const handleBackgroundClick = () => {
    setBgIndex((prev) => (prev + 1) % premiumPalettes.length);
  };

  const gradient = `linear-gradient(to bottom right, ${premiumPalettes[bgIndex].join(', ')})`;

  return (
    <div
      className="dummy-page-container"
      onClick={handleBackgroundClick}
      style={{ background: gradient }}
    >
      <div className="dummy-content">
        <h1>
          Welcome to the{' '}
          {pageName ? pageName.replace(/-/g, ' ') : 'Dummy'} Page!
        </h1>
        <p>This is a placeholder page for your selected section.</p>
        <p>
          You can replace this content with the actual page for "
          {pageName ? pageName.replace(/-/g, ' ') : 'this category'}".
        </p>
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅ Go to Homepage
        </button>
        <p className="hint">(Click anywhere to change background 🎨)</p>
      </div>
    </div>
  );
}

export default DummyPage;
