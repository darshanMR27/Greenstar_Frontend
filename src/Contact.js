import React, {Component} from 'react';
import contacts from './images/contacts.jpg';
class Contact extends Component{
 render(){
return (
<div style={{ background: `url('${contacts}') no-repeat center center`}}>
    <h1>
    Contacts
    </h1>
    <p><h3>Nandish</h3>+91 9741701970</p>
    <p><h3>Darshan</h3>+91 8904415283</p>
    <p><h3>Somashekar</h3>+91 8892226245</p>
</div>
)
 }
}

export default Contact;