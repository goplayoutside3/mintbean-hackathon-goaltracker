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
      .add({ title: title, content: content });

    setTitle('');
    setContent('');
    setNotification('Goal Created');

    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <div>
      <h2 className="h2">Add Goal</h2>

      {notification}

      <form onSubmit={handleSubmit}>
        <div>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Content
          <br />
          <textarea
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
