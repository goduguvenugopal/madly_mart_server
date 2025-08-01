const Product = require("../model/Product");
const User = require("../model/User");
const { cloudinary } = require("../config/cloudinary");

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
      !itemCategory ||
      !itemStock ||
      !itemSubCategory ||
      productTags.length === 0
    ) {
      return response
        .status(400)
        .json({ message: "products details are required" });
    }
    const files = request.files;

    const itemImage = files?.map((file) => ({
      image: file?.path,
      public_id: file?.filename,
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

// updating product
const updateProductDetails = async (request, response) => {
  try {
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "this is restricted : admin only " });
    }

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
      toKeepImages = [],
    } = request.body;

    const { id } = request.params;
    const files = request.files;
    const existedProductData = await Product.findById(id);

    // Filter images to delete
    const filteredImages = existedProductData?.itemImage?.filter(
      (img) => !toKeepImages.includes(img.public_id)
    );

    // Delete filtered images from Cloudinary
    for (const img of filteredImages) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // Filter images to keep
    const existedImages = existedProductData.itemImage.filter((img) =>
      toKeepImages.includes(img.public_id)
    );

    // New uploaded images
    const newImages =
      files?.map((file) => ({
        image: file?.path,
        public_id: file?.filename,
      })) || [];

    const updatedImages =
      toKeepImages.length === 0
        ? [...existedProductData?.itemImage, ...newImages]
        : [...existedImages, ...newImages];

    // Update product
    await Product.findByIdAndUpdate(
      id,
      {
        $set: {
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
          itemImage: updatedImages,
        },
      },
      { new: true }
    );

    return response
      .status(200)
      .json({ message: "product updated successfully" });
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
    const id = request.params.id;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "this is restricted : admin only " });
    }

    const existedProduct = await Product.findById(id);
    // checking if products exists
    if (!existedProduct) {
      return response.status(404).json({ error: "product not found" });
    }

    // deleting images in cloudinary by public id
    for (const img of existedProduct.itemImage) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // deleting product by id
    await Product.findByIdAndDelete(existedProduct._id);

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
