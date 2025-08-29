const Order = require("../../model/Order");
const FailedPayment = require("../../model/payments/failedPayment");

// save failed payments
const postFailedPaymentController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      userEmail,
      mongoOrderId,
      error,
      totalAmount,
    } = req.body;

    const failedPayment = new FailedPayment({
      razorpay_order_id,
      razorpay_payment_id,
      userEmail,
      mongoOrderId,
      totalAmount,
      error,
    });

    await failedPayment.save();

    // retrieve order and update payment description
    let order = await Order.findById(mongoOrderId);
    order.paymentDescription = error.description;

    // and save updated document
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Failed payment recorded",
      failedPayment,
    });
  } catch (error) {
    console.error("Error saving failed payment:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save failed payment",
      error: error.message,
    });
  }
};

// get failed payments
const getFailedPaymentsController = async (req, res) => {
  try {
    const failedPayments = await FailedPayment.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Failed payments fetched successfully",
      failedPayments,
    });
  } catch (error) {
    console.error("Error fetching failed payments:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch failed payments",
      error: error.message,
    });
  }
};

module.exports = { getFailedPaymentsController, postFailedPaymentController };
