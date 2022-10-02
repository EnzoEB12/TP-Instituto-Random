import jwt from "jsonwebtoken"

const generar_jwt = (id = '') => {
    
    return new Promise ( (resolve, reject) => {

        //identificar al usuario
        const payload = {
            id
        };
        
       jwt.sign(payload, process.env.jwtSecret, (err, token) => {
             
        if(err){
            reject('ERROR al general el token')
        }

        resolve(token)
       });
    });
};

export default generar_jwt
