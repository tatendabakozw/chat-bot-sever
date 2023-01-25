const express = require("express");
const dev = require("../config/dev");
const dialogflow = require("dialogflow");
const router = express.Router();

const projectId = dev.googleProjectID;
const privateKey = dev.googlePrivateKey;
const sessionId = dev.dialogFlowSessionID;

const credentials = {
  client_email: dev.googleClientEmail,
  private_key: dev.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

// send message
// /api/message/send
// post request
router.post("/message", async (req, res) => {
  try {
    const { userText, userId } = req.body;
    const sessionPath = sessionClient.sessionPath(
      projectId,
      sessionId + userId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userText,
          languageCode: "en-US",
        },
      },
    };
    
    const response = await sessionClient.detectIntent(request);
    console.log(response);
    return res
      .status(200)
      .send({ message: "message send", response: response });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: `${error}` });
  }
});

module.exports = router;
