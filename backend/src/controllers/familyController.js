const Family = require('../models/Family');
const User = require('../models/User');
const authService = require('../services/authServices');


exports.create = async (req, res) => {
    const { familyName } = req.body;
    const user = req.user;
    // console.log(user);
    try {
        // Check if user already exists
        // const email = user.email
        // const userExists = await User.findOne({ email });
        if (user.family) {
            return res.status(400).json({ message: 'User has already a family' });
        }

        const newFamily = new Family({ name: familyName, members: [user._id], adminId: user._id });
        await newFamily.save();

        user.family = newFamily._id;
        user.save();
        // Generate JWT token

        res.status(201).json({ message: 'Family created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.invite = async (req, res) => {
   const user = req.user;
   const email = req.body.email;
   console.log(req.body)
   try{
    if(!user.family){
        return res.status(400).json({ message: 'Cannot invite' });
    }
    userInvited = await User.findOne({ email: email});
    if(!userInvited){
        return res.status(400).json({ message: 'User not found' });
    }
    userInvited.invite = user.family
    console.log(userInvited)
    userInvited.save();
    res.status(201).json({ message:  "Invitation sent"});

   }catch(error){
    console.log(error);
    res.status(500).json({ message: 'Server error' });
   }

};

exports.join = async (req, res) => {
    const user = req.user;
    // const family_id = req.body.family;
    const family_id = req.user.invite;


    try{
     if(user.family){
         return res.status(400).json({ message: 'User has already a family' });
     }

     const fam = await Family.findOne({ _id: family_id});
     if (fam){
        fam.members.push(user._id);
        user.family = fam._id;
        user.invite = null; // not tested
        fam.save();
        user.save();
        return res.status(201).json({ message:  `Family ${fam.name} joined`});
     }
     return res.status(400).json({ message: 'Invalid invite' });

    }catch(error){
     console.log(error);
     res.status(500).json({ message: 'Server error' });
    }

 };