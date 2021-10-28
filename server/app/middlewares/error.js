const ErrorHandler = (err, req, res, next) => {
  return res.json({
    error: {
      code: 1,
      message: err.message,
    },
  });
};

module.exports = ErrorHandler;