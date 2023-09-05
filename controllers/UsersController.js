import crypto from 'crypto';
import dbClient from '../utils/db.js';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in the database
    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password using SHA-1
    const sha1Hash = crypto.createHash('sha1').update(password).digest('hex');

    // Create a new user object
    const newUser = {
      email,
      password: sha1Hash, // Store the SHA-1 hash as the password
    };

    // Insert the new user into the database
    const result = await dbClient.db.collection('users').insertOne(newUser);

    // Return the newly created user with only email and id
    const createdUser = {
      email: result.ops[0].email,
      id: result.insertedId,
    };

    return res.status(201).json(createdUser);
  }
}

export default UsersController;
