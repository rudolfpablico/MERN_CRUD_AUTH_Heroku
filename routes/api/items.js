const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create An Item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route EDIT api/items/:id
// @desc Edit An Item
// @access Public
router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  Item.findByIdAndUpdate({ _id: id }, { name: newData.name })
    .then((item) => res.status(200).json({ success: true }))
    .catch((err) => res.status(400).json({ success: false }));
});

// @route EDIT api/items/:id
// @desc Edit An Item
// @access Public
// router.put("/edit/:id", (req, res) => {
//   const id = req.params.id;
//   const newData = req.body;

//   Item.findByIdAndUpdate({ _id: id }, { name: newData.name }, (err, result) => {
//     if (err) {
//       return res.status(400).json({ success: false });
//     }
//     res.send(`Done update to ${result.name}`);
//   });
// });

module.exports = router;
