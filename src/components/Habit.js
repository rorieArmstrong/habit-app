import React, { Component } from 'react';

class Habit extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.data,
            today: false
        }
    }

    deleteHabit = () => {
        let confirm = confirm("Are you sure you want to delete this habit?")
        if(confirm){
            axios.delete(`loacalhost:8000/api/habits/${this.state.data.habitID}`)
            .then(res => {alert("habit deleted")})
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
                    x
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