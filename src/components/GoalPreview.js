import Link from 'next/link';
import fire from '../config/fire-config';
import styles from '../styles/components/goal-preview.module.scss';
import classes from 'classnames';

const GoalPreview = ({ goal, index }) => {
  const handleDelete = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection('goals')
      .doc(goal.id)
      .delete()
      .then(() => {
        // do something?
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatus = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection('goals')
      .doc(goal.id)
      .update({
        status: e.target.value,
      })
      .then(() => {
        // do something?
      })
      .catch((error) => console.log(error));
  };

  return (
    <li key={goal.id} className={styles.goal}>
      <div className={styles['tags-cont']}>
        <div
          className={classes(styles.tag, styles.exercise, {
            [styles.tagged]: goal.taggedExercise,
          })}
        >
          #exercise
        </div>

        <div
          className={classes(styles.tag, styles.coding, {
            [styles.tagged]: goal.taggedCoding,
          })}
        >
          #coding
        </div>

        <div
          className={classes(styles.tag, styles.cooking, {
            [styles.tagged]: goal.taggedCooking,
          })}
        >
          #cooking
        </div>

      </div>
      <div className={styles['title-cont']}>
        <span className={styles.number}>{index + 1}.</span>
        {goal.title && (
          <Link href="/goal/[id]" as={`/goal/${goal.id}`}>
            <a className={styles.title}>{goal.title}</a>
          </Link>
        )}
      </div>
      <div className={styles['status-cont']}>
        <button
          className={classes(styles.status, {
            [styles.active]: goal.status === 'paused',
          })}
          onClick={(e) => handleStatus(e)}
          value="paused"
        >
          Paused
        </button>
        <button
          className={classes(styles.status, {
            [styles.active]: goal.status === 'progress',
          })}
          onClick={(e) => handleStatus(e)}
          value="progress"
        >
          In Progress
        </button>
        <button
          className={classes(styles.status, {
            [styles.active]: goal.status === 'complete',
          })}
          onClick={(e) => handleStatus(e)}
          value="complete"
        >
          Complete
        </button>
        <button className={styles.delete} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default GoalPreview;
