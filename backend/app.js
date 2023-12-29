const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://shampo:1Vzhy95PsrCD2rNr@cluster0.hbkxlkm.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a MongoDB model (replace 'Email' with your desired model name)
const Email = mongoose.model('Email', { email: String });
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to handle email submissions
app.post('/submit-email', async (req, res) => {
  try {
    const { email } = req.body;
    // Save email to MongoDB
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(200).json({ message: 'Email saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
