import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
class ClassList extends Component {
  constructor(props) {
    super(props);
  this.state = {
    school:"",
    grade:"",
    grades: [],
    showForm: false,
    schools : [],
    selectedItems: []
  };
  this.handleSchoolChange = this.handleSchoolChange.bind(this);
  this.remove = this.remove.bind(this);
}
componentDidMount(){
  this.setState({showForm: false});
  this.setState({showSchoolForm: true});
  
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
         this.setState({showForm: true});
       }).catch(error => {
       console.error("error", error);
       this.setState({
         error:`${error}`
       });
     });
   }

   viewGrades = async () => {
    this.setState({showForm: true});
  }
  
  hideHeader = async () => {
    this.setState({showForm: false});
    this.setState({groupName:""});
    this.setState({showForm: false});
    this.setState({showSchoolForm: false});
    //this.props.history.push('/groups');
  }

  async remove(id) {
    await fetch(`/api/class/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedClasses = [...this.state.grades].filter(i => i.id !== id);
      this.setState({grades: updatedClasses});
    });
  }

  render() {
    const {grades, selectedSchool,
      schools } = this.state;
      const showHide = {
        'display': this.state.showForm ? 'block' : 'none'
      };
      const showHideSchool = {
        'display': this.state.showSchoolForm ? 'block' : 'none'
      };
      
    return (
      <div>
          <div className="row float-right">
            <Container>
              <Form>
                  <FormGroup>
                    <Button color="success" onClick={() => this.hideHeader()} tag={Link} to="/grades/new">Add Class</Button>{'     '}
                  </FormGroup>
              </Form>
            </Container>
          </div>
          <div style={showHideSchool}>
              <h2>List Class</h2>
                  <Container>
                    <Form>
                      <FormGroup className="col-md-3 mb-3">
                        <Label for="name" style={{color:'white'}}>School Name</Label>
                        <Select options={ schools } name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}/>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
            <div style={showHide}>
                <Table className="mt-4">
                  <thead>
                    <tr>
                      <th className="thStyle" width="20%">Grade</th>
                      <th className="thStyle" width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{color: '#dee2e6'}}>
                  {grades.map(grade => (
                    <tr key={grade.id}>
                        <td className="thStyle">{grade.label}</td>
                        <td className="thStyle">
                        <ButtonGroup>
                            <Button size="sm"  color="primary" onClick={() => this.hideHeader()}  tag={Link} to={"/grades/" + grade.id}>Edit</Button>
                            <Button size="sm"  color="danger" onClick={() => this.remove(grade.id)} disabled>Delete</Button>
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

export default ClassList;