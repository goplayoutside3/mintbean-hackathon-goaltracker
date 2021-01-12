import { useState, useEffect } from 'react';
import Link from 'next/link';
import fire from '../config/fire-config';
import styles from '../styles/components/goal-preview.module.scss';

const GoalPreview = ({ goal, index }) => {
  const handleDelete = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection('goals')
      .doc(goal.id)
      .delete()
      .then(() => {
        console.log('successfully deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <li key={goal.id} className={styles.goal}>
      <div className={styles['title-cont']}>
        <span className={styles.number}>{index + 1}.</span>
        {goal.title && (
          <Link href="/goal/[id]" as={`/goal/${goal.id}`}>
            {goal.title}
          </Link>
        )}
      </div>
      <div className={styles['btn-cont']}>
        <button className={styles.delete} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default GoalPreview;
