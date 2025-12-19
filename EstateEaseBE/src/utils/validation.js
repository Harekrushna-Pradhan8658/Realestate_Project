const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName){
    throw new Error("Name is not valid");
  }
  else if (!validator.isEmail(emailId)){
    throw new Error ("Email is not valid");
  }
  else if (!validator.isStrongPassword(password)){
    throw new Error ("Enter a strong password");
  }
};

const validateEmail = (req) => {
  const { emailId } =req.body;

  for (const char of emailId){
    if (char != char.toLowerCase()) {
      throw new Error("You can't use uppercase latter in email");
    }
  }
};

const validatateEditProfileData = (req) => {
  const allowEditFields = [
    "firstName",
    "lastName",
    "password",
    "emailId",
    "avatar",
  ];

  const isEditAllowed = Object.keys(req.body).every(field => allowEditFields.includes(field));
  // console.log(isEditAllowed);

  return isEditAllowed;

};

module.exports = {
  validateSignUpData,
  validateEmail,
  validatateEditProfileData,
}