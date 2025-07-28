const productCategory = require("../model/ProductCategory");
const User = require("../model/User");

// creating product category controller
const saveProductCategory = async (request, response) => {
  try {
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
    const { productCategoryName, productImage, available } = request.body;
    if (!productCategoryName || !productImage || !available) {
      return response
        .status(404)
        .json({ message: "products category details are required" });
    }

    const saveProductsInDb = new productCategory({
      productCategoryName,
      productImage,
      available,
    });

    await saveProductsInDb.save();
    return response.status(201).json({
      message: "products details are saved successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get all category products controller
const getAllCategoryProducts = async (request, response) => {
  try {
    const retrievedProducts = await productCategory.find();
    return response.status(201).json({
      message: "category products retrievd successfully",
      retrievedProducts,
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update category controller
const updateCategoryProduct = async (request, response) => {
  try {
    const updateCategoryDetails = request.body;
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
    await productCategory.findByIdAndUpdate(
      request.params.id,
      { $set: updateCategoryDetails },
      { new: true }
    );
    return response.status(201).json({
      message: "category products updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// delete category products
const deleteCategory = async (request, response) => {
  try {
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
    await productCategory.findByIdAndDelete(request.params.id);
    return response.status(201).json({
      message: "category products deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = {
  saveProductCategory,
  getAllCategoryProducts,
  updateCategoryProduct,
  deleteCategory,
};
