const ShippingAddress = require("../model/ShippingAddress");

// creating address controller
const saveAddressController = async (request, response) => {
  try {
    const { name, phone, email, street, village, state, postalCode, district } =
      request.body;
    const id = request.userId;
    if (
      !name ||
      !phone ||
      !street ||
      !postalCode ||
      !id ||
      !email ||
      !state ||
      !village ||
      !district
    ) {
      return response
        .status(404)
        .json({ message: "shipping address details required" });
    }

    const saveAddress = new ShippingAddress({
      userId: id,
      name,
      phone,
      email,
      street,
      village,
      district,
      state,
      postalCode,
    });

    await saveAddress.save();
    return response.status(201).json({
      message: "shipping address details saved successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get individuals address controller

const getAddress = async (request, response) => {
  try {
    const id = request.userId;
    if (!id) {
      return response.status(404).json({ message: "user Id required" });
    }
    const retrievedAddress = await ShippingAddress.find({ userId: id });
    return response.status(201).json({
      message: "shipping addresses rerieved successfully",
      retrievedAddress,
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// address update controller
const updateAddress = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedAddress = request.body;
    if (!id || !updatedAddress) {
      return response.status(404).json({
        message: "address id, updatedAddress are required",
      });
    }

    await ShippingAddress.findByIdAndUpdate(
      id,
      { $set: updatedAddress },
      { new: true }
    );

    return response.status(200).json({
      message: "Shipping address updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Internal server error", error });
  }
};

// creating address delete controller
const deleteAddress = async (request, response) => {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(404).json({
        message: " addressId is required",
      });
    }
    await ShippingAddress.findByIdAndDelete(id);
    return response.status(200).json({
      message: "Shipping address deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Internal server error", error });
  }
};

module.exports = {
  saveAddressController,
  getAddress,
  updateAddress,
  deleteAddress,
};
