var nodemailer = require('nodemailer');

module.exports = function(app) {
    var api = {};

    api.config = function(to, subject, text){
        var email = "wellingtonreis@hotmail.com.br";
        var password = "gpo2tky4f";

        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Hotmail",  // sets automatically host, port and connection security settings
            auth: {
                user: email,
                pass: password
            }
        });

        smtpTransport.sendMail({  //email options
            from: email, //"Sender Name <email@gmail.com>", --> sender address.  Must be the same as authenticated user if using Gmail.
            to: to, //"Receiver Name <receiver@email.com>", --> receiver
            subject: subject, //"Emailing with nodemailer", --> subject
            text: text, //"Email Example with nodemailer" --> body
        }, function(error, response){  //callback
            if(error){
                console.log(error);
            }else{
                return console.log("Message sent: " + response.message);
            }

            smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
        });
    };

    return api;
}