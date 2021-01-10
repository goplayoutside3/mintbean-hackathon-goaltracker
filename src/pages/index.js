import Head from 'next/head';
import Goal from '../components/Goal'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Goal Tracker</title>
      </Head>
      <h1>Goal Tracker</h1>
      <Goal />
    </div>
  )
}
export default Home;
