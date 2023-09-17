const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories
    // Include associated Products
    const categories = await Category.findAll({
      include: [{model: Product}]
    });

    // Return the categories in the response
    res.json(categories);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find one category by its `id` value
    // Include associated Products
    const category = await Category.findByPk(categoryId, {
      include: [{model: Product}]
    });

    if (!category) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Return the category in the response
    res.json(category);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;

    // Create a new category
    const category = await Category.create({ category_name });

    // Return the created category in the response
    res.status(201).json(category);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { category_name } = req.body;

    // Update a category by its `id` value
    const updatedCategory = await Category.update(
      { category_name },
      { where: { id: categoryId } }
    );

    if (updatedCategory[0] === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Return a success message in the response
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Delete a category by its `id` value
    const deletedCategory = await Category.destroy({ where: { id: categoryId } });

    if (deletedCategory === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Return a success message in the response
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;