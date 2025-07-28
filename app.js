require("dotenv").config();
const express = require("express");
const app = express();
const mongodbConnection = require("./config/mongodb")
const cors = require("cors")
const corsOptions = require("./utils/cors");
const emailRoute = require("./routes/emailRoute");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const carouselRoute = require("./routes/carouselRoute");
const categoryRoute = require("./routes/categoryRoute");
const addressRoute = require("./routes/shippingAdressRoute");
const orderRoute = require("./routes/orderRoute");
const updatesMailRoute = require("./routes/updatesMailRoute");
const offerRoute = require("./routes/offerRoute");

 
// middlewares
// app.use(cors(corsOptions));
app.use(cors())
app.use(express.json());

// route middlewares
app.use("/email", emailRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/carousel", carouselRoute);
app.use("/category", categoryRoute);
app.use("/address", addressRoute);
app.use("/order", orderRoute);
app.use("/updates-email", updatesMailRoute);
app.use("/offer", offerRoute);

const PORT = process.env.PORT || 3000;

// server listens function
app.listen(PORT, '0.0.0.0', async () => {
  try {
    // mongodb function calling here to connect
    await mongodbConnection();
    console.log(`⚡ Server is running at port number : ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
