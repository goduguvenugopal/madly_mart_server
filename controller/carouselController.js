const { cloudinary } = require("../config/cloudinary");
const Carousel = require("../model/Carousel");
const User = require("../model/User");

// creating Carousel  controller
const saveCarousel = async (request, response) => {
  try {
    const { offerTitle ,subTitle } = request.body;
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
    const prevCarousel = Carousel.find();
    if ((await prevCarousel).length === 1) {
      return response.status(401).json({
        message: "carousel already existed in db",
      });
    }

    // Extracting image info from uploaded files
    const carouselImage = request.files.map((file) => ({
      image: file.path || "",
      public_id: file.filename || "",
    }));

    const saveImages = new Carousel({
      offerTitle,
      subTitle,
      carouselImage,
    });
    await saveImages.save();
    return response.status(200).json({
      message: "carousel saved successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get carouse controller
const getCarousel = async (request, response) => {
  try {
    const retrievedCarousel = await Carousel.find();
    return response.status(200).json({
      message: "carousel retrieved successfully",
      retrievedCarousel,
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update carousel controller
const updateCarousel = async (req, res) => {
  try {
    const userId = req.userId;
    const { offerTitle ,subTitle, imagesToKeep = [] } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Only admin can update." });
    }

    const existingCarousel = await Carousel.findById(req.params.id);
    if (!existingCarousel) {
      return res.status(404).json({ error: "Carousel not found." });
    }

    const files = req.files;

    // Filter out images to delete
    const imagesToDelete = existingCarousel.carouselImage.filter(
      (img) => !imagesToKeep.includes(img.public_id)
    );

    // Delete from Cloudinary
    for (const img of imagesToDelete) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // Keep only the imagesToKeep in DB
    const filteredImages = existingCarousel.carouselImage.filter((img) =>
      imagesToKeep?.includes(img.public_id)
    );

    // Add new uploaded images
    const newImages = files.map((file) => ({
      image: file.path,
      public_id: file.filename,
    }));

    existingCarousel.offerTitle = offerTitle || existingCarousel.offerTitle;
    existingCarousel.offerTitle = subTitle || existingCarousel.subTitle;
    existingCarousel.carouselImage = imagesToKeep.length === 0 ? [...existingCarousel?.carouselImage , ...newImages]: [...filteredImages, ...newImages];

    await existingCarousel.save();

    return res.status(200).json({
      message: "Carousel updated successfully",
    });
  } catch (error) {
    console.error("Error updating carousel:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// carousel delete function
const deleteCarousel = async (request, response) => {
  try {
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response.status(403).json({ error: "Only admin can delete." });
    }

    // finding the single carousel document
    const existingCarousel = await Carousel.findById(request.params.id);
    if (!existingCarousel) {
      return response.status(404).json({ error: "Carousel not found." });
    }

    // deleting the images from Cloudinary
    for (let img of existingCarousel.carouselImage) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // deleting the carousel document
    await Carousel.deleteOne({ _id: existingCarousel._id });

    return response.status(200).json({
      message: "Carousel deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Internal server error", error });
  }
};

module.exports = { saveCarousel, getCarousel, updateCarousel, deleteCarousel };
