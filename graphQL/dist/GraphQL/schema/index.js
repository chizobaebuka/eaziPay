const typeDefs = `#graphql
    type Book {
        title: String
        author: String
    }

    type User {
        id: ID
        name: String
        email: String
        age: Int
        gender: String
        password:String
    }

    input userInput {
        name: String!
        email: String!
        age: Int!
        gender: String!
        password: String!
    }

    type Query {
        getBooks: [Book]
        getBook(title: String!): Book
        getUsers: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        createUser(input: userInput): User
    }
`;
export default typeDefs;
