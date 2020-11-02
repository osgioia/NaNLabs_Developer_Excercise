const axios = require("axios");

module.exports = {
  addCard: addCard,
  send404: send404,
};

function randomCharacters() {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomNumbers() {
  return Math.floor(1000 + Math.random() * 9000);
}

function addCard(req, res) {
  let type = req.body.type;
  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;
  let label;

  switch (type) {
    case "bug":
      if (description != undefined) {
        label = process.env.BUG_LABEL;
        title = "bug-" + randomCharacters() + "-" + randomNumbers();
      } else {
        res.status(405);
        res.json({ message: "Error: Wrong Parameters." });
        return false;
      }

      break;

    case "issue":
      if (title != undefined && description != undefined) {
        label = process.env.ISSUE_LABEL;
      } else {
        res.status(405);
        res.json({ message: "Error: Wrong Parameters." });
        return false;
      }

      break;

    case "task":
      if (title != undefined && category != undefined) {
        switch (category) {
          case "Maintenance":
            label = process.env.TASK_LABEL + "," + process.env.MAINTENANCE_LABEL;
            break;
  
          case "Research":
            label = process.env.TASK_LABEL + "," + process.env.RESEARCH_LABEL;
            break;
  
          case "Test":
            label = process.env.TASK_LABEL + "," + process.env.TEST_LABEL;
            break;
          default:
            label = process.env.TASK_LABEL + "," + process.env.TEST_LABEL;
            break;
        }
      } else {
        res.status(405);
        res.json({ message: "Error: Wrong Parameters." });
        return false;
      }
      

      break;

    default:
      label = process.env.ISSUE_LABEL;
      break;
  }

  let config = {
    method: "post",
    url:
      `https://api.trello.com/1/cards?name=` +
      title +
      `&desc=` +
      description +
      `&idList=` +
      process.env.LIST_ID +
      `&key=` +
      process.env.TRELLO_API +
      `&token=` +
      process.env.TOKEN +
      `&idLabels=` +
      label,
  };

  axios(config)
    .then( (response) => {
      console.log(JSON.stringify(response.data));
      res.status(200);
      res.json({ message: "Ok" });
    })
    .catch( (error) => {
      console.log(error);
      res.json({ message: "Error: " + error });
    });
}

function send404(req, res) {
  res.status(404);
  res.json({ message: "Error: 404 Not Found" });
}
