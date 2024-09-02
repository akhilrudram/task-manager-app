const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./database/db');
const app = express();
const routes = require("./routes/indexRoute");

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(morgan('dev'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
