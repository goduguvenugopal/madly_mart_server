const Product = require("../model/Product");
const User = require("../model/User");

//  save product details controller
const saveProductController = async (request, response) => {
  try {
    // user can only add products
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "this is restricted : admin only " });
    }
    const files = request.files;
    const {
      itemName,
      itemDescription,
      itemCost,
      itemKgCost,
      itemHalfKgCost,
      itemQty,
      minOrderQty,
      itemWeight,
      itemStock,
      itemSubCategory,
      itemCategory,
      offerCost,
      productTags,
      offerMessage,
    } = request.body;

    if (
      !itemName ||
      !itemCost ||
      !files ||
      !itemCategory ||
      !itemStock ||
      !productTags ||
      !itemSubCategory
    ) {
      return response
        .status(404)
        .json({ message: "products details are required" });
    }

    
    const itemImage = files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    
    // creating object to save in database
    const saveProducts = new Product({
      itemName,
      itemDescription,
      itemCost,
      itemKgCost,
      itemHalfKgCost,
      itemImage,
      itemQty,
      itemSubCategory,
      minOrderQty,
      itemWeight,
      itemStock,
      itemCategory,
      offerCost,
      offerMessage,
      productTags,
    });
    await saveProducts.save();

    return response
      .status(201)
      .json({ message: "products saved successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get products controller
const getAllProducts = async (request, response) => {
  try {
    const retrievdProducts = await Product.find();
    return response
      .status(200)
      .json({ message: "all products fetched successfully", retrievdProducts });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get single product by id controller
const getSingleProduct = async (request, response) => {
  try {
    const retrievedSingleProduct = await Product.findById(request.params.id);
    return response.status(200).json({
      message: "single product fetched successfully",
      retrievedSingleProduct,
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update product details
const updateProductDetails = async (request, response) => {
  try {
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "this is restricted : admin only " });
    }
    const productData = request.body;

    const { id } = request.params;
    await Product.findByIdAndUpdate(id, { $set: productData }, { new: true });
    return response
      .status(200)
      .json({ message: "products updated successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// delete product controller
const deleteProduct = async (request, response) => {
  try {
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "this is restricted : admin only " });
    }
    await Product.findByIdAndDelete(request.params.id);
    return response
      .status(200)
      .json({ message: "product deleted successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = {
  saveProductController,
  getAllProducts,
  updateProductDetails,
  deleteProduct,
  getSingleProduct,
};
