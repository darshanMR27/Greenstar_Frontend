import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
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
      selData:[],
      groupName:"",
      schoolName:"",
      sectionName:"",
      classId:"",
      sectionId:""
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
   let selData = [];
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group/${this.props.match.params.id}`)).json();
      console.log(group);
      group.studentNames.forEach( selectedOption => 
        //console.log( `Selected: ${selectedOption.label}` ) 
        selData.push(JSON.stringify({label:selectedOption}))
      );
      this.setState(
        {item: group,
          groupName:group.label,
          schoolName: group.schoolName,
          sectionName:group.sectionName,
          classId: group.classId,
          sectionId:group.sectionId,
          selectedItems:group.studentNames,
          selectedStudentIds: group.studentIds,

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
    const selectedSchoolId = selectedSchool.id;
    this.setState({selectedSchoolName });
    this.setState({selectedSchoolId });
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
    const selectedClassId = selectedGrade.id;
    this.setState({selectedGradeValue });
    this.setState({selectedClassId });
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
    const selectedSectionId = selectedSection.id;
    this.setState({selectedSectionName});
    this.setState({selectedSectionId});
      return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student/section/`+selectedSection.id)
      .then(result => {
        console.log(result.label);
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
  handleEditMultiChange(selectedStudents) {
    this.setState({ selectedStudents });
    const selStudents =  [];
    selectedStudents.forEach( selectedOption => 
        //console.log( `Selected: ${selectedOption.label}` ) 
        selStudents.push(selectedOption.id)
    );
    this.setState({selStudents});
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  async handleGroupSubmit(event) {
    event.preventDefault();
    const {groupName, classId, sectionId } = this.state;
    let selId = this.props.match.params.id;
    //alert('sel Students = '+this.state.selStudents.length);
    //let schoolId = this.state.selectedSchoolId;
      if (selId !== 'new') {
        fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selId,
            size: this.state.selectedStudentIds.length,
            classId: classId,
            sectionId: sectionId,
            label: groupName,
            studentIds: this.state.selectedStudentIds
          })
        }).then(response => {
          this.setState({showUpdateForm: true});
          this.setState({showErrorForm: false});
        }).catch(error => {
          this.setState({showErrorForm: true});
          console.error("error", error);
          this.setState({
            error:`${error}`
          });
        });
      } else {
        if(this.state.selStudents.length > 5){
          this.setState({showErrorForm: true});
          this.setState({
            error:'Choose only 5 or less than 5 students for a group'
          });
        } else {
          let gradeId = this.state.selectedClassId;
          let sectionId = this.state.selectedSectionId;
          fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              size: this.state.selStudents.length,
              classId: gradeId,
              sectionId: sectionId,
              label: groupName,
              studentIds: this.state.selStudents
            })
          }).then(response => {
            this.setState({showAddForm: true});
            this.setState({showErrorForm: false});
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

  render() {
    const {item, groupName, sectionName, selectedSchool, selectedGrade, 
      selectedSection, selectedItems, schools, 
      grades, sections, students, schoolName, error} = this.state;
//    const title = <h2>{this.props.match.params.id ? 'Edit Group' : 'Add Group'}</h2>;
      const showAddGroup = {
        'display': this.state.showAddForm ? 'block' : 'none'
      };
      const showErrorGroup = {
        'display': this.state.showErrorForm ? 'block' : 'none'
      };
      const showUpdateGroup = {
        'display': this.state.showUpdateForm ? 'block' : 'none'
      };
    if (this.props.match.params.id !== 'new') {
      return <div className="dashboard">
        <Container>
          <h2>Edit Group</h2>
          <p key={error} className="errorText">{error}</p>
          <Form onSubmit={this.handleGroupSubmit}>
            <div className="row">
            <FormGroup className="col-md-3 mb-3">
              <Label for="name" style={{color:'white'}}>School Name</Label>
              <Input type="text" ref="schoolName" name="schoolName" id="schoolName" value={schoolName}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="grade" style={{color:'white'}}>Class or Grade</Label>
              <Input type="text" ref="grade" name="grade" id="grade" value={item.classId}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="sectionName" style={{color:'white'}}>Section</Label>
              <Input type="text" ref="sectionName" name="sectionName" id="sectionName"  value={sectionName}/>
            </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <Label for="groupName" style={{color:'white'}}>Group Name</Label>
                <Input type="text" ref="groupName" name="groupName" id="groupName" placeholder="Enter Group Name" onChange={e => this.handleEditChange(e)}  value={groupName}/>
              </FormGroup>
              </div>
            <div className="row">
              <FormGroup className="col-md-7 mb-3">
                <Label for="student" style={{color:'white'}}>Student's</Label>
                <MultiSelect items={students} selectedItems={selectedItems}/>
              </FormGroup>
            </div>
            <FormGroup>   
              <Button color="primary" type="submit">Update</Button>{' '}
              <Button color="success" tag={Link} to="/groups">Cancel</Button>
            </FormGroup>
          </Form>
          <div style={showUpdateGroup}>
                <p style={{color: 'darkblue'}}>{groupName} Group Updated successfully</p>
          </div>
          <div style={showErrorGroup}>
              <p style={{color: 'red'}}>{error} while adding / updating group</p>
          </div>
        </Container>
      </div>
    } else {
      return <div className="dashboard">
        <Container>
        <h2>Add Group</h2>
          <Form onSubmit={this.handleGroupSubmit}>
            <div className="row">
            <FormGroup className="col-md-3 mb-3">
              <Label for="name" style={{color:'white'}}>School Name</Label>
              <Select options={ schools } name="school" id="school" onChange={this.handleEditSchoolChange} value={selectedSchool}/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="grade" style={{color:'white'}}>Class or Grade</Label>
              <Select options={ grades } name="grade" id="grade" onChange={this.handleEditClassChange} value={selectedGrade}
                      />
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="section" style={{color:'white'}}>Section</Label>
              <Select options={ sections } name="section" id="section" onChange={this.handleEditSectionChange} value={selectedSection}/>
            </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <Label for="group" style={{color:'white'}}>Group Name</Label>
                <Input type="text" ref="groupName" name="groupName" id="groupName" placeholder="Enter Group Name" onChange={e => this.onChange(e)}  value={groupName}/>
              </FormGroup>
              </div>
            <div className="row">
              <FormGroup className="col-md-7 mb-3">
                <Label for="student" style={{color:'white'}}>Student's</Label>
                <MultiSelect items={students} selectedItems={selectedItems} onChange={this.handleEditMultiChange}/>
              </FormGroup>
            </div>
            <FormGroup>   
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="success" tag={Link} to="/groups">Cancel</Button>
            </FormGroup>
          </Form>
          <div style={showAddGroup}>
                <p style={{color: 'darkgreen'}}>{groupName} Group Added successfully</p>
        </div>
        <div style={showErrorGroup}>
            <p style={{color: 'red'}}>{error} while adding / updating group</p>
        </div>
        </Container>
      </div>
    }
  }
}
export default GroupEdit;