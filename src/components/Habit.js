import React, { Component } from 'react';
import axios from 'axios';

class Habit extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: this.props.data,
            today: false
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
    
    render() {
        return (
            <div>
                <h3>{this.state.data.activity}</h3>
                <button onClick={() => {this.deleteHabit()}}>
                    X
                </button>
                <p>{this.state.data.streak}</p>
                <label>
                    <input type="checkbox" value={this.state.today} name="today" onChange={this.doneToday} />
                    Have you done this today?
                </label>
            </div>
        );
    }
}

export default Habit;