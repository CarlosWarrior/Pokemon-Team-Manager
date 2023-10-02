class AppError extends Error {
  constructor({status, message, errors = null}) {
    super(message)
    this.statusCode = status
    if(errors)
      this.errors = errors
    Error.captureStackTrace(this, this.constructor);
  }
}


exports._catch = (fn) => {
  return (req, res, next) => {
    fn(req, res, next)
      .catch((e) => {
        const status = e.statusCode?e.statusCode:500
        console.log('\t', "Catched", status)
        if(e.message)
          return res.status(status).send({message:e.message, status:e.statusCode, errors:e.errors});
        else
          return res.sendStatus(status)
      })
  };
};

exports.raise = raise = c => {throw new AppError(c)};