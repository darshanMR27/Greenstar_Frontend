import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';

class SchoolList extends Component {
  constructor(props) {
    super(props);
  this.state = {
    school:"",
    section:"",
    grade:"",
    student:"",
    schools: []
  };
  this.remove = this.remove.bind(this);
}

state = {
  loading:true,
  error:"", 
  schools:[],
  schoolName:"",
  maxGrade:"",
  address:"",
  pinCode:"",
  city:""
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

  viewSchool = async () => {
    this.setState({showForm: true});
  }
  
  hideHeader = async () => {
    this.setState({showForm: false,
    schoolName:"",maxGrade:"",address:"",pinCode:"",city:""});
    this.props.history.push('/schools/new');
  }

  async remove(id) {
    await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/school/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedSchools = [...this.state.schools].filter(i => i.id !== id);
      this.setState({schools: updatedSchools});
    });
  }

  render() {
    const {schools, error } = this.state;
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
                    <Button color="success" onClick={() => this.hideHeader()}  tag={Link} to="/schools/new">Add School</Button>{'     '}
                  </FormGroup>
              </Form>
          </Container>
        </div>
            <div style={showHide} >
                <h2>List School</h2>
                <Table className="mt-4 sortable">
                  <thead>
                    <tr>
                      <th width="20%">Name</th>
                      <th width="20%">Max Grade or Class</th>
                      <th width="20%">Adress</th>
                      <th width="10%">Pin Code</th>
                      <th width="10%">City</th>
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{color: '#dee2e6'}}>
                  {schools.map(school => (
                  <tr key={school.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{school.label}</td>
                    <td>{school.maxClassGrade}</td>
                    <td>{school.address}</td>
                    <td>{school.pincode}</td>
                    <td>{school.city}</td>
                    <td> 
                      <ButtonGroup>
                        <Button size="sm" color="primary" onClick={() => this.hideHeader()} tag={Link} to={"/schools/" + school.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(school.id)}>Delete</Button>
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

export default SchoolList;