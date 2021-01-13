import React, { useState } from 'react';
import fire from '../config/fire-config';
import styles from '../styles/components/new-goal.module.scss';

const NewGoal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [taggedExercise, setTaggedExercise] = useState(false);
  const [taggedCoding, setTaggedCoding] = useState(false);
  const [taggedCooking, setTaggedCooking] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore().collection('goals').add({
      title: title,
      content: content,
      status: 'paused',
      taggedExercise,
      taggedCoding,
      taggedCooking,
    });

    setTitle('');
    setContent('');
    setTaggedCooking(false);
    setTaggedExercise(false);
    setTaggedCoding(false);
  };

  const handleCheckboxChange = (e) => {
    const name = e.target.name;

    if (name === 'exercise') setTaggedExercise(!taggedExercise);
    else if (name === 'coding') setTaggedCoding(!taggedCoding);
    else if (name === 'cooking') setTaggedCooking(!taggedCooking);
  };

  return (
    <div className={styles.container}>
      <h2 className="h2">Add a New Goal</h2>
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

        <div className={styles['tags-cont']}>
          <div className={styles.tag}>
            <input
              className={styles.check}
              name="exercise"
              type="checkbox"
              checked={taggedExercise}
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label>#exercise</label>
          </div>
          <div className={styles.tag}>
            <input
              className={styles.check}
              name="coding"
              type="checkbox"
              checked={taggedCoding}
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label>#coding</label>
          </div>
          <div className={styles.tag}>
            <input
              className={styles.check}
              name="cooking"
              type="checkbox"
              checked={taggedCooking}
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label>#cooking</label>
          </div>
        </div>
        <button type="submit" className={styles.save}>Save</button>
      </form>
    </div>
  );
};

export default NewGoal;
