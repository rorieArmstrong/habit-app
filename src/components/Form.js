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
       
        return this.setState({[event.target.name]: event.target.value})
        event.preventDefault();
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
            date_of_entry: date
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
          // then sign them in
        .then((e) => {
            alert("Habbit Submited!")
        })
        .then(() => {window.location.reload(true)})
        // .then(() => { return this.setState({
        //     frequency: "daily",
        //     activity: null,
        //     today: false,
        //     loading: false
        // })})
        .catch(error => {
            this.setState({loading: false}) 
            alert(error)})

        // redirect as if they had just logged in
    }
    
    render() {
        return (
            <div className="Sign Up" data-test="component-form"> 
                <form className="UserAuth" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Activity" value={this.state.value} name='activity' onChange={this.handleChange} />
                    <select 
                        onChange={this.handleChange}
                        value={this.state.frequency}
                        data-test="sel-frequency"
                        name="frequency">
                            <option value="daily">daily</option>
                            <option value="weekly">weekly</option>
                            <option value="monthly">monthly</option>
                    </select>
                    <label>
                        <input type="checkbox" value={this.state.today} name="today" onChange={this.doneToday} />
                        Have you done this today?
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