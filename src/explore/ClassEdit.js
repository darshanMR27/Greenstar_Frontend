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
      schoolName:""
    };
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    // alert('GroupID = '+this.props.match.params.id);
     if (this.props.match.params.id !== 'new') {
       const grade = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/class/${this.props.match.params.id}`)).json();
       console.log(grade);
       this.setState(
         {item: grade,
           gradeName:grade.label,
           schoolName:grade.schoolId
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
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(event) {
    //event.preventDefault();
    const {item, selectedSchool, selectedGrade} = this.state;
    //alert(selectedItems.length);   
  //   alert('School = '+selectedSchool.label);
  //  alert('Grade = '+selectedGrade.label);
  //   alert('Section = '+selectedSection.label);
  //   alert('Group = '+groupName);
    alert(item.id);
    await fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080//api/v1/class', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/grades');
  }

  render() {
    const {item, selectedSchool, gradeName,  schools, 
      grades, schoolName} = this.state;
    //const title = <h2>{item.id ? 'Edit Class' : 'Add Class'}</h2>;
    if (this.props.match.params.id !== 'new') {
        return <div className="app">
        <Container>
            <h2>Edit Class</h2>
            <Form onSubmit={this.handleSubmit}>
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
        </div>
    } else {
        return <div className="app">
        <Container>
            <h2>Add Class</h2>
            <Form onSubmit={this.handleSubmit}>
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
        </div>
        }
    }
}
export default ClassEdit;