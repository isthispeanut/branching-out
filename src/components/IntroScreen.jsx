import { useEffect, useState } from 'react';
import SquirrelCharacter from './SquirrelCharacter.jsx';
import ClimbingPositionSettings from './ClimbingPositionSettings.jsx';

const leaves = [
  { className: 'leaf leaf--one', delay: '0s' },
  { className: 'leaf leaf--two', delay: '1.8s' },
  { className: 'leaf leaf--three', delay: '3.2s' },
  { className: 'leaf leaf--four', delay: '0.9s' },
  { className: 'leaf leaf--five', delay: '2.5s' },
];

const bats = [
  { className: 'bat bat--one', delay: '0s' },
  { className: 'bat bat--two', delay: '4s' },
];

export default function IntroScreen({
  onBegin,
  dateLabel,
  climbingPosition,
  onClimbingPositionChange,
}) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isLoaded = progress === 100;

  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 2400;

    function updateProgress(timestamp) {
      if (startTime === undefined) startTime = timestamp;
      const nextProgress = Math.min(
        100,
        Math.floor(((timestamp - startTime) / duration) * 100),
      );
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    }

    frameId = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  function beginGame() {
    if (!isLoaded || exiting) return;
    setExiting(true);
    window.setTimeout(onBegin, 480);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (isLoaded && !exiting && !event.repeat) beginGame();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoaded, exiting]);

  return (
    <main className={`title-screen${exiting ? ' title-screen--exiting' : ''}`}>
      <div className="scene" aria-hidden="true">
        <div className="stars" />
        <div className="moon">
          <span className="moon__crater moon__crater--one" />
          <span className="moon__crater moon__crater--two" />
          <span className="moon__crater moon__crater--three" />
        </div>
        <div className="cloud cloud--one" />
        <div className="cloud cloud--two" />
        <div className="tree tree--back tree--left" />
        <div className="tree tree--back tree--right" />
        <div className="tree-trunk">
          <span className="tree-trunk__stripe tree-trunk__stripe--one" />
          <span className="tree-trunk__stripe tree-trunk__stripe--two" />
          <span className="tree-trunk__stripe tree-trunk__stripe--three" />
          <span className="tree-trunk__knot" />
        </div>
        <div className="tree tree--front tree--left" />
        <div className="tree tree--front tree--right" />
        <div className="ground" />
        {leaves.map((leaf) => (
          <span
            className={leaf.className}
            style={{ animationDelay: leaf.delay }}
            key={leaf.className}
          />
        ))}
        {bats.map((bat) => (
          <span
            className={bat.className}
            style={{ animationDelay: bat.delay }}
            key={bat.className}
          >
            <span />
          </span>
        ))}
        <SquirrelCharacter className="intro-squirrel" />
      </div>

      <div className="screen-vignette" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="topline">
        <span className="topline__mark"><span /> DAILY ADVENTURE</span>
        <span className="topline__date">NIGHT 001 &nbsp;·&nbsp; {dateLabel}</span>
      </header>

      <div className="menu-settings">
        <button
          className="settings-trigger"
          type="button"
          aria-expanded={settingsOpen}
          aria-controls="menu-climbing-settings"
          onClick={() => setSettingsOpen((open) => !open)}
        >
          <span aria-hidden="true">⚙</span> SETTINGS
        </button>
        {settingsOpen && (
          <div id="menu-climbing-settings">
            <ClimbingPositionSettings
              value={climbingPosition}
              onChange={onClimbingPositionChange}
              onClose={() => setSettingsOpen(false)}
            />
          </div>
        )}
      </div>

      <section className="title-card" aria-labelledby="game-title">
        <p className="eyebrow"><span /> A LITTLE TRIVIA. A VERY BIG TREE <span /></p>
        <h1 id="game-title">
          <span className="title-line">BRANCHING</span>
          <span className="title-line title-line--out">OUT<span className="title-period">.</span></span>
        </h1>
        <p className="tagline">Climb a little higher, one answer at a time.</p>

        <div className="loading" aria-label={`Loading ${progress}%`}>
          <div className="loading__topline">
            <span>{isLoaded ? 'ALL SET, LITTLE ACORN' : 'WAKING THE WOODS'}</span>
            <span>{String(progress).padStart(3, '0')}<small>%</small></span>
          </div>
          <div
            className="loading__track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Loading the forest"
          >
            <span className="loading__fill" style={{ width: `${progress}%` }} />
            <span className="loading__shine" />
          </div>
        </div>

        <div className="start-area" aria-live="polite">
          <button
            className={`start-prompt${isLoaded ? ' start-prompt--ready' : ''}`}
            type="button"
            onClick={beginGame}
            disabled={!isLoaded || exiting}
          >
            <span className="start-prompt__key">↵</span>
            {isLoaded ? 'PRESS ANY KEY OR CLICK TO BEGIN' : 'JUST A MOMENT...'}
            {isLoaded && <span className="start-prompt__key">↵</span>}
          </button>
        </div>
      </section>

      <footer className="bottomline">
        <span>TAKE YOUR TIME. THE TREE ISN’T GOING ANYWHERE.</span>
        <span className="bottomline__version">A GAME FOR CURIOUS CRITTERS &nbsp;·&nbsp; v0.1</span>
      </footer>
    </main>
  );
}
