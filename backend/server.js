const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: 'config.env' });
const connectDB = require("./config/db");
const categoryRoute = require("./routes/category.route");
const subcategoryRoute = require("./routes/subcategory.route");
const brandRoute = require("./routes/brands.route")
const productRoute = require("./routes/product.route");
const ApiError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/errorHandler");


const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

connectDB();

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories",subcategoryRoute);
app.use("/api/v1/brands",brandRoute);
app.use("/api/v1/products", productRoute);


// Not found middleware
app.all('/*splat', (req, res, next) => {
  //const err = new Error(`Can't find this route: ${req.originalUrl}`);
  //err.statusCode = 404;
  next(new ApiError(`Can't find this route: ${req.originalUrl}`,404));
});

app.use(globalErrorHandler)

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

//unhandled rejection outside express

process.on("unhandledRejection",(err)=>{
  console.error(`Unhandled Errors ${err.name} | ${err.message}`);
  server.close(()=>{
    console.error(`Shutting down .....`)
    process.exit(1);
  })
    
})