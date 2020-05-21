import React, { Component } from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import './homePage.css'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ""
        }
    }
    
    handleChange = (value) => {
        return this.setState({status: value})
    }

    render() {
        if(this.state.status === "login"){
            return (
                <div >
                    <div>
                        <Login data-test="login-component"/>
                        <button className= "signup" onClick={() => this.handleChange("signup")} data-test="login-button">
                            Sign Up
                        </button>
                    </div>
                </div>
            )
        } else if (this.state.status === "signup"){
            return (
                <div>
                    <div>
                        <SignUp/>
                        <button className= "login" onClick={() => this.handleChange("login")} data-test="signUp-button">
                            Log In
                        </button>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="Page" data-test="component-HomePage">
                    <h1>Welcome to Habyte</h1>
                    <h3>the habit tracker for you</h3>
                    <div>
                        <button className= "login" onClick={() => this.handleChange("login")} data-test="login-button" >
                            Log In 
                        </button>
                        <button className= "signup" onClick={() => this.handleChange("signup")} data-test="signUp-button">
                            Sign Up
                        </button>
                    </div>
                </div>
            )
        };
    }
}

export default HomePage;