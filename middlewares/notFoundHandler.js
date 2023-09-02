const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'This page does not exist' });
};

module.exports = notFoundHandler;
