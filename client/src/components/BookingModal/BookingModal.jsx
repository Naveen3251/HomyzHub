import React,{useContext, useState} from "react";
import {Modal, Button} from '@mantine/core';
import {DatePicker} from '@mantine/dates';
import { useMutation } from "react-query";

//custom context stored userdetails
import UserDetailContext from "../../context/UserDetailContext";
import { bookVisit } from "../../utils/api.js";


const BookingModal=({opened,
    setOpened,
    propertyId,
    email
})=>{

    //to store the selecting date and send to backend
    const [value,setValue]=useState(null);

    //taking the use details
    const {userDetails:{token}}=useContext(UserDetailContext);
    console.log(token)

    const {mutate,isLoading}=useMutation(
        {
            mutationFn:()=>bookVisit(value,propertyId,email)
        }
    );

    return(
        <Modal
            opened={opened}
            onClose={()=>setOpened(false)}
            setOpened={setOpened}
            title="Select Your date of visit"
            centered
        >
            <div className="flexColCenter">
                <DatePicker value={value} onChange={setValue} minDate={new Date()}/>

                <Button disabled={!value} onClick={()=>mutate()}>
                    Book Visit
                </Button>
            </div>

        </Modal>
    )
};
export default BookingModal;