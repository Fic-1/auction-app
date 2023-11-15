const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
// const Product = require('../../models/productsModel');
const User = require('../models/usersModel');
// const Bid = require('../../models/bidsModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

// const bids = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const usersFilePath = `${__dirname}/users2.json`;
console.log('File Content:', fs.readFileSync(usersFilePath, 'utf-8'));
const dataFile = fs.readFileSync(usersFilePath, 'utf-8');

const users = JSON.parse(dataFile);
// const products = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
// ); //Radimo objekt iz JSON-a

//IMPORT DATA INTO DATABASE

const importData = async () => {
  try {
    // await Bid.create(bids);
    await User.create(users, { validateBeforeSave: false });
    // await Products.create(products);
    console.log('Data successfuly loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//Delete all data from collection
const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    console.log('Data successfuly deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();

// console.log(process.argv);
