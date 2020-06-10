const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

const UsersService = require('../../../services/users');

passport.use(new BasicStrategy( async (email,password,cb)=>{
    const userServices = new UsersService();
    try{
        const user = await userServices.getUser({ email });
        
        if(!user){
           
            return cb(boom.unauthorized(), false)
        }
        console.log(user);
        
        const contraseñaCorrecta = await bcrypt.compare(password, user.password)
        if(!contraseñaCorrecta){
            return cb(boom.unauthorized("Tu contraseña està mal"), false)
        }

        delete user.password

        return cb(null,user)
    }catch(err){
        
        cb(err)
    }
}))