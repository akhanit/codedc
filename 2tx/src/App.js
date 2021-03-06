import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      emplName: "",
      emplSSN: "000-000-0000",
      uHash: "",
      iHash: "",
      income: "0"
    }

    this.calcUserHash = this.calcUserHash.bind(this);
    this.calcIncHash = this.calcIncHash.bind(this);
    this.updateIncome = this.updateIncome.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateSSN = this.updateSSN.bind(this);
  }

  calcUserHash() {
    this.setState ({
      "uHash": this.state.emplName + this.state.emplSSN,
    })
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
      "iHash": this.state.income/100
    })
  }


  render() {
    return (
      <div className="App">
        <img src="Acc_Logo_Black_Purple_RGB.png" alt="ACN Logo" width="100" height="30"/>

        <h1 Style="font-family: graphik, sans-serif">Payroll Processor</h1>
        <br/>

        <form onSubmit="">
         Employer:
          <br/>
          <input type="text" name="Employer" value="Accenture"/>
          <br/><br/>
          
          Employee Name:<br/>
          <input type="text" name="Employee Name" value={this.state.emplName} onChange={this.updateName}/>
          <br/><br/>
          
          Employee SSN:<br/>
          <input type="text" name="Employee SSN" value={this.state.emplSSN} onChange={this.updateSSN}/>
           <br/><br/>
           
           Income:<br/>
          <input type="text" name="Income" value={this.state.income} onChange={this.updateIncome}/>       
           <br/><br/>

           uHash: {this.state.uHash}
           <br/><br/>
            
           iHash: {this.state.iHash} 
           <br/><br/>

         <br/><br/>
         
         <input type="submit" value="Submit"/>
        </form> 

      </div>
    );
  }}


export default App;
