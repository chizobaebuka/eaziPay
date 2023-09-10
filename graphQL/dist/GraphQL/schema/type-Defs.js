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

    type authPayload{
        token: String!
    }

    input userInput {
        name: String!
        email: String!
        age: Int!
        gender: String!
        password: String!
    }

    input loginUser {
        email: String!
        password: String!
    }

    input updateUser{
        id: ID!
        name: String!
        password: String!
        email: String!
    }

    type Query {
        getBooks: [Book]
        getBook(title: String!): Book
        getUsers: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        createUser(input: userInput): User!
        loginUser(input: loginUser): authPayload!
        updateUser(input: updateUser): User!
    }
`;
export default typeDefs;
