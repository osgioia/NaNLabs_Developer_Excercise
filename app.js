const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

dotenv.config();
const app = express();
const port = 3000 || process.env.PORT;


app.use(morgan('dev'));
app.use(bodyparser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require("./routes/routes"));


app.listen(port, () => {
  console.log(`NaN Labs Developer Excercise listening at http://localhost:${port}`);
});