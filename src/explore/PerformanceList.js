import React, { Component } from 'react';
import { Button, Input, Container, Table, Form, FormGroup, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
class PerformanceList extends Component {
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
    sections:[],
    groups:[],
    students:[],
    selectDate: new Date(),
    isAttendance: true,
    isDiscipline: true,
    isHomeWork: true,
    selected: {}
  }
  constructor(props) {
    super(props);
    this.state= {
      students:[],
      isAttendance: false,
      isDiscipline: false,
      isHomeWork: false
    };
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.performSubmit = this.performSubmit.bind(this);
    this.toggleChangeAtt = this.toggleChangeAtt.bind(this);
    this.toggleChangeDis = this.toggleChangeDis.bind(this);
    this.toggleChangeHome = this.toggleChangeHome.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
}



componentDidMount(){
    this.setState({showForm: false});
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
//        alert("selectedGrade="+selectedSchool.id);
    this.setState({ selectedSchool });
    const bodyFormData = new FormData();
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
  handleSectionChange = (selectedSec) => {
    this.setState({ selectedSec });
    //alert("selectedSection="+selectedSection);
    return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/group/section/`+selectedSec.id)
    .then(result => {
      console.log(result);
      this.setState({
        groups: result.data,
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

  handleGroupChange = (selectedGroup) => {
    this.setState({ selectedGroup });
    //alert("selectedSection="+selectedSection);
    return axios.get(`http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/student/group/`+selectedGroup.id)
    .then(result => {
      console.log(result);
      this.setState({
        students: result.data,
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

  handleSelectDateChange = selectDate => this.setState({ selectDate })

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  toggleRow = (studentName) => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[studentName] = !this.state.selected[studentName];
    this.setState({
      isAttendance: newSelected
    });
  }
  
  toggleChangeAtt = (e, studentName, perValue) => {
    var data = {};
    if(perValue === 'attendance'){
      // this.setState({
      //   isAttendance: e.target.checked
      // });
      const newSelected = Object.assign({}, this.state.isAttendance);
      newSelected[studentName] = !this.state.isAttendance[studentName];
      var att = data.isAttendance;
      this.setState({
        att : newSelected
      });
    } else if (perValue === 'discipline'){
      const newSelected1 = Object.assign({}, this.state.isDiscipline);
      newSelected1[studentName] = !this.state.isDiscipline[studentName];
      this.setState({
        isDiscipline: newSelected1
      });
    } else {
      const newSelected2 = Object.assign({}, this.state.isHomeWork);
      newSelected2[studentName] = !this.state.isHomeWork[studentName];
      this.setState({
        isHomeWork: newSelected2
      });
    }
    alert(this.state.isAttendance);
    alert(this.state.isDiscipline);
    alert(this.state.isHomeWork);
    data.push(JSON.stringify ({
        student:studentName,
        attendance:this.state.isAttendance,
        discipline:this.state.isDiscipline,
        homework:this.state.isHomeWork
    }));
    data.forEach (selData =>
      console.log('Darshan = '+selData)
    )
    
  }
  
  toggleChangeDis = (studentName) => {
    const newSelected = Object.assign({}, this.state.isDiscipline);
    newSelected[studentName] = !this.state.isDiscipline[studentName];
    this.setState({
      isDiscipline: newSelected
    });
  }
  
  toggleChangeHome = (studentName) => {
    const newSelected = Object.assign({}, this.state.isHomeWork);
    newSelected[studentName] = !this.state.isHomeWork[studentName];
    this.setState({
      isHomeWork: newSelected
    });
  }

  performSubmit = async () => {
    const{selectDate, students, isAttendance, isDiscipline, isHomeWork} = this.state;
    let formatSelectedDate = new Intl.DateTimeFormat("fr-ca", {year: 'numeric', month: '2-digit',day: '2-digit'}).format(selectDate);
    let arr = [];
    alert(this.state.isAttendance);
    alert(this.state.isDiscipline);
    alert(this.state.isHomeWork);
    alert(isAttendance);
    alert(isDiscipline);
    alert(isHomeWork);
    students.forEach( student =>
      alert(student.label)
    )
    // for (var key in this.state) {
    //   if(this.state[key] === true) {
    //     arr.push(1);
    //   } else {
    //     arr.push(0);
    //   }
    // }
    // let data = {
    //   check: arr.toString() 
    // };
    arr.forEach( selectedOption => 
      console.log( `Selected: ${selectedOption}` ) 
    );
    //console.log("Data = "+data+", selected Date = "+formatSelectedDate);
     
      // return fetch('http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/roles/add', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     label: roleName,
      //     privilages: this.state.selectedItems,
      //     password:encryptedPwd
      //   })
      // }).then(response => {
      //   this.setState({showAddForm: true});
      // }).catch(error => {
      //   this.setState({showErrorForm: true});
      //   console.error("error", error);
      //   this.setState({
      //     error:`${error}`
      //   });
      // });
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
    const {error, students, selectedSchool, selectedGrade, 
      selectedSection, selectedGroup, schools,grades,sections, groups } = this.state;
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
        <div>
            <h2>Add Student Performance</h2>
            <tr className="row">
                <td className="col-md-3 mb-3 monthPickerClass">
                    <Label for="joiningDate">Select A Date</Label>
                    <DatePicker selected={this.state.selectDate} className="datePicker" placeholderText="Select Date" onChange={this.handleSelectDateChange} dateFormat="dd/MM/yyyy"/>
                </td>
                <td className="col-md-3 mb-3">
                    <Label for="name">School Name</Label>
                    <Select options={ schools } name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}/>
                </td>
                <td className="col-md-3 mb-3">
                    <Label for="grade">Class or Grade</Label>
                    <Select options={ grades } name="grade" id="grade" onChange={this.handleClassChange} value={selectedGrade}/>
                </td>
                    <td className="col-md-3 mb-3">
                    <Label for="section">Section</Label>
                    <Select options={ sections } name="section" id="section" onChange={this.handleSectionChange} value={selectedSection}/>
                </td>
                <td className="col-md-3 mb-3">
                    <Label for="section">Group</Label>
                    <Select options={ groups } name="group" id="group" onChange={this.handleGroupChange} value={selectedGroup}/>
                </td>
            </tr>                        
            <Table className="mt-4">
              <thead>
                <tr>
                  <th width="10%">Student Name</th>
                  <th width="10%">Attendance</th>
                  <th width="10%">Discipline</th>
                  <th width="10%">Home Work</th>
                </tr>
              </thead>
              <tbody style={{color: '#dee2e6'}}>
              {students.map(student => (
                <tr key={student.id}>
                  <td style={{whiteSpace: 'nowrap'}}>{student.label}</td>
                  <td><Input type="checkbox" checked={this.state.isAttendance} onChange={() => this.toggleChangeAtt(student.label, 'attendance')} /></td>
                  <td><Input type="checkbox" checked={this.state.isDiscipline[student.label] === true} onChange={() => this.toggleChangeAtt(student.label, 'discipline')} /></td>
                  <td><Input type="checkbox" checked={this.state.isHomeWork[student.label] === true} onChange={() => this.toggleChangeAtt(student.label, 'homework')} /></td>
                  
                </tr> ))}
              </tbody>
            </Table>
            <Button color="success" onClick={() => this.performSubmit()}>Save</Button>{'     '}
            <Button color="success" tag={Link} to="/performance">Cancel</Button>
          </div>
      </div>
    );
  }
}

export default PerformanceList;