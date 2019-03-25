import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './cssstyles/slider-animations.css';
import Dashboard from "./Dashboard";
import Report from "./Report";
import headerLogo from './images/logo.jpg';
//import outreach1 from './images/outreach-1.jpg';
import GroupList from "./explore/GroupList";
import Login from "./Login";
import About from "./About";
import Contact from "./Contact";
import GroupEdit from "./explore/GroupEdit";
import SchoolList from "./explore/SchoolList";
import SchoolEdit from "./explore/SchoolEdit";
import ClassList from "./explore/ClassList";
import ClassEdit from "./explore/ClassEdit";
import SectionList from "./explore/SectionList";
import SectionEdit from "./explore/SectionEdit";
import StudentList from "./explore/StudentList";
import StudentEdit from "./explore/StudentEdit";
import HolidayList from "./explore/HolidayList";
import HolidayEdit from "./explore/HolidayEdit";
import RoleList from "./explore/RoleList";
import RoleEdit from "./explore/RoleEdit";
import "./cssstyles/Common.css";
import "./cssstyles/index.css";
class App extends Component {
  render (){
    const content = [
      {
        title: 'Green Star Application',
        description:
        ' The Green Start Application helps to address three major problems of school: Attendance, Homework and Discipline'
       /* button: 'Read More',
        user: 'Outreach'*/
      },
      {
        title: 'Attendance',
        description:
        'Schools have poor attendance and no strict attendance tracking mechanisms, resulting in higher dropout rates.'
        /*button: 'Read More',
        user: 'Outreach'*/
      },
      {
        title: 'Home Work',
        description:
        'Majority of students in govt. schools do not have a formal homework structure which discourages them to learn at home.'
        /*button: 'Read More',
        user: 'Outreach'
        */
      },
      {
        title: 'Discipline',
        description:
        'No focus provided on behavioral changes as most of the items are provided by the govt. ' +
        'These problems are transferred into measurable parameters and stars are awarded.'
        /*button: 'Read More',
        user: 'Outreach'*/
      }
    ];
    return (
      <Router>
          <div>
            <Navbar expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#" style={{display: 'flex'}}><img src={headerLogo} alt="logo" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto">
                  <Nav.Link  href="/login">Login</Nav.Link>
                  <Nav.Link  href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link  href="/report">Report</Nav.Link>
                  <NavDropdown  title="Explore" id="basic-nav-dropdown">
                    <NavDropdown.Item  href="/schools">School</NavDropdown.Item>
                    <NavDropdown.Item  href="/grades">Class</NavDropdown.Item>
                    <NavDropdown.Item  href="/sections">Section</NavDropdown.Item>
                    <NavDropdown.Item  href="/groups">Group</NavDropdown.Item>
                    <NavDropdown.Item  href="/students">Student</NavDropdown.Item>
                    <NavDropdown.Item  href="/holidays">Holidays</NavDropdown.Item>
                    <NavDropdown.Item  href="/roles">Roles</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="dashboard">
                <Slider autoplay="3000ms" className="slider">
                {content.map((item, index) => (
                    <div
                      key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        
                      </div>
                    </div>
                  ))} 
                </Slider>
              <Route exact path="/login" component={Login}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/report" component={Report}/>
              <Route path="/groups" component={GroupList}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route path='/groups/:id' component={GroupEdit}/>
              <Route path='/schools' component={SchoolList}/>
              <Route path='/schools/:id' component={SchoolEdit}/>
              <Route path='/grades' component={ClassList}/>
              <Route path='/grades/:id' component={ClassEdit}/>
              <Route path='/sections' component={SectionList}/>
              <Route path='/sections/:id' component={SectionEdit}/>
              <Route path='/students' component={StudentList}/>
              <Route path='/students/:id' component={StudentEdit}/>
              <Route path='/holidays' component={HolidayList}/>
              <Route path='/holidays/:id' component={HolidayEdit}/>
              <Route path='/roles' component={RoleList}/>
              <Route path='/roles/:id' component={RoleEdit}/>
            </div>
            <div>
            <Navbar expand="lg" bg="dark" variant="dark">
              <Navbar.Brand style={{display: 'flex'}} className="footer-span"> @Copyright; version:1.0</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto">
                  <Nav.Link href="/about">About</Nav.Link>
                  <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            </div>
          </div>
      </Router>
    );
  }
}
export default App;