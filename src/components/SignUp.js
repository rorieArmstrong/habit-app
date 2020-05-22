import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: null,
            password: null,
            first_name: null,
            surname: null,
            userID: null,
            loading: false
        }
    };

    handleChange = (event) => {
        return this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
     
        this.setState({loading: true})
        const data = {
            user_name: this.state.user_name,
            password: this.state.password,
            first_name: this.state.first_name,
            surname: this.state.surname,
        }
        // post the data
        fetch("http://localhost:8000/users/register", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
          // then sign them in
        .then(() => fetch(`http://localhost:8000/users/${this.state.user_name}/${this.state.password}`))
        .then(response => response.json())
        .then(user => {return this.setState({userID: user})})
        //this.props.location.state.userID
        .then((e) => {this.props.history.push("/habits",  { userID: this.state.userID})})
        .catch(error => {
            console.log(error);
            this.setState({loading: false});
            alert("Invalid Sign Up")});
            

        // redirect as if they had just logged in
        event.preventDefault();
    }
    
    render() {
        return (
            <div className="signUp">
                <form className="UserAuth" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Username" value={this.state.value} name='user_name' onChange={this.handleChange} data-test="inp-username" />
                    <input type="password" placeholder="Password" value={this.state.value} name='password' onChange={this.handleChange} />
                    <input type="text" placeholder="First Name" value={this.state.value} name='first_name' onChange={this.handleChange} data-test="inp-firstName" />
                    <input type="text" placeholder="Surname" value={this.state.value} name='surname' onChange={this.handleChange} data-test="inp-surname"/>
                    <button disabled={this.state.loading} className="button" type="submit">
                    {this.state.loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {this.state.loading && <span>Creating Account</span>}
                    {!this.state.loading && <span>Create Account</span>}
                    </button>
                </form>
            </div>
        );
    }
}

export default memoryRouter(SignUp);