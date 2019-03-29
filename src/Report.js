import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Label} from 'reactstrap';
import Select from 'react-select';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

function date_diff_indays (d1, d2) {
  var diff = Date.parse(d2) - Date.parse(d1);
  return Math.floor(diff / 86400000);
}
class Report extends Component {
  state = {
    loading:true,
    error:"",
    indReportData: [],
    grpReportData: [],
    secReportData: [],
    performanceData: [],
    numberOfDays:"",
    selectedSchool:"", 
    selectedGrade:"", 
    selectedSec:"", 
    selectedGroup:"",
    selectedStudent:"",
    selectedReportType:"",
    schools:[],
    grades:[],
    sections:[],
    groups:[],
    students:[],
    reportTypes:[{"id":1,"label":"Individual Tracking"},{"id":2,"label":"Group Tracking"},{"id":3,"label":"Section Tracking"}],
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
    this.handleReportTypeChange = this.handleReportTypeChange.bind(this);
}

componentDidMount(){
    this.setState({showIndReportSel: false});
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

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  handleReportTypeChange = (selectedReportType) => {
    this.setState({selectedReportType});
    var reportTypeId = selectedReportType.id;
    if(reportTypeId === 1){
      this.setState({showIndReportSel: true});
      this.setState({showGrpReportSel: true});
      this.setState({showForm: false});
      this.setState({selectedSchool:""});
      this.setState({selectedGrade:""});
      this.setState({selectedSec:""});
      this.setState({selectedGroup:""});
      this.setState({showIndRepForm: false});
      this.setState({showGrpRepForm: false});
      this.setState({showSecRepForm: false});
    } else if(reportTypeId === 2 || reportTypeId === 3){
      this.setState({showGrpReportSel: false});
      this.setState({showIndReportSel: true});
      this.setState({showForm: false});
      this.setState({selectedSchool:""});
      this.setState({selectedGrade:""});
      this.setState({showIndRepForm: false});
      this.setState({showGrpRepForm: false});
      this.setState({showSecRepForm: false});
    }
  }
  handleSchoolChange = (selectedSchool) => {
    this.setState({ selectedSchool });
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
    const selectedGroupId = this.state.selectedGroup.id;
    const selectedGradeId = this.state.selectedGrade.id;
    const selReportTypeId = this.state.selectedReportType.id;
    const fromDate = new Intl.DateTimeFormat("fr-ca", {year: 'numeric', month: '2-digit',day: '2-digit'}).format(this.state.fromDate);
    const toDate = new Intl.DateTimeFormat('fr-ca', {month: '2-digit',year: 'numeric', day: '2-digit'}).format(this.state.toDate);
    let diffDate = date_diff_indays(fromDate, toDate);
    let url = null;
    if(diffDate > 6){
      this.setState({showErrorForm: true});
      this.setState({showIndRepForm: false});
      this.setState({showGrpRepForm: false});
      this.setState({showSecRepForm: false});
      this.setState({
        error:'Choose date range less than or equal to 6 days'
      });
    } else {
      if(selReportTypeId === 1){
          url = "http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/reports/group/"+selectedGroupId;
          axios.get(url+"?fromDate="+fromDate+"&toDate="+toDate).then(result => {
            console.log('Report Data = '+result);
            this.setState({
                indReportData: result.data,
                loading:false,
                error:false
              });
              this.setState({showErrorForm: false});
              this.setState({showIndRepForm: true});
              this.setState({showGrpRepForm: false});
              this.setState({showSecRepForm: false});
            }).catch(error => {
              console.error("error", error);
              this.setState({showErrorForm: true});
              this.setState({
              error:`${error}`,
              loading:false
            });
          });
      } else if(selReportTypeId === 2){
          url = "http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/reports/cls-group/"+selectedGradeId;
          axios.get(url+"?fromDate="+fromDate+"&toDate="+toDate).then(result => {
            console.log('Report Data = '+result);
            this.setState({
                grpReportData: result.data,
                loading:false,
                error:false
              });
              this.setState({showErrorForm: false});
              this.setState({showIndRepForm: false});
              this.setState({showGrpRepForm: true});
              this.setState({showSecRepForm: false});
            }).catch(error => {
              console.error("error", error);
              this.setState({showErrorForm: true});
              this.setState({
              error:`${error}`,
              loading:false
            });
          });
      } else if(selReportTypeId === 3) {
        url = "http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/reports/cls-section/"+selectedGradeId;
        axios.get(url+"?fromDate="+fromDate+"&toDate="+toDate).then(result => {
          console.log('Report Data = '+result);
          this.setState({
              secReportData: result.data,
              loading:false,
              error:false
            });
            this.setState({showErrorForm: false});
            this.setState({showIndRepForm: false});
            this.setState({showGrpRepForm: false});
            this.setState({showSecRepForm: true});
          }).catch(error => {
            console.error("error", error);
            this.setState({showErrorForm: true});
            this.setState({
            error:`${error}`,
            loading:false
          });
        });
      } else {
        this.setState({showErrorForm: true});
        this.setState({showIndRepForm: false});
        this.setState({showGrpRepForm: false});
        this.setState({showSecRepForm: false});
        this.setState({
          error:'Unable to view report, please select atleast school and class'
        }); 
      }
    }
  }

  handleFromDateChange = fromDate => this.setState({ fromDate });
  handleToDateChange = toDate => this.setState({ toDate });
  render() {
      const {error, indReportData, grpReportData, secReportData, selectedSchool, selectedGrade, 
        selectedSec,selectedGroup, schools,grades,sections, groups, reportTypes, selectedReportType } = this.state;
      var thc = [];
      var dateLoaded = false;
      for(var i=0;i<indReportData.length;i++){
        var l=Object.keys(indReportData[i].performanceData).length;      
        for(var j=0;j<l;j++){
            if(!dateLoaded){
              thc.push(
                <TableHeaderColumn  row='0' colSpan='3' headerAlign='center' dataField={indReportData[i].performanceData[j].date} >{indReportData[i].performanceData[j].date}</TableHeaderColumn>,
              );
              dateLoaded = true;
            } 
          else {
            indReportData[i].attendance = indReportData[i].performanceData[j].attendance;
            indReportData[i].discipline = indReportData[i].performanceData[j].discipline;
            indReportData[i].homeWork = indReportData[i].performanceData[j].homeWork;
            thc.push(
                <TableHeaderColumn row='1' dataField='attendance'>Attendance</TableHeaderColumn>,
                <TableHeaderColumn row='1' dataField="discipline">Discipline</TableHeaderColumn>,
                <TableHeaderColumn row='1' dataField="homeWork">Home Work</TableHeaderColumn>,
              );
              dateLoaded = false;
            }      
         }
        }
        const showErrorReport = {'display': this.state.showErrorForm ? 'block' : 'none'};
        const showIndReportSel = {'display': this.state.showIndReportSel ? 'block' : 'none'};
        const showGrpReportSel = {'display': this.state.showGrpReportSel ? 'block' : 'none'};
        const showIndRepHide = {'display': this.state.showIndRepForm ? 'block' : 'none'};
        const showGrpRepHide = {'display': this.state.showGrpRepForm ? 'block' : 'none'};
        const showSecRepHide = {'display': this.state.showSecRepForm ? 'block' : 'none'};
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
                    <Label for="reportType">Report Type</Label>
                    <Select options={ reportTypes } name="reportType" id="reportType" onChange={this.handleReportTypeChange} value={selectedReportType}/>
                </td>
              </tr>
              <div style={showIndReportSel}>
                  <tr className="row" >
                    <td className="col-md-3 mb-3">
                        <Label for="name">School Name</Label>
                        <Select options={ schools } name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}/>
                    </td>
                    <td className="col-md-3 mb-3">
                        <Label for="grade">Class or Grade</Label>
                        <Select options={ grades } name="grade" id="grade" onChange={this.handleClassChange} value={selectedGrade}/>
                    </td>
                    <td className="col-md-3 mb-3" style={showGrpReportSel}>
                        <Label for="section">Section</Label>
                        <Select options={ sections } name="section" id="section" onChange={this.handleSectionChange} value={selectedSec}/>
                    </td>
                    <td className="col-md-3 mb-3" style={showGrpReportSel}>
                        <Label for="section">Group</Label>
                        <Select options={ groups } name="group" id="group" onChange={this.handleGroupChange} value={selectedGroup}/>
                    </td>
                    <td className="col-md-3 mb-3">   
                        <Button color="primary" className="goButton"  onClick={() => this.onSubmit()}>View</Button>{' '}
                    </td>
                  </tr>
              </div>
              <div style={showErrorReport}>
                  <p style={{color: 'red'}}>{error}</p>
              </div>
              <div className="report" style={showIndRepHide}>
                  {<BootstrapTable data={ indReportData } className="tableStyle">
                      <TableHeaderColumn row='0' rowSpan='2' style={{ width: 10 }} dataField='rollNum' isKey>Roll No</TableHeaderColumn>
                      <TableHeaderColumn row='0' rowSpan='2' dataField="studentName">Student Name</TableHeaderColumn>
                      <TableHeaderColumn row='0' rowSpan='2'  dataField='caste'>Caste</TableHeaderColumn>
                      {
                        thc
                      }
                  </BootstrapTable> }
            </div>
            <div className="report" style={showGrpRepHide}>
                  {<BootstrapTable data={ grpReportData } className="tableStyle">
                      <TableHeaderColumn dataField='groupName' isKey>Group Name</TableHeaderColumn>
                      <TableHeaderColumn dataField="attendance">Attendance</TableHeaderColumn>
                      <TableHeaderColumn dataField='discipline'>Discipline</TableHeaderColumn>
                      <TableHeaderColumn dataField='homework'>Home Work</TableHeaderColumn>
                      <TableHeaderColumn dataField='total'>Total</TableHeaderColumn>
                  </BootstrapTable> }
            </div>
            <div className="report" style={showSecRepHide}>
                  {<BootstrapTable data={ secReportData } className="tableStyle">
                      <TableHeaderColumn dataField='sectionName' isKey>Section Name</TableHeaderColumn>
                      <TableHeaderColumn dataField="attendance">Attendance</TableHeaderColumn>
                      <TableHeaderColumn dataField='discipline'>Discipline</TableHeaderColumn>
                      <TableHeaderColumn dataField='homework'>Home Work</TableHeaderColumn>
                      <TableHeaderColumn dataField='total'>Total</TableHeaderColumn>
                  </BootstrapTable> }
            </div>
          </div>
        );
    }
}

export default Report;