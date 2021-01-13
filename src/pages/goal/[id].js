import fire from '../../config/fire-config';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/goal-id.module.scss';
import { useState } from 'react';
import classes from 'classnames';

const SingleGoal = ({
  title = '',
  content = '',
  goalId,
  status = 'paused',
  taggedExercise = false,
  taggedCooking = false,
  taggedCoding = false,
}) => {
  const router = useRouter();

  const [goalTitle, setTitle] = useState(title);
  const [goalContent, setContent] = useState(content);
  const [goalStatus, setStatus] = useState(status);
  const [goalTaggedExercise, setTaggedExercise] = useState(taggedExercise);
  const [goalTaggedCoding, setTaggedCoding] = useState(taggedCoding);
  const [goalTaggedCooking, setTaggedCooking] = useState(taggedCooking);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingContent, setEditingContent] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection('goals')
      .doc(goalId)
      .delete()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveTitle = () => {
    if (!goalTitle.length) return;

    fire
      .firestore()
      .collection('goals')
      .doc(goalId)
      .update({
        title: goalTitle,
      })
      .then(() => {
        setEditingTitle(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSaveContent = () => {
    if (!goalContent.length) return;

    fire
      .firestore()
      .collection('goals')
      .doc(goalId)
      .update({
        content: goalContent,
      })
      .then(() => {
        setEditingContent(false);
      })
      .catch((error) => console.log(error));
  };

  const handleStatus = (e) => {
    e.preventDefault();

    fire
      .firestore()
      .collection('goals')
      .doc(goalId)
      .update({
        status: e.target.value,
      })
      .then(() => {
        setStatus(e.target.value);
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="main">
      <Head>
        <title>{title}</title>
      </Head>
      <Link href="/">
        <a className={styles.back}>Back to List</a>
      </Link>
      <div className={styles['title-cont']}>
        {editingTitle ? (
          <div className={styles.field}>
            <input
              className={styles['text-input']}
              type="text"
              value={goalTitle}
              onChange={({ target }) => setTitle(target.value)}
            />
            <button onClick={handleSaveTitle}>Save</button>
          </div>
        ) : (
          <div>
            <button
              className={styles.edit}
              onClick={() => setEditingTitle(true)}
            >
              <img className={styles['edit-icon']} src="/edit-icon.svg" />
            </button>
            <h1 className={styles.title}>{goalTitle}</h1>
          </div>
        )}
      </div>
      {editingContent ? (
        <div className={styles.field}>
          <textarea
            className={styles['text-input']}
            value={goalContent}
            onChange={({ target }) => setContent(target.value)}
          />
          <button onClick={handleSaveContent}>Save</button>
        </div>
      ) : (
        <div>
          <button
            className={styles.edit}
            onClick={() => setEditingContent(true)}
          >
            <img className={styles['edit-icon']} src="/edit-icon.svg" />
          </button>
          <p>{goalContent}</p>
        </div>
      )}

      <h2 className="h2">Tags</h2>
      <div className={styles['tags-cont']}>
        <div
          className={classes(styles.tag, {
            [styles.tagged]: goalTaggedExercise,
          })}
        >
          <span>#exercise</span>
          <button className={styles.close}>
            <img src="/close.svg" />
          </button>
        </div>

        <div
          className={classes(styles.tag, {
            [styles.tagged]: goalTaggedCoding,
          })}
        >
          <span>#coding</span>
          <button className={styles.close}>
            <img src="/close.svg" />
          </button>
        </div>

        <div
          className={classes(styles.tag, {
            [styles.tagged]: goalTaggedCooking,
          })}
        >
          <span>#cooking</span>
          <button className={styles.close}>
            <img src="/close.svg" />
          </button>
        </div>
      </div>

      <h2 className="h2">Status</h2>
      <div className={styles['status-cont']}>
        <button
          className={classes(styles.status, {
            [styles.active]: goalStatus === 'paused',
          })}
          onClick={(e) => handleStatus(e)}
          value="paused"
        >
          Paused
        </button>
        <button
          className={classes(styles.status, {
            [styles.active]: goalStatus === 'progress',
          })}
          onClick={(e) => handleStatus(e)}
          value="progress"
        >
          In Progress
        </button>
        <button
          className={classes(styles.status, {
            [styles.active]: goalStatus === 'complete',
          })}
          onClick={(e) => handleStatus(e)}
          value="complete"
        >
          Complete
        </button>
        <button className={styles.delete} onClick={(e) => handleDelete(e)}>
          Delete This Goal
        </button>
      </div>
    </main>
  );
};

export const getServerSideProps = async ({ query }) => {
  const goal = {};

  await fire
    .firestore()
    .collection('goals')
    .doc(query.id)
    .get()
    .then((result) => {
      goal['title'] = result.data().title;
      goal['content'] = result.data().content;
      goal['status'] = result.data().status;
      goal['taggedExercise'] = result.data().taggedExercise;
      goal['taggedCoding'] = result.data().taggedCoding;
      goal['taggedCooking'] = result.data().taggedCooking;
    });

  return {
    props: {
      title: goal.title,
      content: goal.content,
      goalId: query.id,
      status: goal.status,
      taggedExercise: goal.taggedExercise,
      taggedCoding: goal.taggedCoding,
      taggedCooking: goal.taggedCooking,
    },
  };
};

export default SingleGoal;
