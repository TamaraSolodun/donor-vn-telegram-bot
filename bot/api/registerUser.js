const User = require('../Models/User');

const registerUser = async (request, response) => {
    try {
        const { name, surname, password } = request.body;
  
        let user = await User.findOne({ name, surname });
        if (user) {
            return response.status(400).json({ msg: 'User already exists' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        user = new User({
            name,
            surname,
            password: hashedPassword
        });
  
        await user.save();
  
        response.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server Error');
    }
  }

module.exports = { registerUser };
