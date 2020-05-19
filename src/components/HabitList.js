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
        fetch(`localhost:8000/api/habits/users/${this.state.userID}`)
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
                <form action="" method="POST">
                    {this.state.habits.map(habit => {
                        return (
                            <div>
                                <Habit props={{data: habit}}/>
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