
import './Login.css';

function Login() {
        return(
          <section className="Login pt-5 pb-5 mt-0 align-items-center d-flex bg-dark"  >
        <div className="container-fluid">
          <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
            <div className="col-12 col-md-4 col-lg-3  h-50 ">
              <div className="card shadow">
                <div className="card-body mx-auto">
                  <h4 className="card-title mt-3 text-center">Welcome Back</h4>
                  <p className="text-center">Get started with your free account</p>
                  <p>
                    <a href="#" className="btn btn-block btn-danger">
                      <i className="fab fa-google mr-2"></i>Login via Google</a>
                  </p>
                  <p className="text-muted font-weight-bold ">
                    <span>OR</span>
                  </p>
                  <form>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                      </div>
                      <input name="" className="form-control" placeholder="User name/Email adress" type="text"/>
                    </div>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                      </div>
                      <input className="form-control" placeholder="Password" type="password"/>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block"> Login </button>
                    </div>
                    <p className="text-center">
                      <a href="">Forgot your password?</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
     </section>
        );
      }

export default Login;
