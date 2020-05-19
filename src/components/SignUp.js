import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
            firstName: null,
            surname: null,
            userID: null,
            loading: false
        }
    };

    handleChange = (event) => {
        event.preventDefault();
        return this.setState({[event.target.name]: event.target.value})
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
                    <input type="text" placeholder="Username" value={this.state.value} name='userName' onChange={this.handleChange} />
                    <input type="password" placeholder="Password" value={this.state.value} name='password' onChange={this.handleChange} />
                    <input type="text" placeholder="First Name" value={this.state.value} name='firstName' onChange={this.handleChange} />
                    <input type="text" placeholder="Surname" value={this.state.value} name='surname' onChange={this.handleChange} />
                    <button disabled={this.state.loading} className="button" type="submit">
                    {this.state.loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {this.state.loading && <span>Creating Acount</span>}
                    {!this.state.loading && <span>Create Acount</span>}
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(SignUp);