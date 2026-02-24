const clothingItem = require("../models/clothingitem");

const createItem = (req, res) => {

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from creating item", e });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getting items", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from updating item", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: "Error from deleteing item", e });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .then((item) => (
  item
    ? res.send(item)
    : res.status(404).send({ message: "Item not found" })
))
  .catch((e) => res.status(500).send({ message: "Error liking item", e }));
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
  .then((item) => (
  item
    ? res.send(item)
    : res.status(404).send({ message: "Item not found" })
))
  .catch((e) => res.status(500).send({ message: "Error disliking item", e }));
};


module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
