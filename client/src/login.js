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
            <div className="container-fluid">
            <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
              <div className="col-12 col-md-4 col-lg-3   h-50 ">
                <div className="card shadow">
                  <div className="card-body mx-auto">
                    <h4 className="card-title mt-3 text-center">Quản lý phản hồi</h4>
                    {/* <p classname="text-center">Get started with your free account</p> */}
                    {/* <p>
                      <a href classname="btn btn-block btn-danger">
                        <i classname="fab fa-google mr-2" />Login via Google</a>
                    </p>
                    <p classname="text-muted font-weight-bold ">
                      <span>OR</span>
                    </p> */}
					{this.state.loginFailed ? 
					<div class="alert alert-danger" role="alert">
  						Tài khoản/Mật khẩu không hợp lệ!
					</div> : ''
					}
					{this.state.success ? 
					<div class="alert alert-success" role="alert">
						<Redirect to='/home'/>
				  	</div> : ''
					}
                    <form onSubmit = {this.handleSubmit}>
                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"> <i className="fa fa-user" /> </span>
                        </div>
                        <input name="user" className="form-control" placeholder="Tài khoản" type="text" onChange={this.handleChange} />
                      </div>
                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"> <i className="fa fa-lock" /> </span>
                        </div>
                        <input name="pass" className="form-control" placeholder="Mật khẩu" type="password" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group">
						  {/* <Link to="/home"> */}
						  	<button type="submit" className="btn btn-primary btn-block" > Đăng nhập </button>
						  {/* </Link> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
		  
        );
    }
    
}
export default Login;