const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  const responseObj = { error: err.message };
  if (err.data) {
    responseObj.data = err.data;
  }

  res.status(statusCode);
  res.json(responseObj);
};

module.exports = errorHandler;
