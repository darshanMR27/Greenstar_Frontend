import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Label} from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
class Report extends Component {
  state = {
    loading:true,
    error:"",
    reportData: [],
    performanceData: [],
    numberOfDays:"",
    selectedSchool:"", 
    selectedGrade:"", 
    selectedSec:"", 
    selectedGroup:"",
    selectedStudent:"",
    schools:[],
    grades:[],
    sections:[],
    groups:[],
    students:[],
    attendanceDetails:[],
    fromDate: new Date(),
    toDate: new Date()
}
constructor(props) {
    super(props);
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
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

  handleStudentChange = (selectedStudent) => {
    this.setState({ selectedStudent });
  }

  onSubmit = async () => {
    const selectedStudId = this.state.selectedStudent.id;
    const selectedGroupId = this.state.selectedGroup.id;
    const selectedGradeId = this.state.selectedGrade.id;
    alert('0000 = '+selectedStudId + ", 111 = "+selectedGroupId +", 222 = "+selectedGradeId);
    const fromDate = new Intl.DateTimeFormat("fr-ca", {year: 'numeric', month: '2-digit',day: '2-digit'}).format(this.state.fromDate);
    const toDate = new Intl.DateTimeFormat('fr-ca', {month: '2-digit',year: 'numeric', day: '2-digit'}).format(this.state.toDate);
    //if(selectedStudId !== null || selectedStudId !== 'undefined'){
      axios.get("http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/reports/group/"+selectedGroupId+"?fromDate="+fromDate+"&toDate="+toDate).then(result => {
      console.log('Darshan = '+result);
      this.setState({
          reportData: result.data,
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
  //}
  this.setState({showForm: true});
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  handleFromDateChange = fromDate => this.setState({ fromDate });
  handleToDateChange = toDate => this.setState({ toDate });

    render() {
      const {error, reportData, selectedSchool, selectedGrade, 
        selectedSec,selectedGroup,selectedStudent, 
        schools,grades,sections, groups, students,fromDate, toDate, performanceData } = this.state;
      const showHide = {
        'display': this.state.showForm ? 'block' : 'none'
      };
      if(error){
          return (
              <p>
                There was an error loading the response.. {'  '}
                <Button color="primary" onClick={() => this.viewGroups()}  tag={Link} to="/dashboard">Try Again</Button>
              </p>
          );
      }
      var thc = [];
      var dateLoaded = false;
     
      for(var i=0;i<reportData.length;i++){
        var l=Object.keys(reportData[i].performanceData).length;      
        for(var j=0;j<l;j++){
           
            if(!dateLoaded){
              thc.push(
                <TableHeaderColumn  row='0' colSpan='3' headerAlign='center' dataField={reportData[i].performanceData[j].date} >{reportData[i].performanceData[j].date}</TableHeaderColumn>,
              );
              dateLoaded = true;
            } 
          else {
            reportData[i].attendance = reportData[i].performanceData[j].attendance;
            reportData[i].discipline = reportData[i].performanceData[j].discipline;
            reportData[i].homeWork = reportData[i].performanceData[j].homeWork;
            thc.push(
                <TableHeaderColumn row='1' dataField='attendance'>Attendance</TableHeaderColumn>,
                <TableHeaderColumn row='1' dataField="discipline">Discipline</TableHeaderColumn>,
                <TableHeaderColumn row='1' dataField="homeWork">Home Work</TableHeaderColumn>,
              );
              dateLoaded = false;
            }      
         }
        }
        return (
          <div className="dashboard">
            <tr className="row">
                <td className="col-md-3 mb-3 monthPickerClass">
                    <Label for="joiningDate">From Date</Label>
                    <DatePicker selected={this.state.fromDate} className="datePicker" placeholderText="Select From Date" onChange={this.handleFromDateChange} dateFormat="yyyy-MM-dd"/>
                </td>
                <td className="col-md-3 mb-3 monthPickerClass">
                    <Label for="joiningDate">To Date</Label>
                    <DatePicker selected={this.state.toDate} className="datePicker" placeholderText="Select To Date" onChange={this.handleToDateChange} dateFormat="yyyy-MM-dd"/>
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
                    <Select options={ sections } name="section" id="section" onChange={this.handleSectionChange} value={selectedSec}/>
                </td>
                <td className="col-md-3 mb-3">
                    <Label for="section">Group</Label>
                    <Select options={ groups } name="group" id="group" onChange={this.handleGroupChange} value={selectedGroup}/>
                </td>
                <td className="col-md-3 mb-3">
                    <Label for="student">Student</Label>
                    <Select options={ students } name="student" id="student" onChange={this.handleStudentChange} value={selectedStudent}/>
                </td>
                <td>   
                    <Button color="primary" className="goButton"  onClick={() => this.onSubmit()}>View</Button>{' '}
                </td>
              </tr>
            
            <div className="report">
            {<BootstrapTable data={ reportData } className="tableStyle">
                    <TableHeaderColumn row='0' rowSpan='2' style={{ width: 10 }} dataField='rollNum' isKey>Roll No</TableHeaderColumn>
                    <TableHeaderColumn row='0' rowSpan='2' dataField="studentName">Student Name</TableHeaderColumn>
                    <TableHeaderColumn row='0' rowSpan='2'  dataField='caste'>Caste</TableHeaderColumn>
                    {
                      thc
                    }
            </BootstrapTable> }
            </div>
          </div>
        );
    }
}

export default Report;