import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { adminQuery } from "./modules/admin/graphql/admin.query.js";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "adminGraphQL",
    fields: () => ({
      ...adminQuery,
    }),
  }),
});

export default schema;
