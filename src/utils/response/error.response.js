export const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      error.cause = 500;
      return next(error);
    });
  };
};

export const globalErrorHandler= (error, req, res, next) => {
    if(process.env.MOOD === 'DEV'){
        return res.status(error.cause ||400).json({massage:error.message,error,stack:error.stack})
    }
    return res.status(error.cause ||400).json({massage:error.message,error})

}
