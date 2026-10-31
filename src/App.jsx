import { useEffect, useMemo, useState } from 'react';
import IntroScreen from './components/IntroScreen.jsx';
import TriviaGame from './components/TriviaGame.jsx';
import { getDailyQuestions, getTodayDate } from './data/questions.js';

const CLIMBING_POSITION_KEY = 'branching-out-climbing-position';
const validPositions = ['left', 'center', 'right'];

function getSavedClimbingPosition() {
  const savedPosition = window.localStorage.getItem(CLIMBING_POSITION_KEY);
  return validPositions.includes(savedPosition) ? savedPosition : 'center';
}

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [today, setToday] = useState(getTodayDate);
  const [climbingPosition, setClimbingPosition] = useState(getSavedClimbingPosition);
  const dailyQuestions = useMemo(() => getDailyQuestions(today), [today]);
  const dateLabel = new Date(`${today}T12:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
  }).toUpperCase();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const currentDate = getTodayDate();
      setToday((previousDate) => (previousDate === currentDate ? previousDate : currentDate));
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CLIMBING_POSITION_KEY, climbingPosition);
  }, [climbingPosition]);

  if (screen === 'game') {
    return (
      <TriviaGame
        key={today}
        questions={dailyQuestions}
        dateLabel={dateLabel}
        climbingPosition={climbingPosition}
        onClimbingPositionChange={setClimbingPosition}
        onMainMenu={() => setScreen('intro')}
      />
    );
  }

  return (
    <IntroScreen
      dateLabel={dateLabel}
      climbingPosition={climbingPosition}
      onClimbingPositionChange={setClimbingPosition}
      onBegin={() => setScreen('game')}
    />
  );
}
