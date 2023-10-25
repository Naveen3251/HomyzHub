//allows you to send GET, POST, PUT, and DELETE requests to a server and handle the responses.
import axios from 'axios';
//working with dates and times
import dayjs from 'dayjs';
//displaying toast(popUp) notifications in React applications
import {toast} from 'react-toastify';

//specify baseUrl of server
export const api=axios.create({
    baseURL:"http://localhost:8000/api"
})

//function for getAllproperties mentioned in hooks>useProperties
export const getAllProperties=async()=>{
    try{
        //in residencyroute at backend we use get method for getAllResidencies
        const response=await api.get("/residency/allresd",{
            timeout:10*1000,
        });

        if(response.status===400 || response.status===500){
            throw response.data;
        }
        return response.data;

    }catch(error){
        toast.error("Something Went Wrong");
        throw error;
    }
}

//function to get individula prop in new page
export const getProperty=async(id)=>{
    try{
        //in residencyroute at backend we use get method for getAllResidencies
        const response=await api.get(`/residency/${id}`,{
            timeout:10*1000,
        });

        if(response.status===400 || response.status===500){
            throw response.data;
        }
        return response.data;

    }catch(error){
        toast.error("Something Went Wrong");
        throw error;
    }

};

//adding logging in user to the db user collection 

export const createUser=async(email,token)=>{
    try{
        await api.post(
            `/user/register`,
            {email},
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
    catch(error){
        toast.error("Something went Wrong, Please try again")
        throw error
    }
}

export const bookVisit=async(date,propertyId,email,token)=>{
    try{
        await api.post(`/user/bookVisit/${propertyId}`,
        {
            email,
            id:propertyId,
            date:dayjs(date).format("DD/MM/YYY")
        }
        )

    }catch{
        toast.error("Something Went wrong please try Again");
        throw error;
    }

}
