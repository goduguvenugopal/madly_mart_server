const crypto = require("crypto");
const Payment = require("../../model/payments/payment");
const Order = require("../../model/Order");
 

// verify payment controller logic 
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      mongoOrderId,
      userEmail,
      totalAmount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Save payment details
      const savePaymentDetails = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        mongoOrderId,
        userEmail,
        totalAmount,
      });

      await savePaymentDetails.save();

      // Update payment status in the order
      await Order.findByIdAndUpdate(
        mongoOrderId,
        {
          $set: {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            paymentStatus: "paid",
            orderStatus : "confirmed"
          },
        },
        { new: true }
      );

      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// get all payments controler 
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });  

    return res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};




module.exports = {verifyPayment , getPayments}