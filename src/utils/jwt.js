import jwt from 'jsonwebtoken'
const generateToken = (user)=>{
  const {fullName,email,_id} = user;
  return jwt.sign({fullName,email,_id},process.env.SECRET_TOKEN_KEY,{
    expiresIn:process.env.SECRET_TOKEN_EXPIRY
  })
}

const verifyToken = (token)=>{
  return jwt.verify(token,process.env.SECRET_TOKEN_KEY)
}

export {generateToken,verifyToken}