import bookResolvers from './resolver/bookResolver';
import userResolver from './resolver/userResolver';
export default {
    Query: {
        ...bookResolvers.Query,
        ...userResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
};
