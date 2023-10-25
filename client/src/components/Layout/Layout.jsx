import React, { useContext, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

//authentication
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetailContext';
import { useMutation } from 'react-query';
import { createUser } from '../../utils/api.js';

const Layout=()=>{

    const{isAuthenticated,user,getAccessTokenWithPopup}=useAuth0();

    // way to share data across components without having to pass props manually
    //NOTE: in component tree should wrappeed with X.Provider (here X:UserDetailContext) then oly it will works
    const {setUserDetails}=useContext(UserDetailContext);


    //handling mutations:creating, updating, or deleting records on the server.    
    const {mutate}=useMutation(
        {
            mutationKey:[user?.email],
            mutationFn:()=>createUser(user?.email)
        }
    );

    //whenever isAuthenticated status updates
    useEffect(()=>{
        const getTokenAndRegsiter=async()=>{
            const res=await getAccessTokenWithPopup({
                authorizationParams:{
                    audience:"http://localhost:8000",
                    scope:"openid profile email"
                },
            });
            
            //store that res in localstorage
            localStorage.setItem("access_token",res);
            setUserDetails((prev)=>({...prev,token: res}));
            console.log(res)
        };
        
        isAuthenticated && getTokenAndRegsiter()
    },[isAuthenticated])

    return(
        <>
            <div style={{background:"var(--black)",overflow:"hidden"}}>
               <Header />
               {/*Without the <Outlet>, only the content of the parent layout component would be rendered, and the child routes' content would be lost.*/}
               <Outlet/>
            </div>
            <Footer/>
        </>
    )
};
export default Layout;