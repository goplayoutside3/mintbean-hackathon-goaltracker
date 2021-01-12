import { useState, useEffect } from 'react';
import Head from 'next/head';

import NewGoal from '../components/NewGoal';
import GoalPreview from '../components/GoalPreview';
import fire from '../config/fire-config';

import styles from '../styles/pages/home.module.scss';

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
    <main className="main">
      <Head>
        <title>Goal Tracker</title>
        <link
          rel="shortcut icon" type="image/x-icon" href="/favicon2.svg"
        ></link>
        <link
          rel="shortcut icon" type="image/x-icon" href="/favicon2.ico"
        ></link>
      </Head>

      <h1 className={styles.title}>Goal Tracker</h1>
      <div className={styles.container}>
        <NewGoal />
        <div className={styles['list-cont']}>
          <h2 className="h2">Current Goals</h2>
          {goals && goals.length && (
            <ol type="1" className={styles.list}>
              {goals.map((goal, index) => (
                <GoalPreview key={goal.id} goal={goal} index={index} />
              ))}
            </ol>
          )}
        </div>
      </div>
    </main>
  );
};
export default Home;
