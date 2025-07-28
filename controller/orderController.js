const Order = require("../model/Order");

//  creating place order constroller
const saveOrder = async (request, response) => {
  try {
    const id = request.userId;
    const {
      orderedProdcuts,
      shippingAddress,
      orderStatus,
      totalAmount,
      delayMessage,
    } = request.body;
    if (
      !id ||
      !orderedProdcuts ||
      !shippingAddress ||
      !orderStatus ||
      !totalAmount
    ) {
      return response.status(404).json({ message: "required order details" });
    }
    const currentDate = new Date().toLocaleDateString("en-GB");
    const placeOrder = new Order({
      userId: id,
      orderedProdcuts,
      shippingAddress,
      orderStatus,
      delayMessage,
      totalAmount,
      orderStatusDate: currentDate,
      orderDate: currentDate,
    });
    await placeOrder.save();
    return response.status(201).json({ message: "order placed successful" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get all orders controller
const getAllOrders = async (request, response) => {
  try {
    const retrievedAllOrders = await Order.find();
    return response
      .status(200)
      .json({ message: "all orders retrieved successful", retrievedAllOrders });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update order controller
const orderUpdateController = async (request, response) => {
  try {
    const { orderStatus } = request.body;
    const id = request.params.id;
    const orderUpdatedDate = new Date().toLocaleDateString("en-GB");
    await Order.findByIdAndUpdate(
      id,
      { $set: { orderStatus: orderStatus, orderStatusDate: orderUpdatedDate } },
      { new: true }
    );
    return response.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update order controller
const updateAllController = async (request, response) => {
  try {
    const id = request.params.id;
    const updateDelayOrder = request.body;
    await Order.findByIdAndUpdate(
      id,
      { $set: updateDelayOrder },
      { new: true }
    );
    return response.status(200).json({
      message: "Order details updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = {
  saveOrder,
  getAllOrders,
  orderUpdateController,
  updateAllController,
};
