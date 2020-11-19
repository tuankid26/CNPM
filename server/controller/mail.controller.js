var dotenv = require('dotenv').config()
var nodemailer =  require('nodemailer'); // khai báo sử dụng module nodemailer

module.exports.sendMail = function(req, res) {

    //var testAccount = await nodemailer.createTestAccount();
    // console.log(testAccount);
    var transporter =  nodemailer.createTransport({ // config mail server
        service: 'gmail',
        // host: 'smtp.etheral.email',
        // port: 587,
        // secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
        // auth: {
        //     user: testAccount.user,
        //     pass: testAccount.pass
        // },
        // tls:{
        //     rejectUnauthorized: false
        // }
    });
    var mailOptions = { // thiết lập đối tượng, nội dung gửi mail
        //from: req.body.name,
        to: req.body.email,
        subject: 'Test Nodemailer',
        text: 'You recieved message from ' + req.body.name,
        // html: '<p>You have got a new message</b><ul><li>Username:' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li>Username:' + req.body.message + '</li></ul>'
    }
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/send');
        }
    });
}