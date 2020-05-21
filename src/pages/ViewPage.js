import React, { Component } from 'react';
import HabiList from '../components/HabitList'
import Form from '../components/Form'

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state.userID
        }
    }
    
    render() {
        return (
            <div data-test="component-ViewPage" >
                <HabiList userID={1} data-test="component-habitList"/>
                <Form userID={1} data-test="component-form"/>
            </div>
        );
    }
}

export default ViewPage;