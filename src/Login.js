import React, {Component} from 'react';
import { Button, Input, FormGroup, Form, Container, Label } from 'reactstrap';
import { Link, BrowserRouter as Router, Redirect } from 'react-router-dom';
//import { Base64 } from 'js-base64';
// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
//import PropTypes from 'prop-types';
import "./cssstyles/Common.css";
import "./cssstyles/index.css";
import axios from 'axios';
import App from './App';

function validate(roleName, password) {
    // we are going to store errors for all fields
    // in a signle array
   // alert(roleName +", Pwd = "+password);
    const errors = [];
    if(roleName === '' || roleName === "undefined"){
        errors.push("Role Name cannot be empty");
    } else {
        if (roleName.length < 5) {
            errors.push("Role Name should be at least 10 charcters long");
        }
        if (password.length < 6) {
            errors.push("Password should be at least 6 characters long");
        }
    }
    return errors;
  }
class Login extends Component {

    state = {
       roleName:null,
       password:null,
       errors:[]
      }
    constructor(props) {
        super(props);
        this.state = {
            roleName: "",
            password: "",
            errors: []
          };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onChange = (e) => {
        if (e.target.name === 'isAdmin') {
            this.setState({
                [e.target.name]: e.target.checked,
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    resetForm = async () => {
        this.setState({
            roleName:'',
            password:''
        })
    }
    handleSubmit = async () => {
        const { roleName, password} = this.state;
        const errors = validate(roleName, password);
    //    var ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
    //    console.log("encrypted text", ciphertext);
        if (errors.length > 0) {
            this.setState({ errors });
            return false;
         } else {
            this.setState({showForm: true});
            // return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/roles/`+roleName)
            // .then(result => {
            //   console.log(result);
            //   this.setState({
            //     privilages: result.data, 
            //     error:false});
            //   }).catch(error => {
            //   console.error("error", error);
            //   this.setState({
            //     error:`${error}`
            //   });
            // });
            return <Redirect to='/App' />;
         }
         
    }

    render() {
        const { errors, roleName, password} = this.state;
        //const {header,main,footer} = this.props; 
        
        return (
            <div  className="dashboard">
                <Container>
                    <Form className="loginForm">
                        {errors.map(error =>(
                            <p key={error} className="loginErrorText">{error}</p>
                        ))}
                        <FormGroup className="col-md-5 mb-5">
                            <Label for="roleName">Role Name</Label>
                            <Input type="text" ref="roleName" name="roleName" id="roleName" placeholder="Enter Role Name" onChange={e => this.onChange(e)}  value={roleName}/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-5">
                            <Label for="password">Password</Label>
                            <Input ref="password"  name="password" placeholder="Enter Password" 
                                    type="password"
                                    onChange={e => this.onChange(e)} 
                                    value={password} />
                            
                        </FormGroup>
                        <FormGroup style={{paddingLeft:'1.2em'}}>
                            <Button color="success" onClick={() => this.handleSubmit()}>Login</Button>{'     '}
                            <Button color="success" onClick={() => this.resetForm()}>Reset</Button>{'     '}
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default Login;