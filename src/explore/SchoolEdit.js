import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
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
    this.onPinCodeChange = this.onPinCodeChange.bind(this);
    this.onMaxGradeChange = this.onMaxGradeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.schoolSubmit = this.schoolSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({showUpdateSchool: false});
    this.setState({showAddSchool: false});
    this.setState({showErrorSchool: false});
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

  onMaxGradeChange = (e) => {
    const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({maxClassGrade: e.target.value})
      }
  }

  onPinCodeChange = (e) => {
    const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({pinCode: e.target.value})
      }
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  async schoolSubmit(event) {
    event.preventDefault();
    const {schoolName, maxClassGrade, address, pinCode, city} = this.state;
    const selId = this.props.match.params.id;
    if (selId !== 'new') {  
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/school', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selId,
          address: address,
          city: city,
          maxClassGrade: maxClassGrade,
          label: schoolName,
          pincode: pinCode
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
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/school', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address,
          city: city,
          maxClassGrade: maxClassGrade,
          label: schoolName,
          pincode: pinCode
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
    const {item, error, schoolName, maxClassGrade, address, pinCode, city} = this.state;
    const showAddSchool = {
      'display': this.state.showAddForm ? 'block' : 'none'
    };
    const showErrorSchool = {
      'display': this.state.showErrorForm ? 'block' : 'none'
    };
    const showUpdateSchool = {
      'display': this.state.showUpdateForm ? 'block' : 'none'
    };
    const title = <h2>{item.id ? 'Edit School' : 'Add School'}</h2>;
    return <div className="dashboard">
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
              <Input type="text" ref="maxClassGrade" name="maxClassGrade" id="maxClassGrade" placeholder="Enter Max Grade or Class" onChange={e => this.onMaxGradeChange(e)}  value={maxClassGrade}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="address">Address</Label>
              <Input type="text" ref="address" name="address" id="address" placeholder="Enter Address" onChange={e => this.onChange(e)}  value={address}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="pinCode">Pin Code</Label>
              <Input type="text" ref="pinCode" name="pinCode" id="pinCode" placeholder="Enter Pincode" onChange={e => this.onPinCodeChange(e)}  value={pinCode}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="city">City</Label>
              <Input type="text" ref="city" name="city" id="city" placeholder="Enter City" onChange={e => this.onChange(e)}  value={city}/>
            </FormGroup>
            </div>
            <div>
          <FormGroup>   
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="success" tag={Link} to="/schools">Cancel</Button>
          </FormGroup>
          </div>
          <div style={showAddSchool}>
              <p style={{color: 'darkgreen'}}>{schoolName} School Added successfully</p>
          </div>
          <div style={showErrorSchool}>
              <p style={{color: 'red'}}>{error} while adding / updating school</p>
          </div>
          <div style={showUpdateSchool}>
              <p style={{color: 'blue'}}>{schoolName} School Updated successfully</p>
          </div>
        </Form>
      </Container>
    </div>
  }
}
export default SchoolEdit;