const mongoose = require('mongoose');

Main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

async function Main() {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
    });


    const bookSchema = new mongoose.Schema(
        {
            title: { type: String, required: true },
            author: { type: String },
            price: { type: Number },
        });

    const Book = mongoose.model('Book', bookSchema);

    const book1 = new Book(
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 10.99,
        });
    await book1.save();

    //checking required field
    // const book2 = new Book(
    //     {
    //         title: '',
    //         author: 'ryryryrryry',
    //         price: 29.00,
    //     });
    // await book2.save();

    Book.insertMany([
        { title: "1984", author: "George Orwell", price: 8.99 },
        { title: "To Kill a Mockingbird", author: "Harper Lee", price: 7.99 },
    ]);
}

