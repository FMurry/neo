import React from 'react';
import ReactDOM from "react-dom";
import InfiniteCalendar, { Calendar, withRange,} from 'react-infinite-calendar';//https://github.com/clauderic/react-infinite-calendar
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import format from 'date-fns/format';
import axios from 'axios';
import {Alert, Button, Panel, Table} from 'react-bootstrap';
const API_KEY = "Vu3jrnHpif6GXfdP1DtWSQdlWbeJ6mRaEWIvwPWN"; //Do not abuse

export default class Neo extends React.Component{
  
  constructor() {
    super();
    var today = new Date();
    //var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    this.state = {
      panelTitle: "Near Earth Objects!",
      today: today,
      startDate: null,
      endDate: null,
      text: "Select and drag on calendar for date range. Then click search",
      isLoading: false,
      buttonText: "Search",
      error: null,
    };
    this.getDate = this.getDate.bind(this);
    this.getNeos = this.getNeos.bind(this);
    this.verifyDate = this.verifyDate.bind(this);
  }
  getDate(date) {
    var startDate = format(date.start, 'YYYY-MM-DD');
    var endDate = format(date.end, 'YYYY-MM-DD');
    /*
      Same as 
      this.setState({
        startRaw: date.start,
        endRaw: date.end
        startDate: startDate,
        endDate: endDate
      })
    */
    //ES6
    this.setState({
      startRaw: date.start,
      endRaw: date.end,
      startDate,
      endDate
    });
   }

   verifyDate() {
    if(!(this.state.startRaw) || !(this.state.endRaw)){
      //Dates not selected
      console.log("Date not verified");
      this.setState({
        error: "Please select a date range"
      })
      return;

    }
    var timeDifference = Math.abs(this.state.endRaw.getTime() - this.state.startRaw.getTime());
    var numOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); 
    if(numOfDays < 7 || numOfDays > 7){
      console.log("7 days only");
    }
    else{
      //Verify here
      this.setState({
        panelTitle: "Near Earth Objects!",
        text: "Searching Please Wait......",
        isLoading:true,
        buttonText: "Loading",
      })
      this.getNeos();
    }
   }
   getNeos() {
    console.log("Display Neo event");
    var mySelf = this;
    var responseTable;
    var content = [];
    var rows = [];
    //Demo api call
    //https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
    axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.startDate}&end_date=${this.state.endDate}&api_key=${API_KEY}`)
      .then(res => {
        console.log(res);
        for(var day in res.data.near_earth_objects){
          for(var neo in res.data.near_earth_objects[day]){
            var name = React.createElement('td',null,res.data.near_earth_objects[day][neo].name);
            var hazardous = React.createElement('td',null,res.data.near_earth_objects[day][neo].is_potentially_hazardous_asteroid.toString());
            var minDiameter = React.createElement('td',null,res.data.near_earth_objects[day][neo].estimated_diameter.meters.estimated_diameter_min);
            var maxDiameter = React.createElement('td',null,res.data.near_earth_objects[day][neo].estimated_diameter.meters.estimated_diameter_max);
            var relativeVelocity = React.createElement('td',null, res.data.near_earth_objects[day][neo].close_approach_data[0].relative_velocity.kilometers_per_hour);
            content.push(React.createElement("tr",null,[day,name, hazardous,minDiameter,maxDiameter,relativeVelocity]));
          }
        }
        var tableHeaders = React.createElement("thead",null,
          React.createElement("tr",null,[
            React.createElement("th",null,"Date"),
            React.createElement("th",null,"Name"), 
            React.createElement("th",null,"Hazardous?"),
            React.createElement("th",null,"Minimum Diameter (m)"),
            React.createElement("th",null,"Maximum Diameter (m)"),
            React.createElement("th",null,"Relative Velocity (km/h")]));
        var tableBody = React.createElement("tbody",null,content);
        var table = React.createElement(Table,{"responsive":true, "striped":true, "bordered":true, "condensed":true, "hover":true},[tableHeaders, tableBody]);
        mySelf.setState({
          panelTitle: "Near Earth objects between "+format(mySelf.state.startRaw,"MMM, DD, YYYY")+" to "+format(mySelf.state.endRaw,"MMM, DD, YYYY"),
          text: table,
          isLoading: false,
          buttonText: "Search",
        });
      })
      .catch( err => {
        console.log(err);
        mySelf.setState({
          isLoading: false,
          buttonText: "Search",
        });
      });
   }
	render() {
    var mySelf = this;
    var help = "Please select 7 days in the calendar";
		return(
			<div>
        <div id='alert'>
        </div>
        <h2>Near Earth Objects</h2>
        <div class="col-md-6 col-md-offset-3">
          {help}
        </div>
        <div class="col-md-6 col-md-offset-3">
             <InfiniteCalendar
                Component={withRange(Calendar)}
                maxDate= {mySelf.state.today}
                width={(window.innerWidth <= 650) ? window.innerWidth : 650}
                height={window.innerHeight - 250}
                rowHeight={70}
                onSelect={ 
                  (date) => {
                    setTimeout(() => {
                      if(date.eventType === 3){
                        mySelf.getDate(date);
                      }
                    }, 500);
                  }

                    

                }
                displayOptions={{
                  layout: 'landscape',
                  showHeader: false
                }}
              selected={{
                  start: mySelf.state.startDate,
                  end: mySelf.state.endDate,
              }}
              />
            </div>
            <div class="col-md-3 col-md-offset-3">
            <Button bsStyle="primary" disabled={this.state.isLoading} onClick={() => {this.verifyDate()}}>{this.state.buttonText}</Button>
            </div>
            
        		<div class="col-md-10 col-md-offset-1">
        			<Panel header={this.state.panelTitle}>
                {this.state.text}
        			</Panel>
        		</div>
        	</div>
			);
	}
}