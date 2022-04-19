import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const body = req.body;
  const client = await clientPromise;
  const database = client.db('sample_mflix');
  const coll = database.collection('movies');

  let results = [];

  console.log('search_string: ', body.search_string);

  const agg = [
    { $search: { autocomplete: { query: body.search_string, path: 'title' } } },
    { $limit: 50 },
    { $project: { _id: 1, title: 1 } },
  ];

  const result = await coll.aggregate(agg);

  await result.forEach((doc) => results.push(doc));

  res.json({ data: results });
}
