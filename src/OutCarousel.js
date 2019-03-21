import React, {Component} from 'react';
import outreach1 from "./images/outreach-1.jpg";
import outreach2 from "./images/outreach-2.jpg";
import outreach4 from "./images/outreach-4.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
var Carousel = require('react-responsive-carousel').Carousel;
class OutCarousel extends Component{
 render(){
    return (
            <div>
                <Carousel showArrows={true} autoPlay>
                    <div>
                        <img src={outreach1} alt=""/>
                        <p className="legend">Outreach 1</p>
                    </div>
                    <div>
                        <img src={outreach2} alt="" />
                        <p className="legend">Outreach 2</p>
                    </div>
                    <div>
                        <img src={outreach4} alt=""/>
                        <p className="legend">Outreach 4</p>
                    </div>
                </Carousel>
            </div>
        )
    }
}
export default OutCarousel;