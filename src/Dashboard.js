import React, {Component} from 'react';
import { Button, Label, Container, Form, FormGroup} from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@kenshooui/react-multi-select/dist/style.css";
import axios from 'axios';
import MonthPickerInput from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input.css';
import "./cssstyles/Common.css";
import "./cssstyles/index.css";

function drawAttendanceStar(attendanceDetails, ctx) {
  //alert(attendanceDetails.length);
  //Start formation
  ctx.beginPath();//Day-1
  ctx.moveTo(300, 30.0);
  ctx.lineTo(345, 160);
  ctx.lineTo(300, 100);
  ctx.lineTo(300, 30);
  ctx.fillStyle = attendanceDetails[0];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-30
  ctx.moveTo(300, 30.0);
  ctx.lineTo(255, 160);
  ctx.lineTo(300, 100);
  ctx.lineTo(300, 30);
  if(attendanceDetails.length > 28){
    ctx.fillStyle = attendanceDetails[29];
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-29
  ctx.moveTo(300, 100);
  ctx.lineTo(300, 160);
  ctx.lineTo(255, 160);
  ctx.lineTo(300, 100);
  if(attendanceDetails.length > 27){
    ctx.fillStyle = attendanceDetails[28];
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-2
  ctx.moveTo(300, 100);
  ctx.lineTo(345, 160);
  ctx.lineTo(300, 160);
  ctx.lineTo(300, 100);
  ctx.fillStyle = attendanceDetails[1];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  // ctx.beginPath();//Day-3
  // ctx.moveTo(300, 160);
  // ctx.lineTo(300, 220);
  // ctx.lineTo(345, 160);
  // ctx.fillStyle = "violet";
  // ctx.fill();
  // ctx.strokeStyle = "black";
  // ctx.stroke();

  ctx.beginPath();//Day-3
  ctx.moveTo(300, 160);
  ctx.lineTo(300, 220);
  ctx.lineTo(345, 160);
  ctx.lineTo(300, 160);
  ctx.fillStyle = attendanceDetails[2];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  ctx.beginPath();//Day-28
  ctx.moveTo(300, 160);
  ctx.lineTo(300, 220);
  ctx.lineTo(255, 160);
  ctx.lineTo(300, 160);
  ctx.fillStyle = attendanceDetails[27];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-27
  ctx.moveTo(255, 160);
  ctx.lineTo(300, 220);
  ctx.lineTo(240, 202);
  ctx.lineTo(255, 160);
  ctx.fillStyle = attendanceDetails[26];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  ctx.beginPath();//Day-22
  ctx.moveTo(240, 202);
  ctx.lineTo(300, 220);
  ctx.lineTo(225, 245);
  ctx.lineTo(240, 202);
  ctx.fillStyle = attendanceDetails[21];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-21
  ctx.moveTo(225, 245);
  ctx.lineTo(300, 220);
  ctx.lineTo(262, 275);
  ctx.lineTo(225, 245);
  ctx.fillStyle = attendanceDetails[20];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-16
  ctx.moveTo(262, 275);
  ctx.lineTo(300, 220);
  ctx.lineTo(300, 300);
  ctx.lineTo(262, 275);
  ctx.fillStyle = attendanceDetails[15];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-15
  ctx.moveTo(300, 300);
  ctx.lineTo(300, 220);
  ctx.lineTo(340, 275);
  ctx.lineTo(300, 300);
  ctx.fillStyle = attendanceDetails[14];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-10
  ctx.moveTo(340, 275);
  ctx.lineTo(300, 220);
  ctx.lineTo(375, 245);
  ctx.lineTo(340, 275);
  ctx.fillStyle = attendanceDetails[9];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-9
  ctx.moveTo(375, 245);
  ctx.lineTo(300, 220);
  ctx.lineTo(360, 200);
  ctx.lineTo(375, 245);
  ctx.fillStyle = attendanceDetails[8];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-4
  ctx.moveTo(360, 200);
  ctx.lineTo(300, 220);
  ctx.lineTo(345, 160);
  ctx.lineTo(360, 200);
  ctx.fillStyle = attendanceDetails[3];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-6
  ctx.moveTo(345, 160);
  ctx.lineTo(490, 160);
  ctx.lineTo(415, 185);
  ctx.lineTo(345, 160);
  ctx.fillStyle = attendanceDetails[5];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-5
  ctx.moveTo(415, 185);
  ctx.lineTo(345, 160);
  ctx.lineTo(360, 200);
  ctx.lineTo(415, 185);
  ctx.fillStyle = attendanceDetails[4];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-8
  ctx.moveTo(360, 200);
  ctx.lineTo(375, 245);
  ctx.lineTo(415, 185);
  ctx.lineTo(360, 200);
  ctx.fillStyle = attendanceDetails[7];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-7
  ctx.moveTo(415, 185);
  ctx.lineTo(490, 160);
  ctx.lineTo(375, 245);
  ctx.lineTo(415, 185);
  ctx.fillStyle = attendanceDetails[6];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//day-12
  ctx.moveTo(375, 245);
  ctx.lineTo(430, 400);
  ctx.lineTo(375, 325);
  ctx.lineTo(375, 245);
  ctx.fillStyle = attendanceDetails[11];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-11
  ctx.moveTo(375, 325);
  ctx.lineTo(375, 245);
  ctx.lineTo(340, 275);
  ctx.lineTo(375, 325);
  ctx.fillStyle = attendanceDetails[10];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-14
  ctx.moveTo(340, 275);
  ctx.lineTo(300, 300);
  ctx.lineTo(375, 325);
  ctx.lineTo(340, 275);
  ctx.fillStyle = attendanceDetails[13];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-13
  ctx.moveTo(375, 325);
  ctx.lineTo(430, 400);
  ctx.lineTo(300, 300);
  ctx.lineTo(375, 325);
  ctx.fillStyle = attendanceDetails[12];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-18
  ctx.moveTo(300, 300);
  ctx.lineTo(170, 400);
  ctx.lineTo(230, 320);
  ctx.lineTo(300, 300);
  ctx.fillStyle = attendanceDetails[17];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-17
  ctx.moveTo(230, 320);
  ctx.lineTo(300, 300);
  ctx.lineTo(262, 275);
  ctx.lineTo(230, 320);
  ctx.fillStyle = attendanceDetails[16];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-20
  ctx.moveTo(262, 275);
  ctx.lineTo(225, 245);
  ctx.lineTo(230, 320);
  ctx.lineTo(262, 275);
  ctx.fillStyle = attendanceDetails[19];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-19
  ctx.moveTo(230, 320);
  ctx.lineTo(170, 400);
  ctx.lineTo(225, 245);
  ctx.lineTo(230, 320);
  ctx.fillStyle = attendanceDetails[18];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-24
  ctx.moveTo(225, 245);
  ctx.lineTo(110, 160);
  ctx.lineTo(185, 185);
  ctx.lineTo(225, 245);
  ctx.fillStyle = attendanceDetails[23];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-23
  ctx.moveTo(185, 185);
  ctx.lineTo(225, 245);
  ctx.lineTo(240, 202);
  ctx.lineTo(185, 185);
  ctx.fillStyle = attendanceDetails[22];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-26
  ctx.moveTo(240, 202);
  ctx.lineTo(255, 160);
  ctx.lineTo(185, 185);
  ctx.lineTo(240, 202);
  ctx.fillStyle = attendanceDetails[25];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-25
  ctx.moveTo(185, 185);
  ctx.lineTo(110, 160);
  ctx.lineTo(255, 160);
  ctx.lineTo(185, 185);
  ctx.fillStyle = attendanceDetails[24];
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.beginPath();//Day-31
  ctx.moveTo(300, 190);
  ctx.lineTo(308, 210);
  ctx.lineTo(325, 212);
  ctx.lineTo(310, 225);
  ctx.lineTo(317, 242);
  ctx.lineTo(300, 230);
  ctx.lineTo(285, 242);
  ctx.lineTo(290, 225);
  ctx.lineTo(275, 210);
  ctx.lineTo(292, 210);
  ctx.lineTo(300, 190);
  if(attendanceDetails.length > 29){
    ctx.fillStyle = attendanceDetails[30];
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.font = "15px Bold "
  ctx.fillText("1", 310, 100);
  ctx.fillText("2", 310, 140);
  ctx.fillText("3", 310, 180);
  ctx.fillText("4", 335, 195);
  ctx.fillText("5", 370, 188);
  ctx.fillText("6", 409, 175);
  ctx.fillText("7", 415, 200);
  ctx.fillText("7", 415, 200);
  ctx.fillText("8", 380, 215);
  ctx.fillText("9", 340, 225);
  ctx.fillText("10", 330, 255);
  ctx.fillText("11", 360, 275);
  ctx.fillText("12", 380, 325);
  ctx.fillText("13", 350, 335);
  ctx.fillText("14", 330, 300);
  ctx.fillText("15", 310, 270);
  ctx.fillText("16", 280, 270);
  ctx.fillText("17", 260, 300);
  ctx.fillText("18", 225, 340);
  ctx.fillText("19", 205, 325);
  ctx.fillText("20", 235, 290);
  ctx.fillText("21", 255, 255);
  ctx.fillText("22", 250, 225);
  ctx.fillText("23", 210, 215);
  ctx.fillText("24", 170, 200);
  ctx.fillText("25", 170, 175);
  ctx.fillText("26", 215, 190);
  ctx.fillText("27", 255, 195);
  ctx.fillText("28", 275, 180);
  ctx.fillText("29", 280, 140);
  ctx.fillText("30", 280, 100);
  ctx.fillText("31", 293, 225);
  ctx.fill();
  ctx.stroke();
}

function drawHomeWorkStar(homeWorkDetails, ctx1) {
  //alert(attendanceDetails.length);
  //Start formation
  ctx1.beginPath();//Day-1
  ctx1.moveTo(300, 30.0);
  ctx1.lineTo(345, 160);
  ctx1.lineTo(300, 100);
  ctx1.lineTo(300, 30);
  ctx1.fillStyle = homeWorkDetails[0];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-30
  ctx1.moveTo(300, 30.0);
  ctx1.lineTo(255, 160);
  ctx1.lineTo(300, 100);
  ctx1.lineTo(300, 30);
  if(homeWorkDetails.length > 28){
    ctx1.fillStyle = homeWorkDetails[29];
  } else {
    ctx1.fillStyle = "white";
  }
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-29
  ctx1.moveTo(300, 100);
  ctx1.lineTo(300, 160);
  ctx1.lineTo(255, 160);
  ctx1.lineTo(300, 100);
  if(homeWorkDetails.length > 27){
    ctx1.fillStyle = homeWorkDetails[28];
  } else {
    ctx1.fillStyle = "white";
  }
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-2
  ctx1.moveTo(300, 100);
  ctx1.lineTo(345, 160);
  ctx1.lineTo(300, 160);
  ctx1.lineTo(300, 100);
  ctx1.fillStyle = homeWorkDetails[1];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  // ctx.beginPath();//Day-3
  // ctx.moveTo(300, 160);
  // ctx.lineTo(300, 220);
  // ctx.lineTo(345, 160);
  // ctx.fillStyle = "violet";
  // ctx.fill();
  // ctx.strokeStyle = "black";
  // ctx.stroke();

  ctx1.beginPath();//Day-3
  ctx1.moveTo(300, 160);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(345, 160);
  ctx1.lineTo(300, 160);
  ctx1.fillStyle = homeWorkDetails[2];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();
  
  ctx1.beginPath();//Day-28
  ctx1.moveTo(300, 160);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(255, 160);
  ctx1.lineTo(300, 160);
  ctx1.fillStyle = homeWorkDetails[27];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-27
  ctx1.moveTo(255, 160);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(240, 202);
  ctx1.lineTo(255, 160);
  ctx1.fillStyle = homeWorkDetails[26];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();
  
  ctx1.beginPath();//Day-22
  ctx1.moveTo(240, 202);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(225, 245);
  ctx1.lineTo(240, 202);
  ctx1.fillStyle = homeWorkDetails[21];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-21
  ctx1.moveTo(225, 245);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(262, 275);
  ctx1.lineTo(225, 245);
  ctx1.fillStyle = homeWorkDetails[20];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-16
  ctx1.moveTo(262, 275);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(300, 300);
  ctx1.lineTo(262, 275);
  ctx1.fillStyle = homeWorkDetails[15];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-15
  ctx1.moveTo(300, 300);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(340, 275);
  ctx1.lineTo(300, 300);
  ctx1.fillStyle = homeWorkDetails[14];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-10
  ctx1.moveTo(340, 275);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(375, 245);
  ctx1.lineTo(340, 275);
  ctx1.fillStyle = homeWorkDetails[9];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-9
  ctx1.moveTo(375, 245);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(360, 200);
  ctx1.lineTo(375, 245);
  ctx1.fillStyle = homeWorkDetails[8];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-4
  ctx1.moveTo(360, 200);
  ctx1.lineTo(300, 220);
  ctx1.lineTo(345, 160);
  ctx1.lineTo(360, 200);
  ctx1.fillStyle = homeWorkDetails[3];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-6
  ctx1.moveTo(345, 160);
  ctx1.lineTo(490, 160);
  ctx1.lineTo(415, 185);
  ctx1.lineTo(345, 160);
  ctx1.fillStyle = homeWorkDetails[5];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-5
  ctx1.moveTo(415, 185);
  ctx1.lineTo(345, 160);
  ctx1.lineTo(360, 200);
  ctx1.lineTo(415, 185);
  ctx1.fillStyle = homeWorkDetails[4];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-8
  ctx1.moveTo(360, 200);
  ctx1.lineTo(375, 245);
  ctx1.lineTo(415, 185);
  ctx1.lineTo(360, 200);
  ctx1.fillStyle = homeWorkDetails[7];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-7
  ctx1.moveTo(415, 185);
  ctx1.lineTo(490, 160);
  ctx1.lineTo(375, 245);
  ctx1.lineTo(415, 185);
  ctx1.fillStyle = homeWorkDetails[6];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//day-12
  ctx1.moveTo(375, 245);
  ctx1.lineTo(430, 400);
  ctx1.lineTo(375, 325);
  ctx1.lineTo(375, 245);
  ctx1.fillStyle = homeWorkDetails[11];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-11
  ctx1.moveTo(375, 325);
  ctx1.lineTo(375, 245);
  ctx1.lineTo(340, 275);
  ctx1.lineTo(375, 325);
  ctx1.fillStyle = homeWorkDetails[10];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-14
  ctx1.moveTo(340, 275);
  ctx1.lineTo(300, 300);
  ctx1.lineTo(375, 325);
  ctx1.lineTo(340, 275);
  ctx1.fillStyle = homeWorkDetails[13];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-13
  ctx1.moveTo(375, 325);
  ctx1.lineTo(430, 400);
  ctx1.lineTo(300, 300);
  ctx1.lineTo(375, 325);
  ctx1.fillStyle = homeWorkDetails[12];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-18
  ctx1.moveTo(300, 300);
  ctx1.lineTo(170, 400);
  ctx1.lineTo(230, 320);
  ctx1.lineTo(300, 300);
  ctx1.fillStyle = homeWorkDetails[17];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-17
  ctx1.moveTo(230, 320);
  ctx1.lineTo(300, 300);
  ctx1.lineTo(262, 275);
  ctx1.lineTo(230, 320);
  ctx1.fillStyle = homeWorkDetails[16];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-20
  ctx1.moveTo(262, 275);
  ctx1.lineTo(225, 245);
  ctx1.lineTo(230, 320);
  ctx1.lineTo(262, 275);
  ctx1.fillStyle = homeWorkDetails[19];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-19
  ctx1.moveTo(230, 320);
  ctx1.lineTo(170, 400);
  ctx1.lineTo(225, 245);
  ctx1.lineTo(230, 320);
  ctx1.fillStyle = homeWorkDetails[18];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-24
  ctx1.moveTo(225, 245);
  ctx1.lineTo(110, 160);
  ctx1.lineTo(185, 185);
  ctx1.lineTo(225, 245);
  ctx1.fillStyle = homeWorkDetails[23];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-23
  ctx1.moveTo(185, 185);
  ctx1.lineTo(225, 245);
  ctx1.lineTo(240, 202);
  ctx1.lineTo(185, 185);
  ctx1.fillStyle = homeWorkDetails[22];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-26
  ctx1.moveTo(240, 202);
  ctx1.lineTo(255, 160);
  ctx1.lineTo(185, 185);
  ctx1.lineTo(240, 202);
  ctx1.fillStyle = homeWorkDetails[25];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-25
  ctx1.moveTo(185, 185);
  ctx1.lineTo(110, 160);
  ctx1.lineTo(255, 160);
  ctx1.lineTo(185, 185);
  ctx1.fillStyle = homeWorkDetails[24];
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();

  ctx1.beginPath();//Day-31
  ctx1.moveTo(300, 190);
  ctx1.lineTo(308, 210);
  ctx1.lineTo(325, 212);
  ctx1.lineTo(310, 225);
  ctx1.lineTo(317, 242);
  ctx1.lineTo(300, 230);
  ctx1.lineTo(285, 242);
  ctx1.lineTo(290, 225);
  ctx1.lineTo(275, 210);
  ctx1.lineTo(292, 210);
  ctx1.lineTo(300, 190);
  if(homeWorkDetails.length > 29){
    ctx1.fillStyle = homeWorkDetails[30];
  } else {
    ctx1.fillStyle = "white";
  }
  ctx1.fill();
  ctx1.strokeStyle = "black";
  ctx1.stroke();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.fillStyle = "black";
  ctx1.font = "15px Bold "
  ctx1.fillText("1", 310, 100);
  ctx1.fillText("2", 310, 140);
  ctx1.fillText("3", 310, 180);
  ctx1.fillText("4", 335, 195);
  ctx1.fillText("5", 370, 188);
  ctx1.fillText("6", 409, 175);
  ctx1.fillText("7", 415, 200);
  ctx1.fillText("7", 415, 200);
  ctx1.fillText("8", 380, 215);
  ctx1.fillText("9", 340, 225);
  ctx1.fillText("10", 330, 255);
  ctx1.fillText("11", 360, 275);
  ctx1.fillText("12", 380, 325);
  ctx1.fillText("13", 350, 335);
  ctx1.fillText("14", 330, 300);
  ctx1.fillText("15", 310, 270);
  ctx1.fillText("16", 280, 270);
  ctx1.fillText("17", 260, 300);
  ctx1.fillText("18", 225, 340);
  ctx1.fillText("19", 205, 325);
  ctx1.fillText("20", 235, 290);
  ctx1.fillText("21", 255, 255);
  ctx1.fillText("22", 250, 225);
  ctx1.fillText("23", 210, 215);
  ctx1.fillText("24", 170, 200);
  ctx1.fillText("25", 170, 175);
  ctx1.fillText("26", 215, 190);
  ctx1.fillText("27", 255, 195);
  ctx1.fillText("28", 275, 180);
  ctx1.fillText("29", 280, 140);
  ctx1.fillText("30", 280, 100);
  ctx1.fillText("31", 293, 225);
  ctx1.fill();
  ctx1.stroke();
}

function drawDisciplineStar(desciplineDetails, ctx2) {
  //alert(attendanceDetails.length);
  //Start formation
  ctx2.beginPath();//Day-1
  ctx2.moveTo(300, 30.0);
  ctx2.lineTo(345, 160);
  ctx2.lineTo(300, 100);
  ctx2.lineTo(300, 30);
  ctx2.fillStyle = desciplineDetails[0];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-30
  ctx2.moveTo(300, 30.0);
  ctx2.lineTo(255, 160);
  ctx2.lineTo(300, 100);
  ctx2.lineTo(300, 30);
  if(desciplineDetails.length > 28){
    ctx2.fillStyle = desciplineDetails[29];
  } else {
    ctx2.fillStyle = "white";
  }
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-29
  ctx2.moveTo(300, 100);
  ctx2.lineTo(300, 160);
  ctx2.lineTo(255, 160);
  ctx2.lineTo(300, 100);
  if(desciplineDetails.length > 27){
    ctx2.fillStyle = desciplineDetails[28];
  } else {
    ctx2.fillStyle = "white";
  }
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-2
  ctx2.moveTo(300, 100);
  ctx2.lineTo(345, 160);
  ctx2.lineTo(300, 160);
  ctx2.lineTo(300, 100);
  ctx2.fillStyle = desciplineDetails[1];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  // ctx.beginPath();//Day-3
  // ctx.moveTo(300, 160);
  // ctx.lineTo(300, 220);
  // ctx.lineTo(345, 160);
  // ctx.fillStyle = "violet";
  // ctx.fill();
  // ctx.strokeStyle = "black";
  // ctx.stroke();

  ctx2.beginPath();//Day-3
  ctx2.moveTo(300, 160);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(345, 160);
  ctx2.lineTo(300, 160);
  ctx2.fillStyle = desciplineDetails[2];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();
  
  ctx2.beginPath();//Day-28
  ctx2.moveTo(300, 160);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(255, 160);
  ctx2.lineTo(300, 160);
  ctx2.fillStyle = desciplineDetails[27];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-27
  ctx2.moveTo(255, 160);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(240, 202);
  ctx2.lineTo(255, 160);
  ctx2.fillStyle = desciplineDetails[26];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();
  
  ctx2.beginPath();//Day-22
  ctx2.moveTo(240, 202);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(225, 245);
  ctx2.lineTo(240, 202);
  ctx2.fillStyle = desciplineDetails[21];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-21
  ctx2.moveTo(225, 245);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(262, 275);
  ctx2.lineTo(225, 245);
  ctx2.fillStyle = desciplineDetails[20];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-16
  ctx2.moveTo(262, 275);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(300, 300);
  ctx2.lineTo(262, 275);
  ctx2.fillStyle = desciplineDetails[15];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-15
  ctx2.moveTo(300, 300);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(340, 275);
  ctx2.lineTo(300, 300);
  ctx2.fillStyle = desciplineDetails[14];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-10
  ctx2.moveTo(340, 275);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(375, 245);
  ctx2.lineTo(340, 275);
  ctx2.fillStyle = desciplineDetails[9];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-9
  ctx2.moveTo(375, 245);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(360, 200);
  ctx2.lineTo(375, 245);
  ctx2.fillStyle = desciplineDetails[8];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-4
  ctx2.moveTo(360, 200);
  ctx2.lineTo(300, 220);
  ctx2.lineTo(345, 160);
  ctx2.lineTo(360, 200);
  ctx2.fillStyle = desciplineDetails[3];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-6
  ctx2.moveTo(345, 160);
  ctx2.lineTo(490, 160);
  ctx2.lineTo(415, 185);
  ctx2.lineTo(345, 160);
  ctx2.fillStyle = desciplineDetails[5];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-5
  ctx2.moveTo(415, 185);
  ctx2.lineTo(345, 160);
  ctx2.lineTo(360, 200);
  ctx2.lineTo(415, 185);
  ctx2.fillStyle = desciplineDetails[4];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-8
  ctx2.moveTo(360, 200);
  ctx2.lineTo(375, 245);
  ctx2.lineTo(415, 185);
  ctx2.lineTo(360, 200);
  ctx2.fillStyle = desciplineDetails[7];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-7
  ctx2.moveTo(415, 185);
  ctx2.lineTo(490, 160);
  ctx2.lineTo(375, 245);
  ctx2.lineTo(415, 185);
  ctx2.fillStyle = desciplineDetails[6];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//day-12
  ctx2.moveTo(375, 245);
  ctx2.lineTo(430, 400);
  ctx2.lineTo(375, 325);
  ctx2.lineTo(375, 245);
  ctx2.fillStyle = desciplineDetails[11];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-11
  ctx2.moveTo(375, 325);
  ctx2.lineTo(375, 245);
  ctx2.lineTo(340, 275);
  ctx2.lineTo(375, 325);
  ctx2.fillStyle = desciplineDetails[10];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-14
  ctx2.moveTo(340, 275);
  ctx2.lineTo(300, 300);
  ctx2.lineTo(375, 325);
  ctx2.lineTo(340, 275);
  ctx2.fillStyle = desciplineDetails[13];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-13
  ctx2.moveTo(375, 325);
  ctx2.lineTo(430, 400);
  ctx2.lineTo(300, 300);
  ctx2.lineTo(375, 325);
  ctx2.fillStyle = desciplineDetails[12];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-18
  ctx2.moveTo(300, 300);
  ctx2.lineTo(170, 400);
  ctx2.lineTo(230, 320);
  ctx2.lineTo(300, 300);
  ctx2.fillStyle = desciplineDetails[17];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-17
  ctx2.moveTo(230, 320);
  ctx2.lineTo(300, 300);
  ctx2.lineTo(262, 275);
  ctx2.lineTo(230, 320);
  ctx2.fillStyle = desciplineDetails[16];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-20
  ctx2.moveTo(262, 275);
  ctx2.lineTo(225, 245);
  ctx2.lineTo(230, 320);
  ctx2.lineTo(262, 275);
  ctx2.fillStyle = desciplineDetails[19];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-19
  ctx2.moveTo(230, 320);
  ctx2.lineTo(170, 400);
  ctx2.lineTo(225, 245);
  ctx2.lineTo(230, 320);
  ctx2.fillStyle = desciplineDetails[18];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-24
  ctx2.moveTo(225, 245);
  ctx2.lineTo(110, 160);
  ctx2.lineTo(185, 185);
  ctx2.lineTo(225, 245);
  ctx2.fillStyle = desciplineDetails[23];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-23
  ctx2.moveTo(185, 185);
  ctx2.lineTo(225, 245);
  ctx2.lineTo(240, 202);
  ctx2.lineTo(185, 185);
  ctx2.fillStyle = desciplineDetails[22];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-26
  ctx2.moveTo(240, 202);
  ctx2.lineTo(255, 160);
  ctx2.lineTo(185, 185);
  ctx2.lineTo(240, 202);
  ctx2.fillStyle = desciplineDetails[25];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-25
  ctx2.moveTo(185, 185);
  ctx2.lineTo(110, 160);
  ctx2.lineTo(255, 160);
  ctx2.lineTo(185, 185);
  ctx2.fillStyle = desciplineDetails[24];
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();

  ctx2.beginPath();//Day-31
  ctx2.moveTo(300, 190);
  ctx2.lineTo(308, 210);
  ctx2.lineTo(325, 212);
  ctx2.lineTo(310, 225);
  ctx2.lineTo(317, 242);
  ctx2.lineTo(300, 230);
  ctx2.lineTo(285, 242);
  ctx2.lineTo(290, 225);
  ctx2.lineTo(275, 210);
  ctx2.lineTo(292, 210);
  ctx2.lineTo(300, 190);
  if(desciplineDetails.length > 29){
    ctx2.fillStyle = desciplineDetails[30];
  } else {
    ctx2.fillStyle = "white";
  }
  ctx2.fill();
  ctx2.strokeStyle = "black";
  ctx2.stroke();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.fillStyle = "black";
  ctx2.font = "15px Bold "
  ctx2.fillText("1", 310, 100);
  ctx2.fillText("2", 310, 140);
  ctx2.fillText("3", 310, 180);
  ctx2.fillText("4", 335, 195);
  ctx2.fillText("5", 370, 188);
  ctx2.fillText("6", 409, 175);
  ctx2.fillText("7", 415, 200);
  ctx2.fillText("7", 415, 200);
  ctx2.fillText("8", 380, 215);
  ctx2.fillText("9", 340, 225);
  ctx2.fillText("10", 330, 255);
  ctx2.fillText("11", 360, 275);
  ctx2.fillText("12", 380, 325);
  ctx2.fillText("13", 350, 335);
  ctx2.fillText("14", 330, 300);
  ctx2.fillText("15", 310, 270);
  ctx2.fillText("16", 280, 270);
  ctx2.fillText("17", 260, 300);
  ctx2.fillText("18", 225, 340);
  ctx2.fillText("19", 205, 325);
  ctx2.fillText("20", 235, 290);
  ctx2.fillText("21", 255, 255);
  ctx2.fillText("22", 250, 225);
  ctx2.fillText("23", 210, 215);
  ctx2.fillText("24", 170, 200);
  ctx2.fillText("25", 170, 175);
  ctx2.fillText("26", 215, 190);
  ctx2.fillText("27", 255, 195);
  ctx2.fillText("28", 275, 180);
  ctx2.fillText("29", 280, 140);
  ctx2.fillText("30", 280, 100);
  ctx2.fillText("31", 293, 225);
  ctx2.fill();
  ctx2.stroke();
}
class Dashboard extends Component {
    state = {
        loading:true,
        error:"",
        data: [],
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
    }
    constructor(props) {
        super(props);
        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleSectionChange = this.handleSectionChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
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
        //Create Attendance Star
        const attCanvas = this.refs.attCanvas;
        const ctx = attCanvas.getContext("2d");
        //Create HomeWork star
        const hwCanvas = this.refs.hwCanvas;
        const ctx1 = hwCanvas.getContext("2d");
        //Create Discipline star
        const disCanvas = this.refs.disCanvas;
        const ctx2 = disCanvas.getContext("2d");
        const selectedGroupId = this.state.selectedGroup.id;
        //alert('Group = ' +selectedGroupId);
        const selectedStudId = this.state.selectedStudent.id;
        //alert('Student = ' +selectedStudId);
        
        if(selectedStudId !== undefined){
          axios.get("http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/star/student/"+selectedStudId+"?month="+this.state.starDateFormat)
          .then(result => {
            console.log(result);
            drawAttendanceStar(result.data.attendanceDetails, ctx);
            drawHomeWorkStar(result.data.homeWorkDetails, ctx1);
            drawDisciplineStar(result.data.desciplineDetails, ctx2);
            this.setState({
                data: result.data,
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
          this.setState({showForm: true}); 
        } else {
          axios.get("http://ec2-35-154-78-152.ap-south-1.compute.amazonaws.com:8080/api/v1/star/group/"+selectedGroupId+"?month="+this.state.starDateFormat)
          .then(result => {
            console.log(result);
            drawAttendanceStar(result.data.attendanceDetails, ctx);
            drawHomeWorkStar(result.data.homeWorkDetails, ctx1);
            drawDisciplineStar(result.data.desciplineDetails, ctx2);
            this.setState({
                data: result.data,
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
          this.setState({showForm: true}); 
        }  
      }

      handleSelect = (month, year) => {
        var monthArray = month.split('/');  
        var starDateFormat = year + '/' + monthArray[0];
        this.setState({starDateFormat});
      }

    render() {
        const {error, selectedSchool, selectedGrade, 
          selectedSec,selectedGroup,selectedStudent, 
          schools,grades,sections, groups, students} = this.state;
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

        return (
            <div className="dashboard">
            <Container>
                  <Form className="row">
                      <FormGroup className="col-md-3 mb-3">
                          <Label for="month" style={{color:'white'}}>Pick A Month</Label>
                          <MonthPickerInput className="monthPickerClass" mode="calendarOnly" onChange={this.handleSelect} closeOnSelect={true}/>
                      </FormGroup>
                      <FormGroup className="col-md-3 mb-3">
                          <Label for="name" style={{color:'white'}}>School Name</Label>
                          <Select options={ schools } name="school" id="school" onChange={this.handleSchoolChange} value={selectedSchool}/>
                      </FormGroup>
                      <FormGroup className="col-md-3 mb-3">
                          <Label for="grade" style={{color:'white'}}>Class or Grade</Label>
                          <Select options={ grades } name="grade" id="grade" onChange={this.handleClassChange} value={selectedGrade}/>
                      </FormGroup>
                      <FormGroup className="col-md-3 mb-3">
                          <Label for="section" style={{color:'white'}}>Section</Label>
                          <Select options={ sections } name="section" id="section" onChange={this.handleSectionChange} value={selectedSec}/>
                      </FormGroup>
                      <FormGroup className="col-md-3 mb-3">
                          <Label for="section" style={{color:'white'}}>Group</Label>
                          <Select options={ groups } name="group" id="group" onChange={this.handleGroupChange} value={selectedGroup}/>
                      </FormGroup>
                      <FormGroup className="col-md-3 mb-3">
                          <Label for="student" style={{color:'white'}}>Student</Label>
                          <Select options={ students } name="student" id="student" onChange={this.handleStudentChange} value={selectedStudent}/>
                      </FormGroup>
                      <FormGroup>   
                          <Button color="primary" className="goButton"  onClick={() => this.onSubmit()}>Go</Button>{' '}
                      </FormGroup>
                      </Form>
                      <div style={showHide}>
                        <div className="starAlign">
                          <canvas className="starAlign-att" ref="attCanvas" width="490" height="400"></canvas>
                          <text className="star-caption-att">Attendance</text>
                        </div>
                        <div className="starAlign">
                          <canvas className="starAlign-hw" ref="hwCanvas" width="490" height="400"></canvas>
                          <text className="star-caption-hw">Home Work</text>
                        </div>
                        <div className="starAlign">
                          <canvas className="starAlign-dis" ref="disCanvas" width="490" height="400"></canvas>
                          <text className="star-caption-dis">Discipline</text>
                        </div>
                      </div>
              </Container> 
        </div>);
    }
}
export default Dashboard;