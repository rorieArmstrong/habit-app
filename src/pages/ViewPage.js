import React, { Component } from 'react';
import HabiList from '../components/HabitList'
import Form from '../components/Form'

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userID: this.props.location.state.userID
        }
    }
    
    render() {
        return (
            <div>
                <HabiList props={{userID: 1}}/>
                <Form/>
            </div>
        );
    }
}

export default ViewPage;