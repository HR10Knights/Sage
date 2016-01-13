var nodemailer = require('nodemailer');
// send mail with password confirmation

var transporter = function() {
  return nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: 'postmaster@sandboxf52e7dbcc4934b92b1fce795fdebdd30.mailgun.org',
      pass: 'a2cf2867214f5a602be346627c0b32db'
    }
  });
};

module.exports = {
  sendEmail: function(req, res, next) {

    var mailOpts = {
      from: 'SageMasterFlash@sparta.com',
      to: req.body.recipients,
      subject: req.body.subject,
      text: req.body.text || '',
      html: req.body.html || ''
    };

    var trans = transporter();

    trans.sendMail(mailOpts, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        res.send('Message Sent');
      }
    });
  }
};
