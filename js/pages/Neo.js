import React from 'react';
import InfiniteCalendar, { Calendar, withRange,} from 'react-infinite-calendar';//https://github.com/clauderic/react-infinite-calendar
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import format from 'date-fns/format';

export default class Neo extends React.Component{
  
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null
    };
    this.getDate = this.getDate.bind(this);
  }
  getDate(date) {
    var startDate = format(date.start, 'YYYY-MM-DD');
    var endDate = format(date.end, 'YYYY-MM-DD');
    console.log(this.state);
    console.log("OnSelect Event");       
    console.log(startDate);
    console.log(endDate);
  }
	render() {
		var today = new Date();
		var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    var help = "Select up to 7 days in the calendar";
    var mySelf = this;
		return(
			<div>
				<h2>Near Earth Objects</h2>
        <div class="col-md-10 col-md-offset-1">
          {help}
        </div>
        <div class="col-md-6 col-md-offset-3">
             <InfiniteCalendar
                Component={withRange(Calendar)}
                maxDate= {today}
                width={(window.innerWidth <= 650) ? window.innerWidth : 650}
                height={window.innerHeight - 250}
                rowHeight={40}
                onSelect={ 
                  function(date){
                    mySelf.getDate(date);
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
        		<div class="col-md-10 col-md-offset-1">
        			<div class="panel panel-default">
        				<div class="panel-heading">Neo Content Here!</div>
        					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas consectetur urna, vel gravida purus eleifend at. Vivamus vitae lectus dictum, facilisis velit vel, euismod velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin a pellentesque nunc. Mauris id lectus vitae purus facilisis dapibus sit amet at turpis. Nunc id placerat magna, vel sodales justo. Duis posuere ultricies augue a tincidunt. Cras turpis est, vestibulum non justo vitae, volutpat sodales enim. Fusce iaculis dui orci, ut cursus lectus posuere quis. Pellentesque lacinia placerat tortor, ac luctus nisi varius elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id viverra sem. Integer non enim pharetra, gravida tortor non, cursus leo. Curabitur vel lacus et neque consequat euismod sit amet sit amet lacus.</p>
        			</div>
        		</div>
        	</div>
			);
	}
}