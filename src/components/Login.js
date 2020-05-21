import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: null,
            userID: null,
            loading: false
        }
    };

    handleChange = (event) => {
        return this.setState({[event.target.name]: event.target.value})
        event.preventDefault();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true, isLoged: true})
        // this route gets the userID matching the input 
        fetch(`http://localhost:8000/users/${this.state.userName}/${this.state.password}`)
        .then(response => response.json())
        .then(user => {return this.setState({userID: user})})
        //this.props.location.state.userID
        .then((e) => {this.props.history.push("/habits",  { userID: this.state.userID})})
        .catch(error => {
            this.setState({loading: false}) 
            alert("Invalid Username or Password")})

        this.setState({loading: false})
    }
    
    render() {
        return (
            <div className="Login">
                <form className="UserAuth" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Username" value={this.state.value} name='userName' onChange={this.handleChange} />
                    <input type="password" placeholder="Password" value={this.state.value} name='password' onChange={this.handleChange} />
                    <button disabled={this.state.loading} className="button" type="submit">
                    {this.state.loading && (
                        <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                        />
                    )}
                    {this.state.loading && <span>Logging In</span>}
                    {!this.state.loading && <span>Submit</span>}
                    </button>
                </form>
            </div>
        );
    }
}

 export default Login;