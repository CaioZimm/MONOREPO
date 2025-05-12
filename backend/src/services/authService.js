const authRepository = require('../repositories/authRepository')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.registerUser = async (name, email, password, confirmPassword) => {

    if(password !== confirmPassword){
        throw new Error('As senhas não estão iguais.');
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        throw new Error('Este e-mail já está sendo usado');
    }
    
    const passwordCrypt = await bcrypt.hash(password, 10)
    const newUser = {
        name,
        email,
        password: passwordCrypt
    }

    return await authRepository.register(newUser);
}

exports.loginUser = async (email, password) => {
    const user = await authRepository.login(email);
    if(!user) {
        throw new Error("Credenciais incorretas");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        throw new Error("Credenciais incorretas");
    }

    return user;
}