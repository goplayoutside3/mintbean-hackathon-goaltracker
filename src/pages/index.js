import { useState, useEffect } from 'react';
import Head from 'next/head';

import NewGoal from '../components/NewGoal';
import GoalPreview from '../components/GoalPreview';
import fire from '../config/fire-config';

import styles from '../styles/components/home.module.scss';

const Home = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection('goals')
      .onSnapshot((snap) => {
        const goals = snap.docs.map((goal) => ({
          id: goal.id,
          ...goal.data(),
        }));
        setGoals(goals);
      });
  }, []);

  return (
    <main className={styles.main}>
      <Head>
        <title>Goal Tracker</title>
      </Head>
      <h1>Goal Tracker</h1>
      <NewGoal />
      {goals && goals.length && (
        <ul>
          {goals.map((goal) => (
            <GoalPreview goal={goal} />
          ))}
        </ul>
      )}
    </main>
  );
};
export default Home;
