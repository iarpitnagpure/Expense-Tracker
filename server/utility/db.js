import mongoose from 'mongoose'

export const connectToDatabase = () => {
    mongoose.connect(`${process.env.CONNECTION_STRING}ExpenseTrackerDB`)
        .then(() => {
            console.log('Database connection sucessfull');
        })
        .catch(() => {
            console.log('Database connection unsucessfull');
        });
};