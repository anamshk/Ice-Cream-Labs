const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

orderSubmitted = (userID, order) => {
  client.messages
  .create({
     body: `${userID} has submitted order#123456`,
     from: '+1-863-356-0630',
     to: '+1-647-821-1942'
   })
  .then(message => console.log(message.sid));
}

module.exports = { orderSubmitted };
