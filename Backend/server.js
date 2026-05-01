import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

// Connect to the database
connectDB();

// Start the server



app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});