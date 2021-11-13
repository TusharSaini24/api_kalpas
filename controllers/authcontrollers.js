const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registration = async(req,res)=>{

    // let validate the data before we make a user
    // const {error} = Joi.validate(req.body,schema);
    // if(error) return res.status(400).send(error.details[0].message);

    // const {error} = Joi.registerValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    
    // console.log(req.body); 


    // check if email already exist
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist)
    {
       return res.status(400).send("email already exist");
    }

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user : user._id});
    }catch(err){
        res.status(400).send(err);
    }
}

exports.logIn = async(req,res)=>{
      // check if email exist

      const user = await User.findOne({email : req.body.email});
      if(!user)
      {
         return res.status(400).send("email does not exist");
      }

      // if password is correct 

      const validPass = await bcrypt.compare(req.body.password , user.password)
      if(!validPass)
      {
          return res.status(400).send('invalid password');
      }

      // create and assign a token

      const token = jwt.sign({_id: user._id} , process.env.TOKEN_SECRET);

      res.header('auth-token',token).send(token);
      // res.send('logged In');
}