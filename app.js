require("dotenv").config();
const express = require("express");
const app = express();
const mongodbConnection = require("./config/mongodb");
const cors = require("cors");
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
const paymentsRoute = require("./routes/payments/paymentsRoute");
const failedPaymentsRoute = require("./routes/payments/failedPaymentsRoute");
// middlewares
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

// global route register middlewares
app.use("/api/email", emailRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/carousel", carouselRoute);
app.use("/api/category", categoryRoute);
app.use("/api/address", addressRoute);
app.use("/api/order", orderRoute);
app.use("/api/updates-email", updatesMailRoute);
app.use("/api/offer", offerRoute);
app.use("/api", paymentsRoute);
app.use("/api", failedPaymentsRoute);

const PORT = process.env.PORT || 3000;

// server listens function
app.listen(PORT, "0.0.0.0", async () => {
  try {
    // mongodb function calling here to connect
    await mongodbConnection();
    console.log(`⚡ Server is running at port number : ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
