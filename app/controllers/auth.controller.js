const db = require("../models");
const User = db.user;

var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Enter all the values",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(401)
        .send({ success: false, message: "Already a user, try login?" });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPass });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};
