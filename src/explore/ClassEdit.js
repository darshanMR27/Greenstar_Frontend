import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
//import AppNavbar from './AppNavbar';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css"
import axios from 'axios';
class ClassEdit extends Component {
  emptyItem = {
      school:"",
      grade:"",
      gradeName:"",
      schoolName:""
  };

  state = {
    selectedSchool:null,
    selectedGrade:null,
    gradeName:null,
    schoolName:null
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      schools : [],
      grades : [],
      selectedItems: [],
      gradeName:"",
      schoolName:"",
      schoolId:"",
      gradeId:""
    };
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.classSubmit = this.classSubmit.bind(this);
  }

  async componentDidMount() {
     if (this.props.match.params.id !== 'new') {
       const grade = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/class/${this.props.match.params.id}`)).json();
       console.log(grade);
       this.setState(
         {item: grade,
           gradeName:grade.grade,
           schoolName:grade.schoolName,
           schoolId: grade.schoolId,
           gradeId: grade.id
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
    this.setState({ selectedSchool });
  }
  onChange = (e) => {
    const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({gradeName: e.target.value})
      }
  }

  async classSubmit(event) {
    event.preventDefault();
    const {gradeName, selectedSchool, schoolId } = this.state;
    let selId = this.props.match.params.id;
    //alert('selId = '+selId+', gradeId = '+gradeId+', schoolId ='+schoolId);
    if (selId !== 'new') {  
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/class', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selId,
          grade: gradeName,
          schoolId: schoolId
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
      let schoolId = selectedSchool.id;
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/class', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grade: gradeName,
          schoolId: schoolId
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
    const {selectedSchool, gradeName,  schools, 
      schoolName, error} = this.state;
      const showAddClass = {
        'display': this.state.showAddForm ? 'block' : 'none'
      };
      const showErrorClass = {
        'display': this.state.showErrorForm ? 'block' : 'none'
      };
      const showUpdateClass = {
        'display': this.state.showUpdateForm ? 'block' : 'none'
      };
    //const title = <h2>{item.id ? 'Edit Class' : 'Add Class'}</h2>;
    if (this.props.match.params.id !== 'new') {
        return <div className="dashboard">
        <Container>
            <h2>Edit Class</h2>
            <Form onSubmit={this.classSubmit}>
                <div className="row">
                    <FormGroup className="col-md-3 mb-3">
                        <Label for="name">School Name</Label>
                        <Input type="text" ref="schoolName" name="schoolName" id="schoolName" value={schoolName}/>
                    </FormGroup>
                    <FormGroup className="col-md-3 mb-3">
                        <Label for="gradeName">Class or Grade</Label>
                        <Input type="text" ref="gradeName" name="gradeName" id="gradeName" placeholder="Enter Class Name" onChange={e => this.onChange(e)}  value={gradeName}/>
                    </FormGroup>
                </div>
                    <FormGroup>   
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="success" tag={Link} to="/grades">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
            <div style={showUpdateClass}>
                <p style={{color: 'darkblue'}}>{gradeName} Class Updated successfully</p>
            </div>
            <div style={showErrorClass}>
                <p style={{color: 'red'}}>{error} while adding / updating class</p>
            </div>
        </div>
    } else {
        return <div className="dashboard">
        <Container>
            <h2>Add Class</h2>
            <Form onSubmit={this.classSubmit}>
                <div className="row">
                    <FormGroup className="col-md-3 mb-3">
                        <Label for="name">School Name</Label>
                        <Select options={ schools } name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}/>
                    </FormGroup>
                    <FormGroup className="col-md-3 mb-3">
                        <Label for="gradeName">Class or Grade</Label>
                        <Input type="text" ref="gradeName" name="gradeName" id="gradeName" placeholder="Enter Class Name" onChange={e => this.onChange(e)}  value={gradeName}/>
                    </FormGroup>
                </div>
                    <FormGroup>   
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="success" tag={Link} to="/grades">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
            <div style={showAddClass}>
                <p style={{color: 'darkgreen'}}>{gradeName} Class Added successfully</p>
            </div>
            <div style={showErrorClass}>
                <p style={{color: 'red'}}>{error} while adding / updating class</p>
            </div>
        </div>
        }
    }
}
export default ClassEdit;