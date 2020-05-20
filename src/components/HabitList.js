import React, { Component } from 'react';
import Habit from './Habit';
const moment = require('moment');
const today = moment();

class HabitList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            userID: this.props.userID,
            habits: [],
            date: this.props.date
        }
    }
    
    getData = () => {
        fetch(`http://localhost:8000/api/habits/users/${this.props.userID}`)
        .then(response => response.json())
        .then(habits => {return this.setState({habits: habits})})
        .catch(err => {
            console.log(err)
        })
    }

    setStreak = (data) => {
        let entryDate = data.date_of_entry.split("--")
        const entry = moment(entryDate[0] + '-' + entryDate[1] + '-' + entryDate[2]);
        const now = today.format('YYYY-MM-DD');
        let streak = 0;

        if(data.frequency === "daily"){
            if(entry.diff(now, 'days') <= 1){
                streak = data.streak;
            }
        }else if(data.frequency === "weekly"){
            if(entry.diff(now, 'days') <= 8){
                streak = data.streak;
            }
        }else if(data.frequency === "monthly"){
            if(entry.diff(now, 'months') <= 1){
                streak = data.streak;
            }
        }
        return streak;
    }

    updateStreak = (habit) => {
        const updatedData = {
            streak: this.setStreak(habit)
        };
        fetch(`http://localhost:8000/api/habits/${habit.habitID}`, {
                method: 'PUT', 
                mode: 'cors', 
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(updatedData) // 
        })
    }

    onLoad = async () => {
        fetch(`http://localhost:8000/api/habits/users/${this.props.userID}`)
        .then(response => response.json())
        .then(habits => {habits.map(habit =>{
               this.updateStreak(habit)
            })})
        .then(this.getData())
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.onLoad()
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.habits.map(habit => {
                        return (
                            <div key={habit.habitID}>
                                <Habit  data={habit} date={this.props.date}/>
                            </div>
                        )
                    })}
                    <button className="button" type="submit">
                        <span>Update Habits</span>
                    </button>
                </div>
            </div>

        );
    }
}

export default HabitList;