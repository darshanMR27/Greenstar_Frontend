import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
//import AppNavbar from './AppNavbar';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css"
import axios from 'axios';

function validate(schoolId, gradeName) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];
  if(schoolId === '' || schoolId === "undefined"){
      errors.push("School Name cannot be empty");
  } 
  if(gradeName === '' || gradeName === "undefined"){
    errors.push("Class or Grade cannot be empty");
  } else {
    if (gradeName > 10) {
        errors.push("Class or Grade should be 10 or less than 10");
    }
  }

  return errors;
}

class ClassEdit extends Component {
  emptyItem = {
      school:"",
      grade:"",
      gradeName:"",
      schoolName:"",
      errors:[]
  };

  state = {
    selectedSchool:null,
    selectedGrade:null,
    gradeName:null,
    schoolName:null,
    errors:[]
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
      gradeId:"",
      errors:[]
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
    const errors = validate(schoolId, gradeName);
    if (errors.length > 0) {
      this.setState({ errors });
      return false;
    } else {
      this.setState({errors:[]});
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
  }

  resetClass = async () => {
    if (this.props.match.params.id !== 'new') {
      this.setState({
        gradeName:'',
        errors:[],
        error:"",
        showAddForm:false,
        showErrorForm: false,
        showUpdateForm:false
      });
      this.setState({
        error:''
      });
    } else {
      this.setState({
        schoolName:'',
        gradeName:'',
        errors:[],
        error:"",
        showAddForm:false,
        showErrorForm: false,
        showUpdateForm:false
      });
      this.setState({
        error:''
      });
    }
    
  }

  render() {
    const {selectedSchool, gradeName,  schools, 
      schoolName, error, errors} = this.state;
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
                {errors.map(error =>(
                    <p key={error} className="errorText">{error}</p>
                ))}
                <div style={showUpdateClass}>
                    <p style={{color: 'darkblue'}}>{gradeName} Class Updated successfully</p>
                </div>
                <div style={showErrorClass}>
                    <p style={{color: 'red'}}>{error} while adding / updating class</p>
                </div>
                <div className="row">
                    <FormGroup className="col-md-3 mb-3">
                        <Label for="name" style={{color:'white'}}>School Name</Label>
                        <Input type="text" ref="schoolName" name="schoolName" id="schoolName" value={schoolName}/>
                    </FormGroup>
                    <FormGroup className="col-md-3 mb-3">
                        <Label for="gradeName" style={{color:'white'}}>Class or Grade</Label>
                        <Input type="text" ref="gradeName" name="gradeName" id="gradeName" placeholder="Enter Class Name" onChange={e => this.onChange(e)}  value={gradeName}/>
                    </FormGroup>
                </div>
                    <FormGroup>   
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" onClick={() => this.resetClass()}>reset</Button>
                    </FormGroup>
                </Form>
            </Container>
            
        </div>
    } else {
        return <div className="dashboard">
        <Container>
            <h2>Add Class</h2>
            <Form onSubmit={this.classSubmit}>
                {errors.map(error =>(
                    <p key={error} className="errorText">{error}</p>
                ))}
                <div style={showAddClass}>
                    <p style={{color: 'darkgreen'}}>{gradeName} Class Added successfully</p>
                </div>
                <div style={showErrorClass}>
                    <p style={{color: 'red'}}>{error} while adding / updating class</p>
                </div>
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
                        <Button color="secondary" onClick={() => this.resetClass()}>reset</Button>
                    </FormGroup>
                </Form>
            </Container>
            
        </div>
        }
    }
}
export default ClassEdit;