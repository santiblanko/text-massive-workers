import sqs from "./sqs";
import async from "async";
import sns from "./sns";

/*
+ Listen message queue.
* Santiago Blanco
*/
function listenMessageQUEUE() {
  getMessages()
    .then(processMessages)
    .then(sleep10000);
}

// Allow listen messages
listenMessageQUEUE();

/* Name of the smsQUEUE */
const SMSQUEUE = "";

/*
+ Allow delete messages from the queue.
* Santiago Blanco
*/
function getMessages() {
  return new Promise((resolve, reject) => {
    sqs
      .receiveMessage({
        QueueUrl: SMSQUEUE,
        MaxNumberOfMessages: 1,
        VisibilityTimeout: 30,
        WaitTimeSeconds: 20
      })
      .then(messages => {
        resolve(messages);
      });
  });
}

/*
+ Allow process messages from queue.
* Santiago Blanco
*/
function processMessages(messages) {
  return new Promise((resolve, reject) => {
    async.eachSeries(
      messages,
      (message, callback) => {
        processMessage()
          .then(() => {
            callback();
          })
          .catch(() => {
            callback();
          });
      },
      () => {
        resolve();
      }
    );
  });
}

/*
+ Allow process messages from queue.
* Santiago Blanco
*/
function processMessage(message) {
  return new Promise((resolve, reject) => {
    if (message.isSMS) {
      deleteMessageFromQueue(message);
      resolve();
    } else {
      deleteMessageFromQueue(message);
      resolve();
    }
  });
}

/*
+ Allow delete messages from the queue.
* Santiago Blanco
*/
function deleteMessageFromQueue(messages) {
  return new Promise((resolve, reject) => {});
}

/*
+ Sleep 10000 seconds.
* Santiago Blanco
*/
function sleep10000() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    });
  });
}
