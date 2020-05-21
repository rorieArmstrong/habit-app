import React, { Component } from 'react';
import HabiList from '../components/HabitList'
import Form from '../components/Form'
import './viewPage.css'

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state.userID,
            date: ""
        }
    }
    
    componentDidMount() {
        let now = new Date();
        let dd = now.getDate();

        let mm = now.getMonth()+1; 
        let yyyy = now.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        let date = yyyy+'--'+ mm+'--'+dd;
        this.setState({date: date})
    }

    render() {
        return (
            <div data-test="component-ViewPage">
                <HabiList userID={this.props.location.state.userID} date={this.state.date} data-test="component-habitList"/>
                <Form userID={this.props.location.state.userID} data-test="component-form"/>
            </div>
        );
    }
}

export default ViewPage;