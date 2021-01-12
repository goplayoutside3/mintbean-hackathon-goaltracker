import fire from '../../config/fire-config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/pages/goal-id.module.scss';

const SingleGoal = ({ title = '', content = '', goalId }) => {
  const router = useRouter();

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

  return (
    <main className={styles.main}>
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={(e) => handleDelete(e)}>Delete This Goal</button>
      <Link href="/">
        <a>Back</a>
      </Link>
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
