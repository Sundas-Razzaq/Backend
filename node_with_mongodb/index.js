const mongoose = require('mongoose');

Main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

async function Main() {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
    });

    //creating a schema
    // const userSchema = new mongoose.Schema({
    //     name: String,
    //     email: String,
    //     age: Number,
    // });

    //creating a model
    // const User = mongoose.model('User', userSchema);
    // const Employee = mongoose.model('Employee', userSchema);

    // INSERT DOCUMENTS (THIS CREATES COLLECTIONS)
    //method 1
    // const user1 = new User(
    //     {
    //         name: 'Alice',
    //         email: 'alice@example.com',
    //         age: 30,
    //     }
    // )
    // user1.save();

    //to insert multiple documents
    // User.insertMany([
    //     { name: "tony", email: "ton@gmail.com", age: 23 },
    //     { name: "steve", email: "steve@gmail.com", age: 28 },
    //     { name: "bruce", email: "bruce@gmail.com", age: 35 },
    // ]);
    //method 2
    // await User.create({
    //     name: 'Test User',
    //     email: 'test@example.com',
    //     age: 20
    // });

    // await Employee.create({
    //     name: 'Test Employee',
    //     email: 'emp@example.com',
    //     age: 25
    // });

    //   mongoose.connection.close();

    //finding documents
    // User.find({ age: { $gt: 30 } }).then(users => {
    //     console.log('All Users:', users);
    // }).catch(err => {
    //     console.error('Error fetching users:', err);
    // });

    //method 2 to find documents
    // User.findOne({ name: 'tony' }).then(user => {
    //     console.log('Found User:', user);
    // })

    //method 3 to find documents 
    // User.findById('696a2adb1b342e55d82950de').then(user => {
    //     console.log('Found User by ID:', user);
    // });

    User.findByIdAndUpdate('696a2adb1b342e55d82950df', { age: 35 }).then(result => {
        console.log('Update Result:', result);
    }).catch(err => {
        console.error('Error updating user:', err);
    });

    User.deleteOne({ name: 'steve' }).then(result => {
        console.log('Delete Result:', result);
    }).catch(err => {
        console.error('Error deleting user:', err);
    });
}