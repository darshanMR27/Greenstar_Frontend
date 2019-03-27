import React, {Component} from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './cssstyles/slider-animations.css';
import outreach1 from './images/outreach-1.jpg';
import outreach2 from './images/outreach-2.png';
import outreach3 from './images/outreach-3.jpg';
import "./cssstyles/styles.css";
class About extends Component{
 render(){
    const content = [
        {
          title: 'Green Star Application',
          description:
          ' The Green Start Application helps to address three major problems of school: Attendance, Homework and Discipline',
         /* button: 'Read More',
          user: 'Outreach'*/
          image: {outreach1}
        },
        {
          title: 'Attendance',
          description:
          'Schools have poor attendance and no strict attendance tracking mechanisms, resulting in higher dropout rates.',
          /*button: 'Read More',
          user: 'Outreach'*/
          image: {outreach2}
        },
        {
          title: 'Home Work',
          description:
          'Majority of students in govt. schools do not have a formal homework structure which discourages them to learn at home.',
          /*button: 'Read More',
          user: 'Outreach'
          */
         image: {outreach3}
        },
        {
          title: 'Discipline',
          description:
          'No focus provided on behavioral changes as most of the items are provided by the govt. ',
          description1:'These problems are transferred into measurable parameters and stars are awarded.',
          /*button: 'Read More',
          user: 'Outreach'*/
          image: {outreach3}
        }
      ];
return (
<div className="dashboard">
    <Slider autoplay="3000ms" className="slider">
        {content.map((item, index) => (
            <div
                key={index} className="slider-content"
                style={{ background: `url('${outreach2}') no-repeat center center` }}>
                <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.description1}</p>
                </div>

            </div>
            ))} 
    </Slider>
</div>
)
 }
}

export default About;