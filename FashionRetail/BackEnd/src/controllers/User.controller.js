const express = require('express');
const Users=express.Router();

const cors = require('cors'); //sharing resources
const jwt = require('jsonwebtoken'); // secure transfer data
const bcrypt = require('bcrypt'); //password storing as # Val

const User =require('../models/User.model');
Users.use(cors());
process.env.SECRET_KEY = 'secret';


//insert
exports.create = async function(limit = 10) {
    try {
        const today = new Date();
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
   created: today
    };

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const hash = await bcrypt.hash(req.body.password, 10);
      userData.password = hash;
      const newUser = await User.create(userData);
      res.json({ status: newUser.email + " registered" });
    } else {
      res.json({ error: "User already registered", registered: true });
    }
    } catch (error) {
      // res.status(500).json({ error: 'Error retrieving movies' });
      return Promise.reject(error);
    }
  }

  Users.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 1000 });
          res.send({success: true, token});
        } else {
          res.json({ success: false, error: "Incorrect password" });
        }
      } else {
        res.json({ success: false, error: "User does not exist in the system" });
      }
    } catch (err) {
      res.send("error" + err);
    }
  });

  Users.get('/profile', async (req, res) => {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        res.send("Invalid User");
        return;
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ _id: decoded._id });
  
      if (user) {
        res.json(user);
      } else {
        res.send("Invalid User");
      }
    } catch (err) {
      res.send("Error" + err);
    }
  });

  //read
Users.route('/').get(async function (req, res) {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch (err){
        console.log(err);
    }
  })

  //delete
Users.route('/delete/:id').get(async (req, res) => {
    try {
      const users = await User.findByIdAndRemove({ _id: req.params.id });
      if (users) {
        res.json('Successfully removed');
      } else {
        res.json('Users not found');
      }
    } catch (err) {
      res.json(err);
    }
  });

  // Update 
Users.route('/update/:id').put(async (req, res) => {
    try {
      const users = await User.findById(req.params.id);
  
      if (!users) {
        return res.status(404).json({ error: 'User not found' });
      }
  
     
  
      users.first_name = req.body.first_name,
        users.last_name = req.body.last_name,
        users.email = req.body.email,
       users.password =req.body.password,
  
      await users.save();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //count
Users.route('/get/count').get(async function (req, res) {
    try {
      const count = await User.countDocuments();
      res.json(count);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
    });
  

    module.exports = Users;
