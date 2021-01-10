import Head from 'next/head';
import { useState, useEffect } from 'react';
import Goal from '../components/Goal'
import fire from '../config/fire-config'

const Home = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    fire.firestore().collection('goals').onSnapshot(snap => {
      const goals = snap.docs.map(goal => ({
        id: goal.id,
        ...goal.data()
      }))
      setGoals(goals)
    })

  }, [])

  console.log(goals)
  return (
    <div>
      <Head>
        <title>Goal Tracker</title>
      </Head>
      <h1>Goal Tracker</h1>
      <Goal />
      {goals && goals.length && (
        <ul>{goals.map(goal => (
          <li key={goal.id}>{goal.title}</li>
        ))}</ul>
      )}
    </div>
  )
}
export default Home;
