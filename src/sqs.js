// require aws lib
var AWS = require("aws-sdk");
// get Config file
AWS.config.loadFromPath("./config.json");
// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

// https://docs.aws.amazon.com/es_es/sns/latest/dg/sms_publish-to-topic.html
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/javascript/example_code/sns/sns_publishtotopic.js

/*
 * Allow send messages
 * Santiago Blanco
 */
function sendMessage(params) {
  // var params = {
  //     DelaySeconds: 10,
  //     MessageAttributes: {
  //       "Title": {
  //         DataType: "String",
  //         StringValue: "The Whistler"
  //       },
  //       "Author": {
  //         DataType: "String",
  //         StringValue: "John Grisham"
  //       },
  //       "WeeksOn": {
  //         DataType: "Number",
  //         StringValue: "6"
  //       }
  //     },
  //     MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  //     // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  //     // MessageId: "Group1",  // Required for FIFO queues
  //     QueueUrl: "https://sqs.us-east-2.amazonaws.com/712652438891/Example2"
  //   };

  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.MessageId);
      }
    });
  });
}

/*
 * Allow receive a message
 * Santiago Blanco
 */
function receiveMessage(params) {
//   // var params = {
//     "QueueUrl": appConf.sqs_distribution_url,
//     "MaxNumberOfMessages": 1,
//     "VisibilityTimeout": 30,
//     "WaitTimeSeconds": 20
// }

  return new Promise((resolve, reject) => {
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        reject(err);
      } else if (data.Messages) {
        resolve("data", data.Messages);
      }
    });
  });
}

/*
 * Allow delete a message from the queue
 * Santiago Blanco
 */
function deleteMessage() {
  var deleteParams = {
    QueueUrl: queueURL,
    ReceiptHandle: data.Messages[0].ReceiptHandle
  };
  sqs.deleteMessage(deleteParams, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
}

/*
 * Allow get all queues in the aws account
 * Santiago Blanco
 */
function getQueues() {
  // Create an SQS service object
  var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

  var params = {};

  sqs.listQueues(params, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data.QueueUrls);
    }
  });
}

/*
 * Allow find a queue by name
 * Santiago Blanco
 */
function findQueue() {
  // // Create an SQS service object
  // var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

  // var params = {
  //   QueueName: 'textMessaging'
  // };

  sqs.getQueueUrl(params, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data.QueueUrl);
    }
  });
}

/*
 * Allow create a queue
 * Santiago Blanco
 */
function createQueue() {
  //   // Create an SQS service object
  //   var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

  //   var params = {
  //     QueueName: "Chucho",
  //     Attributes: {
  //       DelaySeconds: "60",
  //       MessageRetentionPeriod: "86400"
  //     }
  //   };

  sqs.createQueue(params, function(err, data) {
    if (err) {
      reject("Error", err);
    } else {
      resolve(data.QueueUrl);
    }
  });
}

/*
 * Allow delete a queue
 * Santiago Blanco
 */
function deleteQueue(params) {
  //   var params = {
  //     QueueUrl: "https://sqs.us-east-2.amazonaws.com/712652438891/textMessaging"
  //   };

  sqs.deleteQueue(params, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
}

exports = {
  sendMessage,
  receiveMessage,
  deleteMessage,
  getQueues,
  findQueue,
  createQueue,
  deleteQueue
};
