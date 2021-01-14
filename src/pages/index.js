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
  const [sortByStatus, setSortStatus] = useState('all');

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
    // first filter by search term for name
    const filteredList = fetchedGoals.filter((goal) => {
      return goal.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    let newlySorted;

    // sort by status
    if (sortByStatus === 'all') newlySorted = filteredList;
    else {
      newlySorted = filteredList.filter((goal) => goal.status === sortByStatus);
    }

    // filter for tags
    if (!filterExercise && !filterCoding && !filterCooking) {
      setDisplayedGoals(newlySorted);
      return;
    } else {
      const tagFilteredList = newlySorted
        .filter((goal) => goal.taggedExercise === filterExercise)
        .filter((goal) => goal.taggedCoding === filterCoding)
        .filter((goal) => goal.taggedCooking === filterCooking);
      setDisplayedGoals(tagFilteredList);
    }
  }, [filterExercise, filterCoding, filterCooking, searchTerm, sortByStatus]);

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
            <label className={styles['search-label']}>Search Name:</label>
            <input
              type="text"
              className={styles['search-input']}
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e)}
            />
          </div>
          <div className={styles['tags-cont']}>
            Filter:
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

          <div className={styles['status-cont']}>
            Sort:
            <button
              className={classes(styles.status, {
                [styles.active]: sortByStatus === 'all',
              })}
              onClick={(e) => setSortStatus(e.target.value)}
              value="all"
            >
              All
            </button>
            <button
              className={classes(styles.status, {
                [styles.active]: sortByStatus === 'paused',
              })}
              onClick={(e) => setSortStatus(e.target.value)}
              value="paused"
            >
              Paused
            </button>
            <button
              className={classes(styles.status, {
                [styles.active]: sortByStatus === 'progress',
              })}
              onClick={(e) => setSortStatus(e.target.value)}
              value="progress"
            >
              In Progress
            </button>
            <button
              className={classes(styles.status, {
                [styles.active]: sortByStatus === 'complete',
              })}
              onClick={(e) => setSortStatus(e.target.value)}
              value="complete"
            >
              Complete
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
