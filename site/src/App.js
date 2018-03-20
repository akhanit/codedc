import React, { Component } from 'react';
import './App.css';
import {SHA256} from './hashFunction.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      emplName: "",
      emplSSN: "",
      uHash: "",
      iHash: "",
      income: "0",
      "checkHash": "",
    }

    this.calcUserHash = this.calcUserHash.bind(this);
    this.calcIncHash = this.calcIncHash.bind(this);
    this.updateIncome = this.updateIncome.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateSSN = this.updateSSN.bind(this);
    this.queryReport = this.queryReport.bind(this);
    this.createReport = this.createReport.bind(this);
    
  }

  calcUserHash() {
     this.setState ({
      uHash: SHA256(this.state.emplName + this.state.emplSSN)
    });
  }

  updateName(event) {
    this.setState({emplName: event.target.value})
    this.calcUserHash();
  }

  updateSSN(event) {
    this.setState({emplSSN: event.target.value})
    this.calcUserHash();
  }

  updateIncome(event) {
    this.setState({income: event.target.value})
    this.calcIncHash();
  }


  calcIncHash() {
    this.setState ({
      "iHash": SHA256(this.state.income)
    })
  }

  createReport(e) {
    e.preventDefault();

    console.log("Creating report...");

    var url = "http://52.168.50.192:3000/api/org.afs.com.Report" 

    var post_data = {
        "$class": "org.afs.com.Report",
        "reportID": Math.floor(Math.random() * Math.floor(999)), 
        "uHash": this.uHash,
        "iHash": this.iHash,
        "IssueDate": Date.now(),
        "DateChecked": Date.now(),
        "status": "VALID",
        "creator": "resource:org.afs.com.PayrollProcessor#1795",
      }

    var data = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(post_data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    }


  fetch(url, data)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log("Error creating report: " + err);
    });
  }

  queryReport(e) {
    e.preventDefault();
    console.log("In submit form");

    var data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    };

    fetch('http://52.168.50.192:3000/api/org.afs.com.queryReport', data)
    .then((response) => {
      //console.log(response.json());
      return response.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
      return error;
    }); //End fetch.catch
  } //end


  render() {
    return (
      <div className="App">

        <img src="Acc_Logo_Black_Purple_RGB.png" alt="ACN Logo" width="100" height="30"/>

        <h1> Payroll Processor</h1>
        <br/>

        <form onSubmit={this.createReport}>
         Employer:
          <br/>
          <input type="text" name="Employer" value="Accenture" readOnly/>
          <br/><br/>
          
          Employee Name:<br/>
          <input  type="text" name="Employee Name" value={this.state.emplName} onChange={this.updateName}/>
          <br/><br/>
          
          Employee SSN:<br/>
          <input type="text" name="Employee SSN" value={this.state.emplSSN} onChange={this.updateSSN}/>
           <br/><br/>
           
           Income this Pay Period:<br/>
          <input type="text" name="Income" value={this.state.income} onChange={this.updateIncome}/>       
           <br/><br/>

           uHash: {this.state.uHash}
           <br/><br/>
            
           iHash: {this.state.iHash} 
           <br/><br/>

         <input type="submit" value="Create report"/>
        </form> 
        <br/>
        <button onClick={this.queryReport}>
          Does this report exist?
        </button>
        <br/>
        Hash from Report: {this.state.checkHash}

      </div>
    );
  }}


export default App;
