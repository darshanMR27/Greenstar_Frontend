import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class StudentEdit extends Component {
  emptyItem = {
      school:"",
      section:"",
      grade:"",
      group:"",
      studentName:"",
      rollNumber:"",
      caste:"",
      religion:"",
      address:"",
      pinCode:"",
      city:"",
      schoolName:"",
      gradeName:"",
      sectionName:"",
      groupName:"",
      gender:""
  };

  state = {
    selectedSchool:null,
    selectedGrade:null,
    selectedSection:null,
    selectedGroup:null,
    joiningDate: new Date(),
    schoolName:null,
    gradeName:null,
    sectionName:null,
    groupName:null,
    gender:null,
    studentName:null,
    rollNumber:null,
    caste:null,
    religion:null,
    address:null,
    pinCode:null,
    city:null,
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      schools : [],
      grades : [],
      sections : [],
      groups : [],
      schoolName:null,
      gradeName:null,
      sectionName:null,
      groupName:null,
      gender:null
    };
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleJoinDateChange = this.handleJoinDateChange.bind(this);
    this.studentSubmit = this.studentSubmit.bind(this);
    this.onPinCodeChange = this.onPinCodeChange.bind(this);
  }

  async componentDidMount() {
     if (this.props.match.params.id !== 'new') {
       const group = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student/${this.props.match.params.id}`)).json();
       console.log(group);
       this.setState(
         {item: group,
           groupName:group.groupName,
           schoolName: group.schoolName,
           sectionName:group.sectionName,
           gradeName:group.clsName,
           studentName:group.label,
           rollNumber:group.rollNumber,
           caste:group.caste,
           religion:group.religion,
           address:group.address,
           pinCode:group.pincode,
           city:group.city,
           joiningDate:group.joiningDate,
           gender:group.gender,
           school : group.schoolId,
           grade: group.clsId,
           section: group.sectionId
         });
     } else {
       return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/school/`)
       .then(result => {
         console.log(result);
         this.setState({
           schools: result.data, error:false});
         }).catch(error => {
         console.error("error", error);
         this.setState({
           error:`${error}`
         });
       });
     }
   }

  handleSchoolChange = (selectedSchool) => {
    //alert("selectedGrade="+selectedSchool.id);
    this.setState({ selectedSchool });
    const bodyFormData = new FormData();
    return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/class/school/`+selectedSchool.id)
    .then(result => {
        console.log(result);
        this.setState({
        grades: result.data, error:false});
        }).catch(error => {
        console.error("error", error);
        this.setState({
        error:`${error}`
        });
    });
    }
    handleClassChange = (selectedGrade) => {
    // alert("selectedGrade="+selectedGrade.id);
    this.setState({ selectedGrade });
    return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/section/class/`+selectedGrade.id)
    .then(result => {
        console.log(result);
        this.setState({
        sections: result.data, error:false});
        }).catch(error => {
        console.error("error", error);
        this.setState({
        error:`${error}`
        });
    });
    }
    handleSectionChange = (selectedSec) => {
    this.setState({ selectedSec });
    //alert("selectedSection="+selectedSection);
    return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group/section/`+selectedSec.id)
    .then(result => {
        console.log(result);
        this.setState({
        groups: result.data,
        loading:false,
        error:false
        });
    }).catch(error => {
        console.error("error", error);
        this.setState({
        error:`${error}`,
        loading:false
        });
    });
    }

    handleGroupChange = (selectedGroup) => {
    this.setState({ selectedGroup });
    //alert("selectedSection="+selectedSection);
    return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student/group/`+selectedGroup.id)
    .then(result => {
        console.log(result);
        this.setState({
        students: result.data,
        loading:false,
        error:false
        });
    }).catch(error => {
        console.error("error", error);
        this.setState({
        error:`${error}`,
        loading:false
        });
    });
    }
  handleJoinDateChange = joiningDate => this.setState({ joiningDate })

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  onPinCodeChange = (e) => {
    const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({pinCode: e.target.value})
      }
  }

  setGender(event) {
    this.setState({
      gender: event.target.value
    });
    //console.log(event.target.value);
  }

  async studentSubmit(event) {
    event.preventDefault();
    const {studentName, rollNumber, caste, religion,
    joiningDate, address, pinCode, city, gender, school, grade, section} = this.state;
    let selId = this.props.match.params.id;
    if (selId !== 'new') {
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selId,
          rollNumber:rollNumber,
          label: studentName,
          caste: caste,
          religion: religion,
          gender: gender,
          joiningDate: joiningDate,
          city:city,
          pincode: pinCode,
          address:address,
          schoolId: school,
          clsId: grade,
          sectionId: section,
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
      
      let schoolId = this.state.selectedSchool.id;
      let gradeId = this.state.selectedGrade.id;
      let sectionId = this.state.selectedSec.id;
      let formattedJoinDate = new Intl.DateTimeFormat("fr-ca", {year: 'numeric', month: '2-digit',day: '2-digit'}).format(joiningDate);
     // let groupId = this.state.selectedGroup.id;
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rollNumber:rollNumber,
          label: studentName,
          caste: caste,
          religion: religion,
          gender: gender,
          joiningDate: formattedJoinDate,
          schoolId: schoolId,
          clsId: gradeId,
          sectionId: sectionId,
          city:city,
          pincode: pinCode,
          address:address
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
    const {error, selectedGroup, selectedSchool, selectedGrade, 
      selectedSection, schools, 
      grades, sections, groups, studentName, 
      rollNumber, caste, religion, joiningDate, address, pinCode,city,
    schoolName, sectionName, gradeName, groupName, gender} = this.state;
    //const title = <h2>{item.id ? 'Edit Student' : 'Add Student'}</h2>;
    const showAddStudent = {
      'display': this.state.showAddForm ? 'block' : 'none'
    };
    const showErrorStudent = {
      'display': this.state.showErrorForm ? 'block' : 'none'
    };
    const showUpdateStudent = {
      'display': this.state.showUpdateForm ? 'block' : 'none'
    };
    if (this.props.match.params.id !== 'new') {
        return <div className="dashboard">
        <Container>
        <h2>Edit Student</h2>
        <Form onSubmit={this.studentSubmit}>
          <div className="row">
          <FormGroup className="col-md-3 mb-3">
            <Label for="schoolName">School Name</Label>
            <Input type="text" ref="schoolName" name="schoolName" id="schoolName"  value={schoolName}/>
          </FormGroup>
          <FormGroup className="col-md-3 mb-3">
            <Label for="gradeName">Class or Grade</Label>
            <Input type="text" ref="gradeName" name="gradeName" id="gradeName"  value={gradeName}/>
          </FormGroup>
          <FormGroup className="col-md-3 mb-3">
            <Label for="sectionName">Section</Label>
            <Input type="text" ref="sectionName" name="sectionName" id="sectionName"  value={sectionName}/>
          </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="student">Student Name</Label>
              <Input type="text" ref="studentName" name="studentName" id="studentName" placeholder="Enter Student Name" onChange={e => this.onChange(e)}  value={studentName}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="roll">Roll Number</Label>
              <Input type="text" ref="rollNumber" name="rollNumber" id="rollNumber" placeholder="Enter Roll Number" onChange={e => this.onChange(e)}  value={rollNumber}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="caste">Caste</Label>
              <Input type="text" ref="caste" name="caste" id="caste" placeholder="Enter Caste" onChange={e => this.onChange(e)}  value={caste}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="religion">Religion</Label>
              <Input type="text" ref="religion" name="religion" id="religion" placeholder="Enter Religion" onChange={e => this.onChange(e)}  value={religion}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="address">Address</Label>
              <Input type="text" ref="address" name="address" id="address" placeholder="Enter Address" onChange={e => this.onChange(e)}  value={address}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="pincode">Pin Code</Label>
              <Input type="text" ref="pinCode" name="pinCode" id="pinCode" placeholder="Enter Pin Code" onChange={e => this.onPinCodeChange(e)}  value={pinCode}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="city">City</Label>
              <Input type="text" ref="city" name="city" id="city" placeholder="Enter City" onChange={e => this.onChange(e)}  value={city}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3 monthPickerClass">
              <Label for="joiningDate">Joining Date</Label>
              <DatePicker selected={joiningDate} className="datePicker" placeholderText="Select Date" onChange={this.handleJoinDateChange} dateFormat="dd/MM/yyyy"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3" style={{display:'inline-block'}} onChange={(e) => this.setState({ selected: e.target.value })} >
              <Label for="gender">Gender</Label><br></br>
              <Input type="radio" value="male" name="gender" id="gender" defaultChecked={this.state.gender === "male"}/> Male &nbsp;&nbsp;
              <Input type="radio" value="female" name="gender" id="gender" defaultChecked={this.state.gender === "female"}/> Female
            </FormGroup>
            </div>
          <FormGroup>   
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="success" tag={Link} to="/students">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
      <div style={showUpdateStudent}>
            <p style={{color: 'blue'}}>{schoolName} School Updated successfully</p>
      </div>
     </div>
    } else {
        return <div className="dashboard">
        <Container>
        <h2>Add Student</h2>
        <Form onSubmit={this.studentSubmit}>
          <div className="row">
          <FormGroup className="col-md-3 mb-3">
            <Label for="name">School Name</Label>
            <Select options={ schools } name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}
                      />
          </FormGroup>
          <FormGroup className="col-md-3 mb-3">
            <Label for="grade">Class or Grade</Label>
            <Select options={ grades } name="grade" id="grade" onChange={this.handleClassChange} value={selectedGrade}
                    />
          </FormGroup>
          <FormGroup className="col-md-3 mb-3">
            <Label for="section">Section</Label>
            <Select options={ sections } name="section" id="section" onChange={this.handleSectionChange} value={selectedSection}/>
          </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="student">Student Name</Label>
              <Input type="text" ref="studentName" name="studentName" id="studentName" placeholder="Enter Student Name" onChange={e => this.onChange(e)}  value={studentName}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="roll">Roll Number</Label>
              <Input type="text" ref="rollNumber" name="rollNumber" id="rollNumber" placeholder="Enter Roll Number" onChange={e => this.onChange(e)}  value={rollNumber}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="caste">Caste</Label>
              <Input type="text" ref="caste" name="caste" id="caste" placeholder="Enter Caste" onChange={e => this.onChange(e)}  value={caste}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="religion">Religion</Label>
              <Input type="text" ref="religion" name="religion" id="religion" placeholder="Enter Religion" onChange={e => this.onChange(e)}  value={religion}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="address">Address</Label>
              <Input type="text" ref="address" name="address" id="address" placeholder="Enter Address" onChange={e => this.onChange(e)}  value={address}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="pincode">Pin Code</Label>
              <Input type="text" ref="pinCode" name="pinCode" id="pinCode" placeholder="Enter Pin Code" onChange={e => this.onPinCodeChange(e)}  value={pinCode}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="city">City</Label>
              <Input type="text" ref="city" name="city" id="city" placeholder="Enter City" onChange={e => this.onChange(e)}  value={city}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3 monthPickerClass">
              <Label for="joiningDate">Joining Date</Label>
              <DatePicker selected={this.state.joiningDate} className="datePicker" placeholderText="Select Date" onChange={this.handleJoinDateChange} dateFormat="dd/MM/yyyy"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3" style={{display:'inline-block'}} onChange={this.setGender.bind(this)}>
              <Label for="gender">Gender</Label><br></br>
              <Input type="radio" value="male" name="gender"/> Male &nbsp;&nbsp;
              <Input type="radio" value="female" name="gender"/> Female
            </FormGroup>
            </div>
          <FormGroup>   
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="success" tag={Link} to="/students">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
        <div style={showAddStudent}>
              <p style={{color: 'darkgreen'}}>{schoolName} Student Added successfully</p>
        </div>
        <div style={showErrorStudent}>
            <p style={{color: 'red'}}>{error} while adding / updating student</p>
        </div>
    </div>
    }
  }
}
export default StudentEdit;