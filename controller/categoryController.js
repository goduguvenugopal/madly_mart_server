const productCategory = require("../model/ProductCategory");
const User = require("../model/User");
const Product = require("../model/Product");
const { cloudinary } = require("../config/cloudinary");

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
    const { productCategoryName, available } = request.body;
    const file = request.file;

    if (!productCategoryName || !available) {
      return response
        .status(400)
        .json({ message: "category details are required" });
    }

    const productImage = {
      image: file?.path,
      public_id: file?.filename,
    };

    const saveProductsInDb = new productCategory({
      productCategoryName,
      productImage,
      available,
    });

    await saveProductsInDb.save();
    return response.status(201).json({
      message: "New category added successfully",
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
    return response.status(200).json({
      message: "all categories retrievd successfully",
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
    const { available } = request.body;
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
    await productCategory.findByIdAndUpdate(
      request.params.id,
      { $set: { available: available } },
      { new: true }
    );
    const categoryItem = await productCategory.findById(request.params.id);
    // Find all products that belong to this category
    const categoryProducts = await Product.find({
      itemCategory: categoryItem.productCategoryName,
    });

    // Update stock to 0 and save all
    if (available === "no") {
      await Promise.all(
        categoryProducts.map(async (item) => {
          item.itemStock = "0";
          await item.save();
        })
      );
    } else {
      await Promise.all(
        categoryProducts.map(async (item) => {
          item.itemStock = "10";
          await item.save();
        })
      );
    }
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

// deleting the category
const deleteCategory = async (request, response) => {
  try {
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can delete category" });
    }

    // Find category from productCategory collection
    const categoryItem = await productCategory.findById(request.params.id);
    if (!categoryItem) {
      return response.status(404).json({ message: "Category not found" });
    }

    // Find all products that belong to this category
    const categoryProducts = await Product.find({
      itemCategory: categoryItem.productCategoryName,
    });

    // Update stock to 0 and save all
    await Promise.all(
      categoryProducts.map(async (item) => {
        item.itemStock = "0";
        await item.save();
      })
    );

    // Delete image from Cloudinary
    if (categoryItem?.productImage?.public_id) {
      await cloudinary.uploader.destroy(categoryItem.productImage.public_id);
    }

    // Delete the category
    await productCategory.findByIdAndDelete(categoryItem._id);

    return response.status(200).json({
      message:
        "Category and related product stocks updated & deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Internal server error", error });
  }
};

module.exports = {
  saveProductCategory,
  getAllCategoryProducts,
  updateCategoryProduct,
  deleteCategory,
};
