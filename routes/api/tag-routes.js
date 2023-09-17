const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });

    // Return the tags in the response
    res.json(tags);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;

    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }]
    });

    if (!tag) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Return the tag in the response
    res.json(tag);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;

    const tag = await Tag.create({ tag_name });

    // Return the created tag in the response
    res.status(201).json(tag);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.id;
    const { tag_name } = req.body;

    
    const updatedTag = await Tag.update(
      { tag_name },
      { where: { id: tagId } }
    );

    if (updatedTag[0] === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Return a success message in the response
    res.json({ message: 'Tag updated' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;

  
    await Tag.destroy({ where: { id: tagId } });

    // Return a success message in the response
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
