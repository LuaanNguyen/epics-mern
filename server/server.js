//Set up a express server to handle HTTP requests
import express from "express";
import cors from "cors"; //middleware to handle cross-origin resource sharing
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050; //local PORT connection for incoming requests
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

//start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
