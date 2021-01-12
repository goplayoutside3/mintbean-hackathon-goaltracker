import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import NewGoal from '../components/NewGoal';
import fire from '../config/fire-config';

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
    <div>
      <Head>
        <title>Goal Tracker</title>
      </Head>
      <h1>Goal Tracker</h1>
      <NewGoal />
      {goals && goals.length && (
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <Link href="/goal/[id]" as={`/goal/${goal.id}`}>
                {goal.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Home;
