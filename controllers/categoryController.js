const Category = require('../model/category');

const createCategory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newCategory = new Category({ title, description });
        await newCategory.save();
        res.status(200).json({ "message": "Sccessfull add Category", newCategory });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const findCategory = await Category.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!findCategory) {
            return res.status(500).json({ "message": "Category not found" })
        }
        res.status(200).json({ "message": "Sccessfull Update" })

    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const findCategory = await Category.findByIdAndDelete(id);

        if (!findCategory) {
            return res.status(500).json({ "message": "Category not found" })
        }
        res.status(200).json({ "message": "Sccessfull Delete" })

    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json({category});
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

const getIdCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(500).json({'message': "Not found"});
        res.status(200).json({category});
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

module.exports = { createCategory, updateCategory, deleteCategory, getAllCategory, getIdCategory };