// errorHandler.js

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.error('Stack Trace:', error.stack); // Log stack trace for better debugging
  
  if (error.name === 'CastError') {
    console.error('Error Type: CastError');
    return response.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    console.error('Error Type: ValidationError');
    return response.status(400).json({ error: error.message });
  }
  
  console.error('Unknown Error Type:', error.name);
  next(error);
};

module.exports = errorHandler;
