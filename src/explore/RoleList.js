import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
class RoleList extends Component {
  emptyItem = {
    roleName:""
  };

  state = {
    loading:true,
    error:"",
    data: [],
  }
  constructor(props) {
    super(props);
  }
    componentDidMount(){
      this.setState({showForm: true});
      return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/roles/all`)
      .then(result => {
        console.log(result);
        this.setState({
          data: result.data, error:false});
        }).catch(error => {
        console.error("error", error);
        this.setState({
          error:`${error}`
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

  // async remove(id) {
  //   await fetch(`/api/group/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(() => {
  //     let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
  //     this.setState({groups: updatedGroups});
  //   });
  // }

  render() {
    const {error, data} = this.state;
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
                    <Button color="success" onClick={() => this.hideHeader()}  tag={Link} to="/roles/new">Add Role</Button>{'     '}
                  </FormGroup>
              </Form>
          </Container>
          </div>
          <div style={showHide}>
                <h2>List Roles</h2>                        
                <Table className="mt-4">
                  <thead>
                    <tr>
                      <th width="10%">Role Name</th>
                      <th width="10%">Privilages</th>
                      <th width="10%">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{color: '#dee2e6'}}>
                  {data.map(role => (
                    <tr key={role.id}>
                      <td style={{whiteSpace: 'nowrap'}}>{role.label}</td>
                      {role.privilages.map(privilage => (
                        <tr style={{whiteSpace: 'normal'}}>{privilage.label}</tr>
                      ))}
                      <td>
                        <ButtonGroup>
                          <Button size="sm" color="primary" onClick={() => this.hideHeader()} tag={Link} to={"/roles/"+ role.label}>Edit</Button>
                          <Button size="sm" color="danger" disabled>Delete</Button>
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

export default RoleList;