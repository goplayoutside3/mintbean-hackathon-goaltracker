import { useState, useEffect } from 'react';
import Head from 'next/head';

import NewGoal from '../components/NewGoal';
import GoalPreview from '../components/GoalPreview';
import fire from '../config/fire-config';

import styles from '../styles/pages/home.module.scss';
import classes from 'classnames';

const Home = () => {
  const [fetchedGoals, setFetchedGoals] = useState([]);
  const [displayedGoals, setDisplayedGoals] = useState([]);

  const [filterExercise, setFilterExercise] = useState(false);
  const [filterCoding, setFilterCoding] = useState(false);
  const [filterCooking, setFilterCooking] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    fire
      .firestore()
      .collection('goals')
      .onSnapshot((snap) => {
        const goals = snap.docs.map((goal) => ({
          id: goal.id,
          ...goal.data(),
        }));
        setFetchedGoals(goals);
        setDisplayedGoals(goals);
      });
  };

  useEffect(() => {
    const filteredList = fetchedGoals.filter((goal) => {
      return goal.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (!filterExercise && !filterCoding && !filterCooking) {
      setDisplayedGoals(filteredList);
      return;
    }

    const tagFilteredList = filteredList
      .filter((goal) => goal.taggedExercise === filterExercise)
      .filter((goal) => goal.taggedCoding === filterCoding)
      .filter((goal) => goal.taggedCooking === filterCooking);

    setDisplayedGoals(tagFilteredList);
  }, [filterExercise, filterCoding, filterCooking, searchTerm]);

  const handleSearchTerm = (e) => {
    e.preventDefault();
    const str = e.target.value;
    str.replace(/[^a-zA-Z ]/g, '');
    setSearchTerm(str);
  };

  return (
    <main className="main">
      <Head>
        <title>Goal Tracker</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon2.svg"
        ></link>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon2.ico"
        ></link>
      </Head>

      <h1 className={styles.title}>Daily Goals Tracker</h1>
      <div className={styles.container}>
        <div className={styles.new}>
          <NewGoal />
        </div>
        <div className={styles['list-cont']}>
          <h2 className={classes('h2', styles.current)}>Current Goals</h2>

          <div className={styles.search}>
            <label className={styles['search-label']}>Search by Name:</label>
            <input
              type="text"
              className={styles['search-input']}
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e)}
            />
          </div>
          <div className={styles['tags-cont']}>
            Filter by Tag:
            <button
              className={classes(styles.tag, styles.exercise, {
                [styles.active]: filterExercise,
              })}
              onClick={() => setFilterExercise(!filterExercise)}
            >
              #exercise
            </button>
            <button
              className={classes(styles.tag, styles.coding, {
                [styles.active]: filterCoding,
              })}
              onClick={() => setFilterCoding(!filterCoding)}
            >
              #coding
            </button>
            <button
              className={classes(styles.tag, styles.cooking, {
                [styles.active]: filterCooking,
              })}
              onClick={() => setFilterCooking(!filterCooking)}
            >
              #cooking
            </button>
          </div>

          {displayedGoals && displayedGoals.length && (
            <ol type="1" className={styles.list}>
              {displayedGoals.map((goal, index) => (
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
