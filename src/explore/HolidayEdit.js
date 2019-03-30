import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class HolidayEdit extends Component {
  emptyItem = {
      holidayDate: new Date(),
      holidayDesc:""
  };

  state = {
    holidayDate: new Date(),
    holidayDesc:"",
    isPublic:true
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      isPublic:false
    };
    this.onChange = this.onChange.bind(this);
    this.holidaySubmit = this.holidaySubmit.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
  }

  async componentDidMount() {
    //this.setState({isPublic: this.state.checked});
    //alert(this.props.match.params.id)
    if (this.props.match.params.id !== 'new') {
      const holiday = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/holiday/${this.props.match.params.id}`)).json();
      console.log(holiday);
      this.setState(
        {item: holiday,
          holidayDate:holiday.date,
          holidayDesc:holiday.details,
          isPublic:holiday.publicHoliday
        });
    }
    
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  toggleChange = (e) => {
    this.setState({
      isPublic: e.target.checked,
    });
  }

  handleHolidayDate = holidayDate => this.setState({ holidayDate })

  async holidaySubmit(event) {
    event.preventDefault();
    const {holidayDate, holidayDesc} = this.state;  
    const selId = this.props.match.params.id;
    if (selId !== 'new') {  
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/holiday/update', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selId,
          date: holidayDate,
          details: holidayDesc,
          publicHoliday: this.state.isPublic
        })
      }).then(response => {
        this.setState({showUpdateForm: true});
      }).catch(error => {
        this.setState({showErrorForm: true});
        console.error("error", error);
        this.setState({
          error:`${error}`
        });
      });
    } else {
      const formattedDate = new Intl.DateTimeFormat("fr-ca", {year: 'numeric', month: '2-digit',day: '2-digit'}).format(holidayDate);
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/holiday/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formattedDate,
          details: holidayDesc,
          publicHoliday: this.state.isPublic
        })
      }).then(response => {
        this.setState({showAddForm: true});
      }).catch(error => {
        this.setState({showErrorForm: true});
        console.error("error", error);
        this.setState({
          error:`${error}`
        });
      });
    }
  }

  render() {
    const {item,  holidayDate, holidayDesc, error} = this.state;
    const showAddSchool = {
      'display': this.state.showAddForm ? 'block' : 'none'
    };
    const showErrorSchool = {
      'display': this.state.showErrorForm ? 'block' : 'none'
    };
    const showUpdateSchool = {
      'display': this.state.showUpdateForm ? 'block' : 'none'
    };
    const title = <h2>{item.id ? 'Edit Holiday' : 'Add Holiday'}</h2>;
    return <div className="dashboard">
      <Container>
        {title}
        <Form onSubmit={this.holidaySubmit}>
          <div className="row">
                <FormGroup className="col-md-3 mb-3">
                    <Label for="holidayDate" style={{color:'white'}}>Holiday Date</Label>
                    <DatePicker selected={this.state.holidayDate} className="datePicker" placeholderText="Select Holiday Date" onChange={this.handleHolidayDate} dateFormat="dd/MM/yyyy"/>
                </FormGroup>
                <FormGroup className="col-md-3 mb-3">
                    <Label for="holidayDesc" style={{color:'white'}}>Holiday Description</Label>
                    <Input type="text" ref="holidayDesc" name="holidayDesc" id="holidayDesc" placeholder="Enter Holiday Description" onChange={e => this.onChange(e)}  value={holidayDesc}/>
                </FormGroup>
            </div>
            {/* <div>
              <FormGroup className="col-md-3 mb-3">
                    <Label style={{color:'white'}}>Is Public holiday: <Input type="checkbox" checked={this.state.isPublic} onChange={this.toggleChange} /></Label>
              </FormGroup>
            </div> */}
            <div>
              <FormGroup>   
                <Button color="primary" type="submit">Save</Button>{' '}
                <Button color="success" tag={Link} to="/holidays">Cancel</Button>
              </FormGroup>
            </div>
            <div style={showAddSchool}>
              <p style={{color: 'darkgreen'}}>Holiday Date Added successfully</p>
            </div>
            <div style={showErrorSchool}>
                <p style={{color: 'red'}}>{error} while adding / updating holiday</p>
            </div>
            <div style={showUpdateSchool}>
                <p style={{color: 'blue'}}>Holiday Date Updated successfully</p>
            </div>
        </Form>
      </Container>
    </div>
  }
}
export default HolidayEdit;