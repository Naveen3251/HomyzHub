import React from 'react';
import {Swiper,SwiperSlide,useSwiper} from 'swiper/react';
import 'swiper/css' //built-in
import './Residencies.css';
import { sliderSettings } from '../../utils/common';
import PropertyCard from '../PropertyCard/PropertyCard';
import useProperties from '../../hooks/useProperties';
import { PuffLoader } from 'react-spinners';

const Residencies=()=>{
    const {data,isError,isLoading}=useProperties();
       //error    
       if(isError){
            return(
                <div className="wrapper">
                    <span>Error while fetching data</span>
                </div>
            )
        }
    
        //loading state
        if(isLoading){
            return(
                <div className="wrapper flexCenter" style={{height:"60vh"}}>
                    <PuffLoader
                        height="80"
                        width="80"
                        radius={1}
                        color="#4066ff"
                        aria-label="puff-loading"
                    />
                </div>
            )
        }

        return(
            <section className="r-wrapper">
                <div className="paddings innerWidth r-container">
                    <div className="r-head flexColStart">
                        <span className='orangeText'>
                            Best Choices
                        </span>
                        <span className='primaryText'>
                            Popular Residencies
                        </span>
                    
                    </div>
                    <Swiper {...sliderSettings}>
                        {/*slider*/}
                        <SliderButtons/>
                        {
                            data.slice(0,8).map((card,i)=>(
                                <SwiperSlide key={i}>
                                    <PropertyCard card={card}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
        </section>
    )
};
export default Residencies;

const SliderButtons=()=>{
    //swiperhook
    const swiper=useSwiper()
    return(
        <div className='flexCenter r-buttons'>
            <button onClick={()=>swiper.slidePrev()}>&lt;</button>
            <button onClick={()=>swiper.slideNext()}>&gt;</button>

        </div>
    )
}