# for create a node.js project
- npm init
- npm i express
- npm i -g nodemon (-g -> global)
  - nodemon src/app.js

# for connect database install mongoose
- npm i mongoose


# git hub
- git add . (for push files inside github)
- fit commit -m "create a express server" (this the commit message)
# Validation data in signup API
- npm i validator

# Install bcrypt - npm i bcrypt
# Install cookie-parser
- npm i cookie-parser

# JWT TOKEN
- npm install jsonwebtoken

# INSTALL CORS FOR FE TO BE CONNECTION
- npm install cors


# EstateEase APIs

- authRouter
  - POST/signup
  - POST/login
  - POST/logout

- profileRouter
  -GET/profile/view
  -GET/profile/edit
  -GET/profile/password   -> forget password API

- userRouter
 - GET/user/feed