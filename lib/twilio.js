const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const orderSubmitted = (userID, order) => {
  client.messages
    .create({
      body: `${userID} has submitted order#123456`,
      from: process.env.phone_from,
      to: process.env.phone_to
    })
    .then(message => console.log(message.sid));
};

const orderAccepted = (orderId) => {
  client.messages
    .create({
      body: `Your order ${orderId} has been accepted. It will be ready in 15 mins`,
      from: process.env.phone_from,
      to: process.env.phone_to
    })
    .then(message => console.log(message.sid));
};

const orderRejected = (orderId) => {
  client.messages
    .create({
      body: `Your order ${orderId} has been rejected.`,
      from: process.env.phone_from,
      to: process.env.phone_to
    })
    .then(message => console.log(message.sid));
};


const orderCompleted = (userID, orderId) => {
  client.messages
    .create({
      body: `Your order ${orderId} is ready for pickup.`,
      from: process.env.phone_from,
      to: process.env.phone_to
    })
    .then(message => console.log(message.sid));
};


module.exports = { orderSubmitted, orderAccepted, orderRejected, orderCompleted };
