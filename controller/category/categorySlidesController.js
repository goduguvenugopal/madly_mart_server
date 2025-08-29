const CategorySlide = require("../../model/category/categorySlides");
const User = require("../../model/User");

// add category slides
const addCategorySlides = async (req, res) => {
  try {
    const { categorySlides } = req.body;
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response.status(403).json({ error: "only admin have permission" });
    }

    // checking if document is existed
    const isExist = await CategorySlide.find();
    if (isExist) {
      return res.status(400).json({ message: "already slides existed" });
    }

    const newCategorySlides = new CategorySlide({
      categorySlides,
    });
    await newCategorySlides.save();
    return res
      .status(201)
      .json({ message: "add category slides successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get category slides
const getCategorySlides = async (req, res) => {
  try {
    const categorySlides = await CategorySlide.findOne();
    return res
      .status(200)
      .json({ message: "category slides fetched sucessfully", categorySlides });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update slides controller
const updateCategorySlides = async (req, res) => {
  try {
    const { updatedSlides } = req.body;
    const id = req.params.id;
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response.status(403).json({ error: "only admin have permission" });
    }

    await CategorySlide.findByIdAndUpdate(
      id,
      { $set: updatedSlides },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "updated category slides successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = { addCategorySlides, getCategorySlides, updateCategorySlides };
