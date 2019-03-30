import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import "@kenshooui/react-multi-select/dist/style.css";
import MultiSelect from "@kenshooui/react-multi-select";
import axios from 'axios';
import CryptoJS from 'crypto-js';

class RoleEdit extends Component {
  emptyItem = {
      roleName: "",
      rolePassword:""
  };

  state = {
    roleName: "",
    rolePassword:"",
    privilages : []
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      privilages : [],
      selectedItems: []
    };
    this.onChange = this.onChange.bind(this);
    this.roleSubmit = this.roleSubmit.bind(this);
    this.handlePrivilageschange = this.handlePrivilageschange.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const role = await (await fetch(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/roles/${this.props.match.params.id}`)).json();
      console.log(role);
      this.setState(
        {item: role,
          roleName:role.label,
          rolePassword:role.password,
          selectedItems:role.privilages
        });
    } else {
      this.setState({showForm: true});
      return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/roles/privilages`)
      .then(result => {
        console.log(result);
        this.setState({
          privilages: result.data, 
          error:false});
        }).catch(error => {
        console.error("error", error);
        this.setState({
          error:`${error}`
        });
      });
    }
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  handlePrivilageschange(selectedItems) {
    // selectedItems.forEach( selectedOption => 
    //   console.log( `Selected: ${selectedOption.id}` ) 
    // );
    this.setState({ selectedItems });
  }

  async roleSubmit(event) {
    event.preventDefault();
    const {roleName, rolePassword} = this.state;
    const selId = this.props.match.params.id;
    if (selId !== 'new') {  
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/roles/update', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //id: selId,
          label: roleName,
          privilages: this.state.selectedItems
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
      var encryptedPwd = CryptoJS.AES.encrypt(rolePassword, 'secret key 123').toString();
       console.log("encrypted text", encryptedPwd);
      return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/roles/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: roleName,
          privilages: this.state.selectedItems,
          password:encryptedPwd
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
    const {item, error, roleName, rolePassword, privilages, selectedItems} = this.state;
    const showAddRole = {
      'display': this.state.showAddForm ? 'block' : 'none'
    };
    const showErrorRole = {
      'display': this.state.showErrorForm ? 'block' : 'none'
    };
    const showUpdateRole = {
      'display': this.state.showUpdateForm ? 'block' : 'none'
    };
    const title = <h2>{item.id ? 'Edit Role' : 'Add Role'}</h2>;
    return <div className="dashboard">
      <Container>
        {title}
        <Form onSubmit={this.roleSubmit}>
          <div className="row">
                <FormGroup className="col-md-3 mb-3">
                    <Label for="roleName" style={{color:'white'}}>Role Name</Label>
                    <Input type="text" ref="roleName" name="roleName" id="roleName" placeholder="Enter Role Name" onChange={e => this.onChange(e)}  value={roleName}/>
                </FormGroup>
                <FormGroup className="col-md-3 mb-3">
                    <Label for="rolePassword" style={{color:'white'}}>Password</Label>
                    <Input ref="rolePassword"  name="rolePassword" placeholder="Enter Role Password" 
                        type="password"
                        onChange={e => this.onChange(e)} 
                        value={rolePassword} />
                </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-7 mb-3">
                <Label for="student" style={{color:'white'}}>Privilage's</Label>
                <MultiSelect items={privilages} selectedItems={selectedItems} onChange={this.handlePrivilageschange}/>
              </FormGroup>
            </div>
            <div>
              <FormGroup>   
                <Button color="primary" type="submit">Save</Button>{' '}
                <Button color="success" tag={Link} to="/roles">Cancel</Button>
              </FormGroup>
          </div>
          <div style={showAddRole}>
              <p style={{color: 'darkgreen'}}>{roleName} role Added successfully</p>
            </div>
            <div style={showErrorRole}>
                <p style={{color: 'red'}}>{error} while adding / updating role</p>
            </div>
            <div style={showUpdateRole}>
                <p style={{color: 'blue'}}>{roleName} role Updated successfully</p>
            </div>
        </Form>
      </Container>
    </div>
  }
}
export default RoleEdit;