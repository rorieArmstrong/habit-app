import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frequency: "daily",
            activity: null,
            userID: null,
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
        const data = {
            userName: this.state.userName,
            password: this.state.password,
            firstName: this.state.firstName,
            surname: this.state.surname,
        }
        // post the data
        fetch("http://localhost:8000/signup", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
          // then sign them in
        .then(() => fetch(`http://localhost:8000/userAuth/${this.state.userName}/${this.state.password}`))
        .then(response => response.json())
        .then(user => {return this.setState({userID: user})})
        //this.props.location.state.userID
        .then((e) => {this.props.history.push("/habits",  { userID: this.state.userID})})
        .catch(error => {
            this.setState({loading: false}) 
            alert("Invalid Sign Up")})

        // redirect as if they had just logged in
    }
    
    render() {
        return (
            <div className="Sign Up">
                <form className="UserAuth" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Activity" value={this.state.value} name='activity' onChange={this.handleChange} required/>
                    <select 
                        onChange={this.handleChange}
                        value={this.state.frequency}
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

export default withRouter(Form);