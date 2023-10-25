import React,{useState} from "react";
import './Header.css'
import {BiMenuAltRight} from 'react-icons/bi';
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom"; 
//custom comp
import ProfileMenu from "../ProfileMenu/ProfileMenu";

//hooks
import useHeaderColor from '../../hooks/useHeaderColor';

//authentication hooks
import { useAuth0 } from "@auth0/auth0-react";




const Header=()=>{
    const [menuOpened,setMenuOpened]=useState(false);
    const headerColor=useHeaderColor();

    //authentication
    const {loginWithRedirect,isAuthenticated,user,logout}=useAuth0()

    const getMenuStyles=(menuOpened)=>{
        //for the mob screen
        if(document.documentElement.clientWidth<=800){
            //altering right side screen
            return {right:!menuOpened && "-100%"}
        }
    }
    return(
        <section className="h-wrapper" style={{ background: headerColor }}>
            <div className="flexCenter paddings innerWidth h-container">
                {/*logo*/}
                <Link to='/'>
                    <img src="./logo.png" alt="logo" width={100}/>
                </Link>


                <OutsideClickHandler
                    onOutsideClick={()=>{
                        setMenuOpened(false);
                    }}
                >
                    <div className="flexCenter h-menu"
                        style={getMenuStyles(menuOpened)}
                    >
                        <NavLink to='/properties'>Properties</NavLink>

                        <a href="mailto:naveensakthivel3251@gmail.com">Contact</a>
                    
                        {/*login or logout button*/}
                        {
                            !isAuthenticated ? (
                                <button className="button" onClick={loginWithRedirect}>
                                    Login
                                </button>
                            ):(
                                
                                    <ProfileMenu user={user} logout={logout}/>
                                
                            )
                        } 

                    </div>
                </OutsideClickHandler>

                <div className="menu-icon" onClick={()=>setMenuOpened((prev)=>!prev)}>
                    <BiMenuAltRight size={30}/>
                </div>
            </div>
            
        </section>
    )
}
export default Header;