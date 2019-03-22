import React, {Component} from 'react';
import { Button, Input, FormGroup, Form, Container, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

function validate(email, password) {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    if(email === '' || email === "undefined"){
        errors.push("Email cannot be empty");
    } else {
        if (email.length < 5) {
            errors.push("Email should be at least 5 charcters long");
        }
        if (email.split("").filter(x => x === "@").length !== 1) {
            errors.push("Email should contain a '@' symbol");
        }
        if (email.indexOf(".") === -1) {
            errors.push("Email should contain at least one dot");
        }
        if (password.length < 6) {
            errors.push("Password should be at least 6 characters long");
        }
    }
    return errors;
  }
class Login extends Component {
    state = {
       email:null,
       password:null,
       errors:[]
      }
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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

    handleSubmit = async () => {
        
        const { email, password} = this.state;
        const errors = validate(email, password);
       // this.props.onChange(this.state.email);
       //alert(errors);
        if (errors.length > 0) {
            this.setState({ errors });
            return false;
         } 
         //else {
        //     //alert('Inside else condition');
        //     window.location = './App';
        //   }
    }

    render() {
        const { errors } = this.state;
        //const {header,main,footer} = this.props;
        const email = this.state.email;  
        const password = this.state.password;  
        return (
            <div  className="dashboard">
                <Container>
                    <Form style={{paddingLeft: '25em'}}>
                        <FormGroup className="col-md-5 mb-5">
                            <Label for="email">Role Name</Label>
                            <Input type="text" ref="email" name="email" id="email" placeholder="Enter Role Name" onChange={e => this.onChange(e)}  value={email}/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-5">
                            <Label for="password">Password</Label>
                            <Input ref="password"  name="password" placeholder="Enter Password" 
                                type="password"
                                onChange={e => this.onChange(e)} 
                                value={password} />
                        </FormGroup>
                        <FormGroup style={{paddingLeft:'1.2em'}}>
                            <Button color="success" onClick={() => this.handleSubmit()} tag={Link} to={"/apps/" + email}>Login</Button>{'     '}
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default Login;