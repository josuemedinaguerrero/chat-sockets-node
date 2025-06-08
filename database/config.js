import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN);
    console.log('DB ONLINE!!!');
  } catch (error) {
    console.log({ ERROR_DBCONNECTION: error });
    throw new Error(error.message);
  }
};
