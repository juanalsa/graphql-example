const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    trainers(last: Int): [Trainer!]!
    pokemons(last: Int): [Pokemon!]!
  }

  type Mutation {
      createTrainer(name: String!, age: Int!): Trainer!
      updateTrainer(id: ID!, name: String!, age: Int!): Trainer! 
      deleteTrainer(id: ID!): Trainer!
  }

  type Subscription {
      newTrainer: Trainer!
  }

  type Pokemon {
      name: String!
      height: Float!
  }

  type Trainer {
      id: ID!
      name: String!
      age: Int!
      pokemons: [Pokemon!]!
  }
`);

// Define your data set
const trainers = [
  {
    id: 1,
    name: "Ash Ketchum",
    age: 15,
    pokemons: [
      {
        name: "Pikachu",
        height: 0.2,
      },
      {
        name: "Bulbasur",
        height: 0.5,
      },
      {
        name: "Charizard",
        height: 1.5,
      },
    ],
  },
];

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => "Hello world!",
  trainers: () => trainers,
};

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log("Now browse to http://localhost:4000/graphql")
);
