import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
class HolidayList extends Component {
  constructor(props) {
    super(props);
  this.state = {
    holidays: []
  };
  this.remove = this.remove.bind(this);
}

state = {
  loading:true,
  error:"", 
  holidays:[]
}

componentDidMount(){
  this.setState({showForm: true});
  return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/holiday/all`)
  .then(result => {
    console.log(result);
    this.setState({
        holidays: result.data, error:false});
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
    await fetch(`/api/school/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.schools].filter(i => i.id !== id);
      this.setState({schools: updatedGroups});
    });
  }

  render() {
    const {holidays, error } = this.state;
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
                    <Button color="success" onClick={() => this.hideHeader()}  tag={Link} to="/holidays/new">Add Holiday</Button>{'     '}
                  </FormGroup>
              </Form>
          </Container>
          </div>
            <div style={showHide}>
                <h2>List Holidays</h2>
                <Table className="mt-4">
                  <thead>
                    <tr>
                      <th width="20%">Holiday Date</th>
                      <th width="20%">Holiday Description</th>
                      <th width="20%">Public Holiday</th>
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{color: '#dee2e6'}}>
                  {holidays.map(holiday => (
                    <tr key={holiday.id}>
                      <td>{holiday.date}</td>
                      <td>{holiday.details}</td>
                      <td>{holiday.publicHoliday}</td>
                      <td>
                        <ButtonGroup>
                          <Button size="sm" color="primary" onClick={() => this.hideHeader()} tag={Link} to={"/holidays/"+ holiday.id}>Edit</Button>
                          <Button size="sm" color="danger" onClick={() => this.remove(holiday.id)}>Delete</Button>
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

export default HolidayList;