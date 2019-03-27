import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';

class StudentList extends Component {
  constructor(props) {
    super(props);
  this.state = {
    school:"",
    section:"",
    grade:"",
    student:"",
    group:"",
      students: [],
      showForm: false,
    schools : [],
    grades : [],
    sections : [],
    groups : [],
    selectedItems: []
  };
  this.handleSchoolChange = this.handleSchoolChange.bind(this);
  this.handleClassChange = this.handleClassChange.bind(this);
  this.handleSectionChange = this.handleSectionChange.bind(this);
  //this.handleGroupChange = this.handleGroupChange.bind(this);
  this.remove = this.remove.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}

componentDidMount(){
  this.setState({showForm: true});
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
  handleSchoolChange = (selectedSchool) => {
//        alert("selectedGrade="+selectedSchool.id);
    this.setState({ selectedSchool });
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
    return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student/section/`+selectedSec.id)
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

  // handleGroupChange = (selectedGroup) => {
  //   this.setState({ selectedGroup });
  //   //alert("selectedSection="+selectedSection);
  //   return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student/group/`+selectedGroup.id)
  //   .then(result => {
  //     console.log(result);
  //     this.setState({
  //       students: result.data,
  //       loading:false,
  //       error:false
  //     });
  //   }).catch(error => {
  //     console.error("error", error);
  //     this.setState({
  //       error:`${error}`,
  //       loading:false
  //     });
  //   });
  // }

  onSubmit = async () => {
    //alert('Inside onSubmit');
    const { selectedSchool, selectedGrade, 
      selectedSection, selectedGroup} = this.state;
      // alert('School = '+selectedSchool.label);
      // alert('Grade = '+selectedGrade.label);
      // alert('Section = '+selectedSection.label);
    fetch('http://35.154.78.152:7777/api/v1/group/',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "cache-control": "no-cache"
        }
      }).then(response => response.json()).then(data => {
          console.log(data);
          this.setState({
              students: data,
          });
      }).catch(error => {
          console.log(error)
      });
      this.props.history.push('/students');
  }

  viewGroups = async () => {
    this.setState({showForm: true});
  }
  
  hideHeader = async () => {
    this.setState({showForm: false});
  }

  addHeader = async () => {
    this.setState({showForm: false});
  }

  async remove(id) {
    await fetch(`/api/student/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedStudents = [...this.state.students].filter(i => i.id !== id);
      this.setState({students: updatedStudents});
    });
  }

  render() {
    const {groups, selectedSchool, selectedGrade, selectedSection, selectedGroup,
      schools,grades,sections, students } = this.state;
    const showHide = {
      'display': this.state.showForm ? 'block' : 'none'
    };
    return (
      <div>
          <div className="row float-right">
            <Container>
              <Form>
                  <FormGroup>
                    <Button color="success" onClick={() => this.addHeader()}  tag={Link} to="/students/new">Add Student</Button>{'     '}
                  </FormGroup>
              </Form>
          </Container>
        </div>
            <div style={showHide}>
                    <h2>List Student</h2>
                        <tr className="row">
                          <td className="col-md-3 mb-3">
                          <Label for="name">School Name</Label>
                          <Select options={ schools } name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}/>
                      </td>
                      <td className="col-md-3 mb-3">
                          <Label for="grade">Class or Grade</Label>
                          <Select options={ grades } name="grade" id="grade" onChange={this.handleClassChange} value={selectedGrade}/>
                       </td>
                        <td className="col-md-3 mb-3">
                          <Label for="section">Section</Label>
                          <Select options={ sections } name="section" id="section" onChange={this.handleSectionChange} value={selectedSection}/>
                       </td>
                      </tr>
                <Table className="mt-4">
                  <thead>
                    <tr>
                      <th width="20%">Name</th>
                      <th width="20%">Roll Number</th>
                      <th width="20%">Caste</th>
                      <th width="20%">Religion</th>
                      <th width="20%">Gender</th>
                      <th width="10%">Joining Date</th>
                      <th width="10%">Address</th>
                      <th width="10%">City</th>
                      <th width="10%">Pin Code</th>
                    </tr>
                  </thead>
                  <tbody style={{color: '#dee2e6'}}>
                  {students.map(student => (
                        <tr key={student.id}>
                            <td style={{whiteSpace: 'nowrap'}}>{student.label}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.caste}</td>
                            <td>{student.religion}</td>
                            <td>{student.gender}</td>
                            <td>{student.joiningDate}</td>
                            <td>{student.address}</td>
                            <td>{student.city}</td>
                            <td>{student.pincode}</td>
                            <td>
                            <ButtonGroup>
                                <Button size="sm" color="primary" onClick={() => this.hideHeader()} tag={Link} to={"/students/" + student.id}>Edit</Button>
                                <Button size="sm" color="danger" onClick={() => this.remove(student.id)}>Delete</Button>
                            </ButtonGroup>
                            </td>
                        </tr>
                        ))}
                  </tbody>
                </Table>
                </div>
      </div>
    );
  }
}

export default StudentList;