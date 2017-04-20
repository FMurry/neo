import React from 'react';
import InfiniteCalendar, { Calendar, withRange,} from 'react-infinite-calendar';//https://github.com/clauderic/react-infinite-calendar
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import format from 'date-fns/format';
import axios from 'axios';
import {API_KEY} from '../../environment';

export default class Neo extends React.Component{
  
  constructor() {
    super();
    this.state = {
      startRaw: null,
      endRaw: null,
      startDate: null,
      endDate: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas consectetur urna, vel gravida purus eleifend at. Vivamus vitae lectus dictum, facilisis velit vel, euismod velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin a pellentesque nunc. Mauris id lectus vitae purus facilisis dapibus sit amet at turpis. Nunc id placerat magna, vel sodales justo. Duis posuere ultricies augue a tincidunt. Cras turpis est, vestibulum non justo vitae, volutpat sodales enim. Fusce iaculis dui orci, ut cursus lectus posuere quis. Pellentesque lacinia placerat tortor, ac luctus nisi varius elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id viverra sem. Integer non enim pharetra, gravida tortor non, cursus leo. Curabitur vel lacus et neque consequat euismod sit amet sit amet lacus."
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
    }
    else{
      //Verify here
      console.log("Date verified");
    }
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
		var today = new Date();
		var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    var help = "Select up to 7 days in the calendar";
    var mySelf = this;
		return(
			<div>
        <div class="col-md-6 col-md-offset-3">
          <h2>Near Earth Objects</h2>
        </div>
        <div class="col-md-6 col-md-offset-3">
          {help}
        </div>
        <div class="col-md-6 col-md-offset-3">
             <InfiniteCalendar
                Component={withRange(Calendar)}
                maxDate= {today}
                width={(window.innerWidth <= 650) ? window.innerWidth : 650}
                height={window.innerHeight - 250}
                rowHeight={70}
                onSelect={ 
                  (date) => {
                    setTimeout(() => {
                      if(date.eventType === 3){
                        mySelf.getDate(date);
                      }
                    }, 2200);
                  }

                    

                }
                displayOptions={{
                  layout: 'landscape',
                  showHeader: false
                }}
              selected={{
                  start: lastWeek,
                  end: today,
              }}
              />
            </div>
            <button type="button" class="btn btn-primary" onClick={() => {this.verifyDate()}}>Search</button>
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