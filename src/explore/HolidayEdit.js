import React, { Component } from 'react';
import { Link, withRouter, BrowserRouter as Router} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
//import AppNavbar from './AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class HolidayEdit extends Component {
  emptyItem = {
      holidayDate: new Date(),
      holidayDesc:"",
      publicHoliday:Boolean
  };

  state = {
    holidayDate: new Date(),
    holidayDesc:"",
    publicHoliday:Boolean
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    //alert(this.props.match.params.id);
    if (this.props.match.params.id !== 'new') {
      const holiday = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/holiday/${this.props.match.params.id}`)).json();
      console.log(holiday);
      this.setState(
        {item: holiday,
          holidayDate:holiday.date,
          holidayDesc:holiday.details,
          publicHoliday:holiday.publicHoliday
        });
    }
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  handleHolidayDate = holidayDate => this.setState({ holidayDate })

  async handleSubmit(event) {
    //event.preventDefault();
    const {item, holidayDate, holidayDesc} = this.state;
    //alert(selectedItems.length);   
  //   alert('School = '+selectedSchool.label);
  //  alert('Grade = '+selectedGrade.label);
  //   alert('Section = '+selectedSection.label);
  //   alert('Group = '+groupName);
    
    await fetch('/api/school', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/schools');
  }

  render() {
    const {item,  holidayDate, holidayDesc} = this.state;
    const title = <h2>{item.id ? 'Edit Holiday' : 'Add Holiday'}</h2>;
    return <div className="app">
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
                <FormGroup className="col-md-3 mb-3">
                    <Label for="holidayDate">Holiday Date</Label>
                    <DatePicker selected={this.state.holidayDate} className="datePicker" placeholderText="Select Holiday Date" onChange={this.handleHolidayDate} dateFormat="dd/MM/yyyy"/>
                </FormGroup>
                <FormGroup className="col-md-3 mb-3">
                    <Label for="holidayDesc">Holiday Description</Label>
                    <Input type="text" ref="holidayDesc" name="holidayDesc" id="holidayDesc" placeholder="Enter Holiday Description" onChange={e => this.onChange(e)}  value={holidayDesc}/>
                </FormGroup>
            </div>
          <FormGroup>   
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="success" tag={Link} to="/holidays">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}
export default HolidayEdit;