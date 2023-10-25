import React,{useState} from 'react';
import './Property.css';

import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../../utils/api';

//icons
import {AiFillHeart,AiTwotoneCar} from 'react-icons/ai';
import {FaShower} from "react-icons/fa"
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md';

//custom map componnet
import Map from '../../components/Map/Map';

//loader
import {PuffLoader} from 'react-spinners';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../../components/BookingModal/BookingModal';

const Property=()=>{
    //gives complete pathname of the curr page
    const {pathname}=useLocation();
    //console.log(pathname);
    const id=pathname.split('/').slice(-1)[0]
    const {data,isLoading,isError}=useQuery(["resd",id],()=>getProperty(id));
    console.log(data)

    //if the website is accesed by authorized person it turns to true after userAuthCheck(customly defined)
    const [modalOpened,setModalOpened]=useState(false);
    const {validateLogin}=useAuthCheck();//return true/false based on user is authorized or not
    const {user}=useAuth0();

     //error    
     if(isError){
        return(
            <div className="wrapper">
                <span>Error while fetching Property details</span>
            </div>
        )
    }

    //loading state
    if(isLoading){
        return(
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <PuffLoader/>
                </div>
            </div>
        )
    }
    return(
        <div className='wrapper'>
            <div className="flexColStart paddings innerWidth property-container">

                {/*like button*/}
                <div className="like">
                    <AiFillHeart size={24} color="white"/>
                </div>

                {/*image*/}
                <img src={data?.image} alt="house image" />




                <div className="flexCenter property-details">

                    {/*left side*/}
                    <div className="flexColStart left">

                        {/*head*/}
                        <div className="flexStart head">
                            <span className='primaryText'>{data?.title}</span>
                            <span className='orangeText' style={{fontSize:"1.5rem"}}>${data?.price}</span>
                        </div>

                        {/*facilities*/}
                        <div className="flexStart facilities">
                            {/*bathroom*/}
                            <div className="flexStart facility">
                                <FaShower size={20} color="#1F3E72"/>
                                <span>{data?.facilities?.bathrooms} Bathrooms</span>
                            </div>
                            {/*parkings*/}
                            <div className="flexStart facility">
                                <AiTwotoneCar size={20} color="#1F3E72"/>
                                <span>{data?.facilities?.parkings} Parkings</span>
                            </div>
                            {/*bedrooms*/}
                            <div className="flexStart facility">
                                <MdMeetingRoom size={20} color="#1F3E72"/>
                                <span>{data?.facilities?.bedrooms} Bedrooms</span>
                            </div>
                        </div>

                        {/*description*/}
                        <span className="secondaryText" style={{textAlign:"justify"}}>
                            {data?.description}
                        </span>

                        {/*address*/}
                        <div className="flexStart" style={{gap:'1rem'}}>
                            <MdLocationPin size={25}/>
                            <span className="secondaryText">
                                {
                                    data?.address
                                }
                                {
                                    data?.city
                                }
                                {
                                    data?.country
                                }
                            </span>
                        </div>

                        {/*booking button*/}
                        <button className="button"
                            onClick={()=>
                                validateLogin() && setModalOpened(true)
                            }
                        >
                            Book your visit
                        </button>

                        <BookingModal
                        opened={modalOpened}
                        setOpened={setModalOpened}
                        propertyId={id}
                        email={user?.email}
                        />

                    </div>

                    {/*right side*/}
                    <div className="right">
                       
                        <Map address={data?.address} city={data?.city} country={data?.country}/>
                    </div>
                </div>



            </div>
        </div>
    )
};
export default Property;