import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css"
import axios from 'axios';
class SchoolEdit extends Component {
  state = {
    schoolName:'',
    maxClassGrade:'',
    address:'',
    pinCode:'',
    city:''
  }

  constructor(props) {
    super(props);
    this.state = {
      item:'',
      schoolName:'',
      maxClassGrade:'',
      address:'',
      pinCode:'',
      city:''
    };
    this.onChange = this.onChange.bind(this);
    this.schoolSubmit = this.schoolSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const school = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/school/${this.props.match.params.id}`)).json();
      console.log(school);
      this.setState(
        {item: school,
          schoolName:school.label,
          maxClassGrade:school.maxClassGrade,
          address:school.address,
          pinCode:school.pincode,
          city:school.city
        });
    }
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  async schoolSubmit(event) {
    if (this.props.match.params.id !== 'new') {  
      axios.put('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/school', {
        //method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
      });
    } else {
      const {schoolName, maxClassGrade, address, pinCode, city } = this.state;      
      axios.post('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/school', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: address,
          city: city,
          maxClassGrade: maxClassGrade,
          schoolName: schoolName,
          pinCode: pinCode
        })
      });
    }
  }

  render() {
    const {item, schoolName, maxClassGrade, address, pinCode, city} = this.state;
    const title = <h2>{item.id ? 'Edit School' : 'Add School'}</h2>;
    return <div className="app">
      <Container>
        {title}
        <Form onSubmit={this.schoolSubmit}>
          <div className="row">
            <FormGroup className="col-md-3 mb-3">
              <Label for="schoolName">School Name</Label>
              <Input type="text" ref="schoolName" name="schoolName" id="schoolName" placeholder="Enter School Name" onChange={e => this.onChange(e)}  value={schoolName}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="maxClassGrade">Max Grade of Class</Label>
              <Input type="text" ref="maxClassGrade" name="maxClassGrade" id="maxClassGrade" placeholder="Enter Max Grade or Class" onChange={e => this.onChange(e)}  value={maxClassGrade}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="address">Address</Label>
              <Input type="text" ref="address" name="address" id="address" placeholder="Enter Address" onChange={e => this.onChange(e)}  value={address}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="pinCode">Pin Code</Label>
              <Input type="text" ref="pinCode" name="pinCode" id="pinCode" placeholder="Enter Pincode" onChange={e => this.onChange(e)}  value={pinCode}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="city">City</Label>
              <Input type="text" ref="city" name="city" id="city" placeholder="Enter City" onChange={e => this.onChange(e)}  value={city}/>
            </FormGroup>
            </div>
          <FormGroup>   
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="success" tag={Link} to="/schools">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}
export default SchoolEdit;