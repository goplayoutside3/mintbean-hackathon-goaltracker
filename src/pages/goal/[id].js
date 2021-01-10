import { useState, useEffect } from 'react';
import fire from '../../config/fire-config';

const SingleGoal = ({ goalId }) => {
  const [goalData, setGoalData] = useState(null);

  useEffect(() => {
    fire
      .firestore()
      .collection('goals')
      .doc(goalId)
      .get()
      .then((goal) => {
        setGoalData(goal.data());
      });
  }, []);

  return (
    <div>
      {goalData.title && <h1>{goalData.title}</h1>}
      {goalData.content && <p>{goalData.content}</p>}
    </div>
  );
};

SingleGoal.getInitialProps = ({ query }) => {
  return {
    goalId: query.id,
  };
};

export default SingleGoal;
