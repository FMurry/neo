import React from 'react';
import { Link } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default class Layout extends React.Component{
	constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  render() {
		const { location } = this.props;
    const containerStyle = {
     		marginTop: "60px"
    	};
		return(
			<div>

        <Nav location={location} />

        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">

              {this.props.children}

            </div>
          </div>
        </div>
      </div>

			);
	}
}