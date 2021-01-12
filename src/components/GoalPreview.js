import { useState, useEffect } from 'react';
import Link from 'next/link';
import fire from '../config/fire-config';
import styles from '../styles/components/goal-preview.module.scss';

const GoalPreview = ({ goal }) => {
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
    <li key={goal.id}>
      {goal.title && (
        <Link href="/goal/[id]" as={`/goal/${goal.id}`}>
          {goal.title}
        </Link>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default GoalPreview;
