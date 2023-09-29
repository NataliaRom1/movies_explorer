const BadRequestErrorMessage = 'Data is incorrect'; // 400
const UnauthorizedErrorMessage = 'Incorrect password or email'; // 401
const ForbiddenErrorMessage = 'You do not have access rights'; // 403
const NotFoundUserErrorMessage = 'User not found'; // 404
const NotFoundMovieErrorMessage = 'Movie not found'; // 404
const ConflictErrorUserMessage = 'User with this email already exists'; // 409
const InternalServerErrorMessage = 'Error has occurred on server'; // 500

module.exports = {
  BadRequestErrorMessage,
  UnauthorizedErrorMessage,
  ForbiddenErrorMessage,
  NotFoundUserErrorMessage,
  NotFoundMovieErrorMessage,
  ConflictErrorUserMessage,
  InternalServerErrorMessage,
};
