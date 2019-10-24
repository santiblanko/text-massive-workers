var mysql = require("mysql");

/*
 * allows get Registers to process per campaign
 * Santiago Blanco
 */
function getRegisterPerCampaign(campaignId) {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host:
        "dbtextmassive-cluster.cluster-chbm8ynuhucp.us-east-2.rds.amazonaws.com",
      user: "root",
      password: "toor1234",
      database: "textmassive"
    });

    connection.connect();

    connection.query(
      "SELECT * from campaignusers where campaign = " + campaignId,
      function(error, results, fields) {
        if (error) {
          connection.end();
          reject(error);
          return;
        }
        connection.end();
        resolve(results);
      }
    );
  });
}

// getRegisterPerCampaign(2).then((v) => {
//   console.log(v)
// })

exports = {
  getRegisterPerCampaign
};
