import React, { useState } from 'react';
import fire from '../config/fire-config';
import styles from '../styles/components/new-goal.module.scss';

const Goal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fire
      .firestore()
      .collection('goals')
      .add({ title: title, content: content, status: 'paused' });

    setTitle('');
    setContent('');
    setNotification('Goal Created');

    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className="h2">Add a New Goal</h2>

      {notification}

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Title</label>
          <input
            className={styles['text-input']}
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles['text-input']}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Goal;
