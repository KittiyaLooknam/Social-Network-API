const { User, Thought }  = require('../models');
// import the User and Thought model from
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort('_id: -1')
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
  
    // get single user by id
    getSingleUser(req, res) {
      User.findOne({ _id: params.id })
          .select('-__v')
          .populate("friends")
          .populate("thoughts")
          .then((dbUserData) => {
              if (!dbUserData) {
                  return res.status(404).json({ message: 'No user found with this id!'});
              }
              res.json(dbUserData);
          })
          .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
          });
    },

    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(400).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((dbUserData) => {
            if(!dbUserData){
                return res.status(404).json({message: "No user found with this id!"})
            }
            res.json(dbUserData);
        }).catch((err)=> {
            res.status(400).json(err);
        });
    },

    // delete user and associated thoughts and friends
   deleter(req,res) {
        // pull thought from array of users' thoughts
        User.findOneAndDelete({_id: req.params.userId})
        .then((dbUserData) => {
            if  (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this ID!'});
            }
            Thought.deleteMany({username: dbUserData.username}).then(()=>{
               return res.json({message:'User and their thoughts have been deleted.'})
            })
        })
       .catch((err) => {
           console.log(err);
           return res.status(500).json(err);
       });
   },
   
   //  add friend to a user's friend list
   addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidator: true, new: true }
    ).then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
},
// remove friend from the user's friend list
removeFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId} },
    { runValidator:true, new: true }
  )
  .then((dbUserData)=> {
    if(!dbUserData) {
      return res.status(404).json({ message: "No user found with this id!"});
    }
    res.json(dbUserData);
  }).catch((err) => res.status(400).json(err));
}
};

module.exports = userController;
     