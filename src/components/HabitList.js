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
            date: this.props.date,
            toUpdate: {}
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
                this.setState(prevState => ({
                    toUpdate: {
                        ...prevState.toUpdate,
                        [habit.habitID]: false
                    }
                }))
                return this.updateStreak(habit)
            })})
        .then(this.getData())
        .catch(err => {
            console.log(err)
        })
    }

    doneToday = (habitID) => {
        return this.setState(prevState => ({
            toUpdate: {
                ...prevState.toUpdate,
                [habitID]: !prevState.toUpdate[habitID]
            }
        }))
    }

    addToStreak = (event) => {
        event.preventDefault();
        let date = new Date();
        let dd = date.getDate();

        let mm = date.getMonth()+1; 
        let yyyy = date.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        let todays_date = yyyy+'--'+ mm+'--'+dd;
        for (let [key, value] of Object.entries(this.state.toUpdate)) {
            if (value === true){
                let habit = this.state.habits.find(obj => {
                    return obj.habitID === Number(key)
                })
                
                let entryDate = habit.date_of_streak.split("--")
                const entry = moment(entryDate[0] + '-' + entryDate[1] + '-' + entryDate[2]);
                const now = today.format('YYYY-MM-DD');
                let streak_date = habit.date_of_streak
                let streak = habit.streak;
                if(habit.frequency === "daily"){
                    if(entry.diff(now, 'days') === 1){
                        streak += 1;
                        streak_date= todays_date
                    }
                }else if(habit.frequency === "weekly"){
                    if(8<= entry.diff(now, 'days') <= 14){
                        streak += 1;
                        streak_date= todays_date;
                    }
                }else if(habit.frequency === "monthly"){
                    if(entry.diff(now, 'months') === 1){
                        streak += 1;
                        streak_date= todays_date;
                    } 
                } 
                if(streak===0){
                    streak=1
                    streak_date= todays_date
                }
                const updatedData = {
                    streak: streak,
                    date_of_entry: todays_date,
                    date_of_streak: streak_date
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
        }
        window.location.reload(true)
    }

    componentDidMount(){
        this.onLoad()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addToStreak}>
                    {this.state.habits.map(habit => {
                        return (
                            <div key={habit.habitID}>
                                <Habit  data={habit} date={this.props.date}/>
                                <label>
                                    <input type="checkbox" value={this.state.today} name={"today"+habit.habitID} onChange={() => {this.doneToday(habit.habitID)}} />
                                    Have you done this today?
                                </label>
                            </div>
                        )
                    })}
                    <button className="button" type="submit">
                        <span>Update Habits</span>
                    </button>
                </form>
            </div>

        );
    }
}

export default HabitList;