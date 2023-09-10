const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];


const bookResolvers = {
    Query: {
        getBooks: () => books,
        getBook: (_, { title }) => books.find((book) => book.title === title)
    }
};

export default bookResolvers