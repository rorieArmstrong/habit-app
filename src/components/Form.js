import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frequency: "daily",
            activity: null,
            userID: this.props.userID,
            today: false,
            loading: false
        }
    };

    handleChange = (event) => {
        event.preventDefault();
        return this.setState({[event.target.name]: event.target.value})
    }

    doneToday = () => {
        return this.setState({today: !this.state.today})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true})
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
        const data = {
            frequency: this.state.frequency,
            activity: this.state.activity,
            userID: this.state.userID,
            streak: +this.state.today,
            date_of_entry: date,
            date_of_streak: date
        }
        // post the data
        fetch("http://localhost:8000/api/habits", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
        .then((e) => {
            alert("Habit Submited!")
        })
        .then(() => {window.location.reload(true)})
        .catch(error => {
            this.setState({loading: false}) 
            alert(error)})
    }
    
    render() {
        return (
            <div className="signUp" data-test="component-form">
                <h3>Add a new habit</h3>
                <form className="userAuth" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Activity" value={this.state.value} name='activity' onChange={this.handleChange} required/>
                    <select 
                        onChange={this.handleChange}
                        value={this.state.frequency}
                        data-test="sel-frequency"
                        name="frequency">
                            <option value="daily">daily</option>
                            <option value="weekly">weekly</option>
                            <option value="monthly">monthly</option>
                    </select>
                    <label className='habitLabel'>
                    Have you done this today?
                        <input type="checkbox" value={this.state.today} name="today" onChange={this.doneToday} />
                    </label>
                    <button disabled={this.state.loading} className="button" type="submit">
                    {this.state.loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {this.state.loading && <span>Creating Habit</span>}
                    {!this.state.loading && <span>Create Habit</span>}
                    </button>
                </form>
            </div>
        );
    }
}

export default Form;