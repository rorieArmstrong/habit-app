import React, { Component } from 'react';
import Habit from './Habit';

class HabitList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            userID: this.props.userID,
            habits: []
        }
    }
    
    getData = () => {
        fetch(`http://localhost:8000/api/habits/users/1`)
        .then(response => response.json())
        .then(habits => {return this.setState({habits: habits})})
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.getData()
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.habits.map(habit => {
                        return (
                            <div key={habit.habitID}>
                                <Habit  data={habit}/>
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