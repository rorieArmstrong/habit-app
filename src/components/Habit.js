import React, { Component } from 'react';
import axios from 'axios';
const moment = require('moment');
const today = moment();

class Habit extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: this.props.data,
            today: false,
            date: this.props.date
        }
    }

    auth = () => {
        return window.confirm("Are you sure you want to delete this habit?")
    }

    deleteHabit = (event) => {
        let auth = this.auth();
        if(auth){
            axios.delete(`http://localhost:8000/api/habits/${this.state.data.habitID}`)
            .then(res => {alert("habit deleted")})
            .then(window.location.reload(false))
            .catch(error => {console.log(error)})
        }
    }

    doneToday = () => {
        return this.setState({today: !this.state.today})
    }
    
    updateStreak = () => {
        let entryDate = this.state.data.date_of_entry.split("--")
        const entry = moment(entryDate[0] + '-' + entryDate[1] + '-' + entryDate[2]);
        const now = today.format('YYYY-MM-DD');
        let streak = 0;

        if(this.state.data.frequency === "daily"){
            if(entry.diff(now, 'days') === 0){
                streak = this.state.data.streak;
            }else if(entry.diff(now, 'days') === 1){
                streak = this.state.data.streak + 1;
            }
        }else if(this.state.data.frequency === "weekly"){
            if(entry.diff(now, 'days') <= 7){
                streak = this.state.data.streak;
            }else if(entry.diff(now, 'days') <= 14){
                streak = this.state.data.streak + 1;
            }
        }else if(this.state.data.frequency === "monthly"){
            if(entry.diff(now, 'months') === 0){
                streak = this.state.data.streak;
            }else if(entry.diff(now, 'months') === 1){
                streak = this.state.data.streak + 1;
            }
        }
        return streak;
    }


    render() {
        return (
            <div className='habit'>
                <h3 className="activity">{this.state.data.activity}</h3>
                <button onClick={() => {this.deleteHabit()}}>
                    Delete Habit
                </button>
                <p>{this.state.data.streak}</p>
                <p>Done today: {(this.state.data.date_of_entry === this.state.date && this.state.data.streak > 0)? "Yes": "No"}</p>
            </div>
        );
    }
}

export default Habit;