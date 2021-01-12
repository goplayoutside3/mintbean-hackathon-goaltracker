import fire from '../../config/fire-config';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/goal-id.module.scss';
import { useState } from 'react';

const SingleGoal = ({ title = '', content = '', goalId }) => {
  const router = useRouter();

  const [goalTitle, setTitle] = useState(title);
  const [goalContent, setContent] = useState(content);
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
        console.log('successfully deleted');
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
            <h1 className={styles.title}>{title}</h1>
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
          <p>{content}</p>
        </div>
      )}
      <button onClick={(e) => handleDelete(e)}>Delete This Goal</button>
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
    });

  return {
    props: {
      title: goal.title,
      content: goal.content,
      goalId: query.id,
    },
  };
};

export default SingleGoal;
