const notFound = (req, res) => {
  res.status(404).send("no such url exists");
};

module.exports = notFound;
