# Building Web Forms with Next.js + MongoDB Atlas Search

This example shows how you can build forms with Next.js that query MongoDB Atlas.

## How to use

Deploy a MongoDB Atlas cluster with our [quick start guide](https://www.mongodb.com/docs/atlas/getting-started/), and then [deploy an autocomplete search index](https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/).

Make a copy of `.env.local.example` in the project root folder, and name it `.env.local`. Add in your connection string and db name. Your env.local should be in the following format:

```
MONGODB_URI=
```

Run the application locally with `npm run dev`, and deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

To learn more about Atlas Search and aggregation pipelines, [check out our docs](https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/).
