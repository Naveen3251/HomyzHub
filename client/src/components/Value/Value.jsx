import React,{useState} from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion';
//inbuilt css
import "react-accessible-accordion/dist/fancy-example.css";
import {MdOutlineArrowDropDown} from 'react-icons/md';
import './Value.css'
import data from '../../utils/accordion';

const Value=()=>{
 
    return(
        <section className="v-wrapper">
            <div className="paddings innerWidth flexCenter v-container">
                {/*left side*/}
                <div className="v-left">
                    {/*image-container  from Hero.css*/}
                    <div className="image-container">
                        <img src="./value.png" alt="" />
                    </div>
                </div>
                {/*right side*/}
                <div className="flexColStart v-right">
                    <span className='orangeText'>
                        Our Value
                    </span>
                    <span className='primaryText'>
                        Value We Give to You
                    </span>
                    <span className='secondaryText'>
                        We always ready to help by providing the best services for you.
                        <br/>
                        We beleive a good blace to live can make you life better !
                    </span>

                    <Accordion
                        className='accordion'
                        allowMultipleExpanded={false}
                        preExpanded={[0]}
                    >{
                        
                        data.map((item,i)=>{
                            const [className,setClassName]=useState(null);
                            return(
                                <AccordionItem className={`accordianItem ${className}`} key={i} uuid={i}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton className='flexCenter accordionButton'>
                                            {/*gives the info wether sec is open or not*/}
                                            <AccordionItemState>
                                                {({expanded})=>
                                                    expanded
                                                    ?setClassName("expanded")
                                                    :setClassName("collapsed")
                                                }
                                            </AccordionItemState>
                                            <div className="flexCenter icon">
                                                {item.icon}
                                            </div>
                                            <span className="primaryText">
                                                {item.heading}
                                            </span>
                                            <div className="flexCenter icon">
                                                <MdOutlineArrowDropDown size={20}/>
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p className="secondaryText">
                                            {item.detail}
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            )

                        })

                    }   
                    </Accordion>
                </div>
            </div>
        </section>
    )
};
export default Value;