const AsyncFunction = (async () => {}).constructor;
function _catch(error, res){
  const status = error.statusCode?error.statusCode:500
  console.log('\t', "Catched", status)
  if(error.message)
    return res.status(status).send({message:error.message, status:error.statusCode, errors:error.errors});
  else
    return res.sendStatus(status)
}
exports._catch = (fn) => {
  return (req, res, next) => {
    if (fn instanceof AsyncFunction)    
      fn(req, res, next)
        .catch((error) => _catch(error, res))
      else
        try {
          fn(req, res, next)
        } catch (error) {
          _catch(error, res)
        }
  };
};

class AppError extends Error {
  constructor({status, message, errors = null}) {
    super(message)
    this.statusCode = status
    if(errors)
      this.errors = errors
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.raise = raise = error => {
  if( error instanceof AppError)
    throw error
  else
    throw new AppError(error)
};