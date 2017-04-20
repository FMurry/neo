import React from 'react';
import ReactDOM from "react-dom";
import InfiniteCalendar, { Calendar, withRange,} from 'react-infinite-calendar';//https://github.com/clauderic/react-infinite-calendar
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import format from 'date-fns/format';
import axios from 'axios';
import Alert from 'react-bootstrap';
import {API_KEY} from '../../environment';

export default class Neo extends React.Component{
  
  constructor() {
    super();
    var today = new Date();
    //var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    this.state = {
      today: today,
      startDate: null,
      endDate: null,
      text: "Select and drag on calendar for date range. Then click search",
      error: null,
    };
    this.getDate = this.getDate.bind(this);
    this.displayNeos = this.displayNeos.bind(this);
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
    console.log("OnSelect Event");       
    console.log(this.state);
   }

   verifyDate() {
    console.log("Verifying date....");
    if(!(this.state.startRaw) || !(this.state.endRaw)){
      //Dates not selected
      console.log("Date not verified");
      this.setState({
        error: "Please select a date range"
      })

    }
    else{
      //Verify here
      console.log("Date verified");
    }
    console.log(this.state);
   }
   displayNeos() {
    console.log("Display Neo event");
    //Demo api call
    //https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
    axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.startDate}&end_date=${this.state.endDate}&api_key=${API_KEY}`)
      .then(res => {
        console.log(res);
      })
   }
	render() {
    var mySelf = this;
    var help = "Select up to 7 days in the calendar";
		return(
			<div>
        <div id='alert'>
        </div>
        <div class="col-md-6 col-md-offset-3">
          <h2>Near Earth Objects</h2>
        </div>
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
              <button type="button" class="btn btn-primary" onClick={() => {this.verifyDate()}}>Search</button>
            </div>
            
        		<div class="col-md-10 col-md-offset-1">
        			<div class="panel panel-default">
        				<div class="panel-heading">Near Earth Objects!</div>
                {this.state.text}
        			</div>
        		</div>
        	</div>
			);
	}
}