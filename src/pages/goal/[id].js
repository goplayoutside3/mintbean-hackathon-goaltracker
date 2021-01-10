import fire from '../../config/fire-config';
import Link from 'next/link';

const SingleGoal = ({ title = '', content = '' }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
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
    },
  };
};

export default SingleGoal;
