var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
          <div className="container-box">
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Contact Us</button>
          </div>
          {/* Modal */}
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              {/* Modal content*/}
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={close} data-dismiss="modal">×</button>
                  <h4 className="modal-title">Contact Us</h4>
                </div>
                <div className="modal-body">
                  <form role="form" method="post" id="reused_form">
                    <p>
                      Send your message in the form below and we will get back to you as early as possible.
                    </p>
                    <div className="form-group">
                      <label htmlFor="name">
                        Name:</label>
                      <input type="text" className="form-control" id="name" name="name" required maxLength={50} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        Email:</label>
                      <input type="email" className="form-control" id="email" name="email" required maxLength={50} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">
                        Message:</label>
                      <textarea className="form-control" type="textarea" name="message" id="message" placeholder="Your Message Here" maxLength={6000} rows={7} defaultValue={""} />
                    </div>
                    <button type="submit" className="btn btn-lg btn-success btn-block" id="btnContactUs">Post It! →</button>
                  </form>
                  <div id="success_message" style={{width: '100%', height: '100%', display: 'none'}}>
                    <h3>Sent your message successfully!</h3>
                  </div>
                  <div id="error_message" style={{width: '100%', height: '100%', display: 'none'}}>
                    <h3>Error</h3>
                    Sorry there was an error sending your form.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });