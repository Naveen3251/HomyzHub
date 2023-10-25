import {auth} from 'express-oauth2-jwt-bearer';

//step1 : check
const jwtCheck=auth(
    {
        audience:"http://localhost:8000",
        issuerBaseURL:"https://dev-rq7hhg7f13cj0mrg.us.auth0.com",
        tokenSigningAlg:"RS256"
    }
    
)


export default jwtCheck;