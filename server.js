const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = 3113;

console.log('MONGO_URI:', process.env.MONGO_URI);

app.use(express.static('Public'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// Define User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [{ 
    title: String,
    imageUrl: String,
    price: String,
    quantity: Number
  }]
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/home', (req, res) => {
  console.log('GET http://localhost:3113/home');
  res.sendFile(__dirname + '/Public/home.html');
});

app.get('/products', (req, res) => {
  console.log('GET http://localhost:3113/products');
  res.sendFile(__dirname + '/Public/Product.html');
});

app.post('/signup', async (req, res) => {
  console.log('POST /signup');
  console.log('Request body:', req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('Hashed password:', hashedPassword);

      const newUser = new User({ name, email, password: hashedPassword });
      const result = await newUser.save();
      console.log('User saved:', result);

      // Respond with success and userId
      res.status(201).json({ success: true, userId: result._id });
  } catch (error) {
      console.error('Error creating account:', error);
      res.status(400).json({ success: false, message: 'Error creating account: ' + error.message });
  }
});

app.post('/login', async (req, res) => {
  console.log('POST /login');
  console.log('Request body:', req.body);

  const { email, password } = req.body;

  if (!email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
          console.log('Invalid credentials');
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      console.log('User found:', user);

      // Respond with success and userId
      res.json({ success: true, userId: user._id });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ success: false, message: 'Error logging in: ' + error.message });
  }
});

// Handle adding products to the cart
app.post('/add-to-cart', async (req, res) => {
  const { title, imageUrl, price, quantity, userId } = req.body;
  
  // Log received data to check if it is correct
  console.log('Received data:', { title, imageUrl, price, quantity, userId });
  
  if (!userId) {
    return res.status(400).send('Please log in or create an account first.');
  }

  try {
    // Verify the userId and find the user
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found for userId:', userId);
      return res.status(404).send('User not found.');
    }

    // Add product to user's cart
    const product = { title, imageUrl, price, quantity };
    user.cart.push(product);

    // Save the user's cart
    await user.save();

    console.log('Product added to cart:', product);
    res.send('Product added to cart successfully!');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).send('Error adding product to cart.');
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
