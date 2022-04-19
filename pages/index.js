import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import clientPromise from '../lib/mongodb';

function Welcome({ isConnected }) {
  return (
    <>
      <h1 className={styles.title}>
        <Link href="https://www.mongodb.com/atlas/search">
          <a>MongoDB Atlas Search</a>
        </Link>{' '}
        + NextJS
      </h1>
      {isConnected ? (
        <h2 className={styles.h2}>
          We are connected to{' '}
          <Link href="https://www.mongodb.com/atlas/search">
            <a>MongoDB</a>
          </Link>{' '}
        </h2>
      ) : (
        <h2 className="subtitle">
          There was an issue connecting to MongoDB. Check <code>README.md</code> for instructions.
        </h2>
      )}
      <p className={styles.description}>
        Get started by looking at <code className={styles.code}>pages/index.js</code>
      </p>
    </>
  );
}

function SearchForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search_string">Enter a Movie Name</label>
      <input type="text" id="search_string" name="search_string" required />
      <button type="submit">Submit</button>
    </form>
  );
}

function ResultTitle({ title }) {
  return (
    <>
      <p>{title}</p>
    </>
  );
}

function Result({ title }) {
  return <ResultTitle title={title}></ResultTitle>;
}

function Results({ results }) {
  if (!results) {
    return 'Nothing yet.  Have you searched for anything?';
  } else if (results.length == 0) {
    return 'Nothing found.';
  } else {
    return results.map((result) => <Result title={result.title} key={result._id}></Result>);
  }
}

async function getSearchResults(search_string) {
  const data = {
    search_string: search_string,
  };

  const jsonData = JSON.stringify(data);

  const response = await fetch('api/movies', {
    body: jsonData,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const result = await response.json();

  return result.data;
}

export default function AtlasSearchPage({ isConnected }) {
  const [results, setResults] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let search_string = event.target.search_string.value;
    const search_results = await getSearchResults(search_string);

    setResults(search_results);
  };

  return (
    <div className="container">
      <Head>
        <title>MongoDB Atlas x NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Welcome isConnected={isConnected}></Welcome>
      <SearchForm handleSubmit={handleSubmit}></SearchForm>
      <Results results={results}></Results>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
