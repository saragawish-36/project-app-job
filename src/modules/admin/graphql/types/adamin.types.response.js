import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const ImageType = new GraphQLObjectType({
  name: "Image",
  fields: {
    secure_url: { type: GraphQLString },
    public_id: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      profilePic: { type: ImageType },
      coverPic: { type: ImageType },
    },
  });


  const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: {
      id: { type: GraphQLID },
      companyName: { type: GraphQLString },
      industry: { type: GraphQLString },
      description: { type: GraphQLString },
      logo: { type: ImageType },
      coverPic: { type: ImageType },  
    },
  });

 export const AllType = new GraphQLObjectType({
    name: "AllUsersAndCompanies",
    fields: {
      users: { type: new GraphQLList(UserType) },
      companies: { type: new GraphQLList(CompanyType) },
    },
  });
  