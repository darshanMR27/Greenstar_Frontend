import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
class GroupList extends Component {
  emptyItem = {
    school:"",
    section:"",
    grade:"",
    student:"",
    groupName:""
  };

  state = {
    loading:true,
    error:"",
    data: [],
    selectedSchool:"", 
    selectedGrade:"", 
    selectedSection:"", 
    schools:[],
    grades:[],
    sections:[]
  }
  constructor(props) {
    super(props);
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
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
     // alert("selectedGrade="+selectedSchool.id);
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
    handleSectionChange = (selectedSection) => {
      this.setState({ selectedSection });
      //alert("selectedSection="+selectedSection);
      return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group/section/`+selectedSection.id)
      .then(result => {
        console.log(result);
        this.setState({
          data: result.data,
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

  viewGroups = async () => {
    this.setState({showForm: true});
  }
  
  hideHeader = async () => {
    this.setState({showForm: false});
    this.setState({groupName:""});
    //this.props.history.push('/groups');
  }

  async remove(id) {
    await fetch(`/api/group/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
      this.setState({groups: updatedGroups});
    });
  }

  render() {
    const {error, data, selectedSchool, selectedGrade, selectedSection, schools,grades,sections } = this.state;
    const showHide = {
      'display': this.state.showForm ? 'block' : 'none'
    };
    if(error){
      return (
          <p>
            There was an error loading the response.. {'  '}
            <Button color="primary" onClick={() => this.viewGroups()}  tag={Link} to="/groups">Try Again</Button>
          </p>
      );
    }
    return ( 
      <div>
          <div className="row float-right">
            <Container>
              <Form>
                  <FormGroup>
                    <Button color="success" onClick={() => this.hideHeader()}  tag={Link} to="/groups/new">Add Group</Button>{'     '}
                  </FormGroup>
              </Form>
          </Container>
        </div>
        <div style={showHide}>
            <h2>List Group</h2>
            <tr className="row">
              <td className="col-md-3 mb-3">
                  <Label for="name">School Name</Label>
                  <Select options={schools} name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}/>
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
                  <th width="10%">Name</th>
                  <th width="10%">School Name</th>
                  <th width="10%">Class Name</th>
                  <th width="10%">Section Name</th>
                  <th width="10%">Student Name(s)</th>
                  <th width="20%">Action</th>
                </tr>
              </thead>
              <tbody style={{color: '#dee2e6'}}>
              {data.map(group => (
                <tr key={group.id}>
                  <td style={{whiteSpace: 'nowrap'}}>{group.label}</td>
                  <td>{group.schoolName}</td>
                  <td>{group.className}</td>
                  <td>{group.sectionName}</td>
                  <td>
                      {group.studentNames.map(student => (
                        <tr>{student}</tr>
                      ))}
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" color="primary" onClick={() => this.hideHeader()} tag={Link} to={"/groups/"+ group.id}>Edit</Button>
                      <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                  </td>
                </tr> ))}
              </tbody>
            </Table>
          </div>
      </div>
    );
  }
}

export default GroupList;