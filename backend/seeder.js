import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Create Users Loop (Triggers Encryption Middleware)
    // We cannot use insertMany here because it skips the .pre('save') hook
    const createdUsers = [];
    for (const user of users) {
      const newUser = new User(user);
      const savedUser = await newUser.save(); // .save() runs the encryption!
      createdUsers.push(savedUser);
    }

    // 3. Get the Admin User ID (We need to attach products to the admin)
    const adminUser = createdUsers[0]._id;

    // 4. Map products to the Admin User
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 5. Insert Products
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line argument to run specific function
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}