const Cart = require("../model/Cart");

// creating cart products save controller
const addToCart = async (request, response) => {
  try {
    const {
      products,
      productId,
      totalAmount,
      itemQty,
      color,
      capacity,
      weight,
      size,
    } = request.body;
    const decodedId = request.userId;
    if (!decodedId) {
      return response.status(404).json({ message: "userId required" });
    }

    const saveCartProducts = new Cart({
      userId: decodedId,
      products,
      productId,
      totalAmount,
      itemQty,
      color,
      capacity,
      weight,
      size,
    });

    await saveCartProducts.save();
    return response.status(201).json({ message: "item added to cart" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// retrieving individual user cart products controller
const getUserCartProducts = async (request, response) => {
  try {
    const decodedId = request.userId;
    if (!decodedId) {
      return response.status(404).json({ message: "userId required" });
    }
    const retrievdProducts = await Cart.find({ userId: decodedId });
    return response.status(200).json({
      message: "user cart products retrieved successfully",
      retrievdProducts,
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update cart product
const updateCartProduct = async (request, response) => {
  try {
    const updateData = request.body;
    await Cart.findByIdAndUpdate(
      request.params.id,
      { $set: updateData },
      { new: true }
    );
    return response.status(200).json({
      message: "user cart product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// delete cart product Controller

const deleteCartProduct = async (request, response) => {
  try {
    await Cart.findByIdAndDelete(request.params.id);
    return response.status(200).json({
      message: "user cart product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = {
  addToCart,
  getUserCartProducts,
  updateCartProduct,
  deleteCartProduct,
};
