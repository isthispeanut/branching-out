import SquirrelCharacter from './SquirrelCharacter.jsx';

export default function ResultsScreen({ answers, score, climbHeight, onMainMenu }) {
  const correctCount = answers.filter(({ outcome }) => outcome?.correct).length;
  const squirrelState = correctCount > 0 ? 'celebrating' : 'idle';

  return (
    <main className="results-screen">
      <div className="results-backdrop" aria-hidden="true">
        <div className="results-moon" />
        <div className="results-tree" />
        <SquirrelCharacter state={squirrelState} className="results-squirrel" />
      </div>
      <div className="screen-vignette" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <section className="results-card">
        <p className="results-eyebrow"><span>✦</span> TODAY’S CLIMB <span>✦</span></p>
        <h1 className="results-title">NICE WORK,<br /><span>ACORN.</span></h1>
        <p className="results-subtitle">The woods feel a little smaller from up here.</p>

        <div className="results-stats">
          <div>
            <span className="game-label">TOTAL ACORNS</span>
            <strong>{score.toLocaleString()}</strong>
          </div>
          <div>
            <span className="game-label">VALID ANSWERS</span>
            <strong>{correctCount}<small> / {answers.length}</small></strong>
          </div>
          <div>
            <span className="game-label">FINAL HEIGHT</span>
            <strong>{Math.floor(climbHeight / 12)}<small> m</small></strong>
          </div>
        </div>

        <div className="answer-summary">
          <h2>TRAIL NOTES</h2>
          <ol>
            {answers.map(({ question, outcome }, index) => (
              <li
                className={outcome?.correct ? 'summary-answer--correct' : 'summary-answer--missed'}
                key={question.id}
              >
                <span className="summary-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="summary-copy">
                  <span className="summary-question">{question.question}</span>
                  <span className="summary-response">
                    {outcome?.correct
                      ? `${outcome.rarity} · ${outcome.response}`
                      : outcome?.timedOut
                        ? 'Time ran out · no answer locked in'
                        : `No accepted answer · ${outcome?.response || '—'}`}
                  </span>
                </span>
                <span className="summary-points">
                  {outcome?.correct ? `+${outcome.points}` : outcome?.timedOut ? 'TIME' : '—'}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <button className="menu-button" type="button" onClick={onMainMenu}>
          BACK TO THE WOODS <span aria-hidden="true">↗</span>
        </button>
      </section>
    </main>
  );
}
