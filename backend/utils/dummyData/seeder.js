const fs = require("fs");
require("dotenv").config({ path: '../../config.env' });
const connectDB = require("../../config/db");
const Product = require("../../models/product.model");

let chalk;
(async () => {
  chalk = (await import("chalk")).default;

  console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

  // Connect to DB
  await connectDB();

  // Read dummy data from JSON file using JSON.parse()
  const products = JSON.parse(fs.readFileSync("./product.json", "utf-8"));

  const insertData = async () => {
    try {
      await Product.create(products);
      console.log(chalk.green.inverse("✅ Dummy data inserted successfully"));
      process.exit();
    } catch (err) {
      console.error(chalk.red.inverse("❌ Failed to insert data:"), err);
      process.exit(1);
    }
  };

  const destroyData = async () => {
    try {
      await Product.deleteMany();
      console.log(chalk.red.inverse("🗑️ All product data deleted"));
      process.exit();
    } catch (err) {
      console.error(chalk.red.inverse("❌ Failed to delete data:"), err);
      process.exit(1);
    }
  };

  // Command handling
  const command = process.argv[2];
  if (command === "--i") {
    await insertData();
  } else if (command === "--d") {
    await destroyData();
  } else {
    console.log(chalk.yellow.inverse("❓ Use '--i' to insert or '--d' to delete"));
    process.exit();
  }
})();
