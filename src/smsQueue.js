/* Name of the smsQUEUE */
const SMSQUEUE = "";

/*
 * Allow listen if there are campaigns in queue
 * Santiago Blanco
 */
function listenCampaignsQueue() {
  // obtain queue messages
  // get users per campaign
  getUsersPerCampaign(campaign)
    .then(divideUsersInChunks)
    .then(addToSMSQueue)
    .then(sleep10000)
    .then(listenCampaignsQueue);
}

listenCampaignsQueue();

/*
 * Allow get users per campaing
 * Santiago Blanco
 */
function getUsersPerCampaign(campaign) {
  return new Promise((resolve, reject) => {
    // aqui hay que hacer una consulta a
    // mysql para obtener los usuarios de la campaña
    // sin filtro

    resolve({
      campaign,
      users
    });
  });
}

/*
 * Allow divide users in chunks of 10
 * Santiago Blanco
 */
function divideUsersInChunks(info) {
  return new Promise((resolve, reject) => {
    resolve({
      chunks
    });
  });
}

/*
 * Allow add message to queue
 * Santiago Blanco
 */
function addToSMSQueue() {
  return new Promise((resolve, reject) => {});
}

/*
 * Allow sleep 10 seconds
 * Santiago Blanco
 */
function sleep10000() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 10000);
  });
}

