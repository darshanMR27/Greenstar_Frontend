import React, { Component } from 'react';
import { Link, withRouter, BrowserRouter as Router} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
//import AppNavbar from './AppNavbar';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import MultiSelect from "@kenshooui/react-multi-select";
import axios from 'axios';

class GroupEdit extends Component {
  emptyItem = {
      school:"",
      section:"",
      grade:"",
      student:"",
      groupName:"",
      schoolName:"",
      sectionName:""
  };

  state = {
    selectedSchool:null,
    selectedGrade:null,
    selectedSection:null,
    groupName:"",
    schoolName:"",
    sectionName:""
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      schools : [],
      grades : [],
      sections : [],
      students : [],
      selectedItems: [],
      groupName:"",
      schoolName:"",
      sectionName:""
    };
    this.handleEditSchoolChange = this.handleEditSchoolChange.bind(this);
    this.handleEditClassChange = this.handleEditClassChange.bind(this);
    this.handleEditSectionChange = this.handleEditSectionChange.bind(this);
    this.handleEditMultiChange = this.handleEditMultiChange.bind(this);
    this.handleGroupSubmit = this.handleGroupSubmit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  async componentDidMount() {
   // alert('GroupID = '+this.props.match.params.id);
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group/${this.props.match.params.id}`)).json();
      console.log(group);
      this.setState(
        {item: group,
          groupName:group.label,
          schoolName: group.schoolName,
          sectionName:group.sectionName,
          selectedItems:group.studentNames
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

  handleEditSchoolChange = (selectedSchool) => {
    const selectedSchoolName = selectedSchool.name;
    this.setState({selectedSchoolName });
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
  handleEditClassChange = (selectedGrade) => {
    const selectedGradeValue = selectedGrade.name;
    this.setState({selectedGradeValue });
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

  handleEditChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  handleEditSectionChange = (selectedSection) => {
    const selectedSectionName = selectedSection.name;
    this.setState({selectedSectionName });
      return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student/section/`+selectedSection.id)
      .then(result => {
        console.log(result);
        this.setState({
          students: result.data,
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
  handleEditMultiChange(selectedItems) {
    this.setState({ selectedItems });
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  async handleGroupSubmit(event) {
    const bodyFormData = new FormData();
    if (this.props.match.params.id !== 'new') {  
      axios.put('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group/', {
        //method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyFormData),
      });
    } else {
      const {selectedSchool, selectedGrade, selectedSection, groupName } = this.state;
       bodyFormData.set('schoolName', this.state.selectedSchoolName);
        bodyFormData.set('grade', this.state.selectedGradeValue);
        bodyFormData.set('sectionName', this.state.selectedSectionName);
        bodyFormData.set('name', groupName);
        console.log('Darshan = '+bodyFormData);
      axios.post('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group/', {
       // method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyFormData),
      });
    }
    this.props.history.push('/groups');
  }

  render() {
    const {item, groupName, sectionName, selectedSchool, selectedGrade, 
      selectedSection, selectedItems, schools, 
      grades, sections, students, schoolName} = this.state;
//    const title = <h2>{this.props.match.params.id ? 'Edit Group' : 'Add Group'}</h2>;
    if (this.props.match.params.id !== 'new') {
      return <div className="app">
        <Container>
          <h2>Edit Group</h2>
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
            <FormGroup className="col-md-3 mb-3">
              <Label for="name">School Name</Label>
              <Input type="text" ref="schoolName" name="schoolName" id="schoolName" value={schoolName}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="grade">Class or Grade</Label>
              <Input type="text" ref="grade" name="grade" id="grade" value={item.classId}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="sectionName">Section</Label>
              <Input type="text" ref="sectionName" name="sectionName" id="sectionName"  value={sectionName}/>
            </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <Label for="groupName">Group Name</Label>
                <Input type="text" ref="groupName" name="groupName" id="groupName" placeholder="Enter Group Name" onChange={e => this.handleEditChange(e)}  value={groupName}/>
              </FormGroup>
              </div>
            <div className="row">
              <FormGroup className="col-md-7 mb-3">
                <Label for="student">Student's</Label>
                <MultiSelect items={students} selectedItems={selectedItems} onChange={this.handleMultiChange}/>
              </FormGroup>
            </div>
            <FormGroup>   
              <Button color="primary" type="submit">Update</Button>{' '}
              <Button color="success" tag={Link} to="/groups">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    } else {
      return <div className="app">
        <Container>
        <h2>Add Group</h2>
          <Form onSubmit={this.handleGroupSubmit}>
            <div className="row">
            <FormGroup className="col-md-3 mb-3">
              <Label for="name">School Name</Label>
              <Select options={ schools } name="school" id="school" onChange={this.handleEditSchoolChange} value={selectedSchool}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="grade">Class or Grade</Label>
              <Select options={ grades } name="grade" id="grade" onChange={this.handleEditClassChange} value={selectedGrade}
                      />
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="section">Section</Label>
              <Select options={ sections } name="section" id="section" onChange={this.handleEditSectionChange} value={selectedSection}/>
            </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <Label for="group">Group Name</Label>
                <Input type="text" ref="groupName" name="groupName" id="groupName" placeholder="Enter Group Name" onChange={e => this.onChange(e)}  value={groupName}/>
              </FormGroup>
              </div>
            <div className="row">
              <FormGroup className="col-md-7 mb-3">
                <Label for="student">Student's</Label>
                <MultiSelect items={students} selectedItems={selectedItems} onChange={this.handleEditMultiChange}/>
              </FormGroup>
            </div>
            <FormGroup>   
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="success" tag={Link} to="/groups">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    }
  }
}
export default GroupEdit;