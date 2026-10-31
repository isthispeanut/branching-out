import { useEffect, useMemo, useRef, useState } from 'react';
import { findAcceptedAnswer, getRarity } from '../data/questions.js';
import SquirrelCharacter from './SquirrelCharacter.jsx';
import ResultsScreen from './ResultsScreen.jsx';
import ClimbingPositionSettings from './ClimbingPositionSettings.jsx';

const QUESTION_SECONDS = 25;

function getScore(answers) {
  return answers.reduce((total, answer) => total + (answer?.points ?? 0), 0);
}

export default function TriviaGame({
  questions,
  dateLabel,
  climbingPosition,
  onClimbingPositionChange,
  onMainMenu,
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [response, setResponse] = useState('');
  const [outcomes, setOutcomes] = useState([]);
  const [outcome, setOutcome] = useState(null);
  const [answerError, setAnswerError] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const outcomeRef = useRef(null);
  const inputRef = useRef(null);
  const question = questions[questionIndex];
  const score = getScore(outcomes);
  const climbHeight = score * 1.25;
  const cameraOffset = Math.max(0, climbHeight - 120);
  const isFinished = questionIndex >= questions.length;

  const finalAnswers = useMemo(
    () => questions.map((item, index) => ({ question: item, outcome: outcomes[index] })),
    [outcomes, questions],
  );

  function recordAnswer(answerOutcome) {
    if (outcomeRef.current) return;
    outcomeRef.current = answerOutcome;
    setOutcome(answerOutcome);
    setOutcomes((previous) => {
      const next = [...previous];
      next[questionIndex] = answerOutcome;
      return next;
    });
  }

  useEffect(() => {
    if (isFinished || outcome) return undefined;
    if (timeLeft === 0) {
      recordAnswer({ correct: false, points: 0, response: '', timedOut: true });
      return undefined;
    }

    const timerId = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

    return () => window.clearTimeout(timerId);
  }, [isFinished, outcome, questionIndex, timeLeft]);

  useEffect(() => {
    if (!outcome && !isFinished) inputRef.current?.focus();
  }, [questionIndex, outcome, isFinished]);

  function submitAnswer(event) {
    event.preventDefault();
    if (outcomeRef.current) return;

    const acceptedAnswer = findAcceptedAnswer(question, response);
    if (!acceptedAnswer) {
      setAnswerError('We don’t have that one on our list yet. Try another answer, your turn is safe!');
      return;
    }

    const rarity = getRarity(acceptedAnswer.points);
    recordAnswer({
      correct: true,
      points: acceptedAnswer.points,
      rarity,
      response: acceptedAnswer.text,
      submittedResponse: response.trim(),
      acceptedAnswer: acceptedAnswer.text,
      reaction: `Nice find! ${acceptedAnswer.text} belongs in this category.`,
      timedOut: false,
    });
  }

  function continueGame() {
    if (!outcomeRef.current) return;
    outcomeRef.current = null;
    setOutcome(null);
    setAnswerError('');
    setResponse('');
    setTimeLeft(QUESTION_SECONDS);
    setQuestionIndex((index) => index + 1);
  }

  useEffect(() => {
    if (!outcome?.timedOut) return undefined;

    const timeoutId = window.setTimeout(continueGame, 1800);
    return () => window.clearTimeout(timeoutId);
  }, [outcome, questionIndex]);

  if (isFinished) {
    return (
      <ResultsScreen
        answers={finalAnswers}
        score={score}
        climbHeight={climbHeight}
        onMainMenu={onMainMenu}
      />
    );
  }

  const squirrelState = outcome
    ? outcome.timedOut || !outcome.correct
      ? 'missed'
      : outcome.points >= 50
        ? 'rare'
        : 'celebrating'
    : 'climbing';

  return (
    <main className="game-screen">
      <div
        className="climb-stage"
        aria-hidden="true"
        style={{
          '--climb-height': `${climbHeight}px`,
          '--camera-offset': `${cameraOffset}px`,
        }}
      >
        <div className="climb-world">
          <div className="climb-stars" />
          <div className="endless-trunk">
            <span className="trunk-knot trunk-knot--one" />
            <span className="trunk-knot trunk-knot--two" />
            <span className="trunk-notch trunk-notch--one" />
            <span className="trunk-notch trunk-notch--two" />
          </div>
          <SquirrelCharacter
            state={squirrelState}
            className={`climbing-squirrel climbing-squirrel--${climbingPosition}`}
          />
          <div className="climb-ground" />
        </div>
      </div>
      <div className="game-vignette" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="game-header">
        <div className="game-logo" aria-label="Branching Out">
          <span>BRANCHING</span>
          <span>OUT<span className="game-logo__period">.</span></span>
        </div>
        <div className="question-count">
          <span className="game-label">DAILY CLIMB</span>
          <strong>{questionIndex + 1}<i>/</i>{questions.length}</strong>
        </div>
        <div className={`timer${timeLeft <= 8 ? ' timer--urgent' : ''}`}>
          <span className="game-label">TIME LEFT</span>
          <strong aria-live="polite">00:{String(timeLeft).padStart(2, '0')}</strong>
        </div>
      </header>

      <div className="game-settings">
        <button
          className="settings-trigger"
          type="button"
          aria-expanded={settingsOpen}
          aria-controls="game-climbing-settings"
          onClick={() => setSettingsOpen((open) => !open)}
        >
          <span aria-hidden="true">⚙</span> SETTINGS
        </button>
        {settingsOpen && (
          <div id="game-climbing-settings">
            <ClimbingPositionSettings
              value={climbingPosition}
              onChange={onClimbingPositionChange}
              onClose={() => setSettingsOpen(false)}
            />
          </div>
        )}
      </div>

      <aside className="climb-hud" aria-label="Climb statistics">
        <div className="stat-block">
          <span className="game-label">ACORNS</span>
          <strong className="score-value" key={score}>{score.toLocaleString()}</strong>
        </div>
        <div className="hud-divider" />
        <div className="stat-block">
          <span className="game-label">HEIGHT</span>
          <strong>{Math.floor(climbHeight / 12)}<small> m</small></strong>
        </div>
        <div
          className="height-meter"
          role="progressbar"
          aria-label="Climbing progress"
          aria-valuenow={Math.min(100, Math.round((climbHeight / 1000) * 100))}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span style={{ height: `${Math.min(100, (climbHeight / 1000) * 100)}%` }} />
        </div>
      </aside>

      <section className="question-panel" aria-live="polite">
        <div className="question-panel__top">
          <span className="question-kicker"><span /> {question.category.toUpperCase()} · QUESTION {String(questionIndex + 1).padStart(2, '0')}</span>
          <span className="question-date">{dateLabel}</span>
        </div>
        <h1 className="question-text">{question.question}</h1>
        <p className="question-note">{question.note}</p>

        {!outcome ? (
          <form className="answer-form" onSubmit={submitAnswer}>
            <label htmlFor="trivia-answer">YOUR ANSWER</label>
            <div className="answer-input-wrap">
              <input
                ref={inputRef}
                id="trivia-answer"
                value={response}
                onChange={(event) => {
                  setResponse(event.target.value);
                  setAnswerError('');
                }}
                placeholder="Type your best guess..."
                autoComplete="off"
                maxLength={100}
              />
              <button className="submit-button" type="submit" disabled={!response.trim()}>
                LOCK IN <span aria-hidden="true">↗</span>
              </button>
            </div>
            <p className="answer-hint">LESS OBVIOUS ANSWERS CLIMB HIGHER.</p>
            {answerError && <p className="answer-error" role="alert">{answerError}</p>}
          </form>
        ) : (
          <div className={`answer-feedback${outcome.correct ? ' answer-feedback--correct' : ' answer-feedback--missed'}`}>
            <p className="feedback-title">
              {outcome.timedOut ? 'TIME RAN OUT!' : 'ANSWER LOCKED IN!'}
              {outcome.correct && <span className="feedback-points">+{outcome.points} ACORNS</span>}
            </p>
            {outcome.correct && (
              <p className="rarity-badge">
                <span>{outcome.rarity} FIND</span>
                <strong>{outcome.response}</strong>
              </p>
            )}
            {outcome.timedOut && (
              <p className="feedback-answer">
                No answer this time — the forest is full of possibilities.
              </p>
            )}
            <p className="feedback-explanation">
              {outcome.correct ? outcome.reaction : question.note}
            </p>
            <button className="continue-button" type="button" onClick={continueGame}>
              {questionIndex === questions.length - 1 ? 'SEE YOUR RESULTS' : 'CLIMB ON'}
              <span aria-hidden="true"> →</span>
            </button>
          </div>
        )}
      </section>

      <footer className="game-footer">
        <span>ONE TREE. SEVEN QUESTIONS. KEEP CLIMBING.</span>
        <span>DAILY SET &nbsp;·&nbsp; {dateLabel}</span>
      </footer>
    </main>
  );
}
