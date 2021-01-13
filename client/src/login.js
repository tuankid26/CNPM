import React, { Component } from 'react';
import {} from 'react-bootstrap';
import './Login.css';
import App from './App';
import TaskForm from './components/TaskForm';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			password: '',
			loginFailed: false,
			success: false
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange = (event) => {
		console.log(event.target.value);
		event.target.name === 'user' ? this.setState({user: event.target.value}) : this.setState({password: event.target.value});
	}
	
	handleSubmit = (event) => {
		// alert(this.state.user + ': ' + this.state.password);
		var user = this.state.user;
		var password = this.state.password;
		const data = {user:user, password: password};
		console.log(data);
		axios.post('http://localhost:9000/login', data)
		.then(res => {
			console.log(res.data);
			if (res.data !== 'success'){
				this.setState({loginFailed: true});
			}
			else{
				this.setState({
					loginFailed: false,
					success: true
				});
			}
		})
		.catch(err => {
			console.log(err);
		})
		event.preventDefault();
	}
    render() {
        return (
            <section className="login-block">		
				<div className="container">
  					<div className="row">
    			<div className="col-md-4 login-sec">
      			<h2 className="text-center">Login Now</h2>
      			<form className="login-form">
        			<div className="form-group">               
					{this.state.loginFailed ? 
					<div className="alert alert-danger" role="alert">
  						Tài khoản/Mật khẩu không hợp lệ!
					</div> : ''
					}
					{this.state.success ? 
					<div className="alert alert-success" role="alert">
						<Redirect to='/home' />
						{/* <Redirect to={
							{
								pathname: '/home',
								state: {success: true}
							}
						}/> */}
				  	</div> : ''
					}
                    <form onSubmit = {this.handleSubmit}>

                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="fa fa-user" ></span>
						  <label> UserName</label>
                        </div>
                        <input name="user" className="form-control" placeholder="Tài khoản" type="text" onChange={this.handleChange} />
                      </div>
					
                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"> <i className="fa fa-lock" /> </span>
						  <label> Password</label>
                        </div>
                        <input name="pass" className="form-control" placeholder="Mật khẩu" type="password" onChange={this.handleChange}/>
                      	</div>
					  
					<div className="form-check">
        				<button type="submit" className="btn btn-login float-right">Đăng nhập</button>
      				</div>
                     
                    </form>
                  </div>
					</form>
              </div>
            </div>
          </div>
		  </section>
        );
    }
    
}
export default Login;