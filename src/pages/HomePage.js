import React, { Component } from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';

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

    display = () => {
        // if(this.state.status === "login"){
        //     return (
        //         <div>
        //             <div>
        //                 <Login/>
        //                 <button className= "signup" onClick={this.handleChange("signup")}>
        //                     Sign Up
        //                 </button>
        //             </div>
        //         </div>
        //     )
        // } else if (this.state.status === "signup"){
        //     return (
        //         <div>
        //             <div>
        //                 <button className= "login" onClick={this.handleChange("login")}>
        //                     Log In
        //                 </button>
        //                 <SignUp/>
        //             </div>
        //         </div>
        //     )
        // }else{
            return (
                <div>
                    <div>
                        <button className= "login" onClick={this.handleChange("login")}>
                            Log In 
                        </button>
                        <button className= "signup" onClick={this.handleChange("signup")}>
                            Sign Up
                        </button>
                    </div>
                </div>
            )
        // };
    }

    render() {
        return this.display();
    }
}

export default HomePage;