import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (errors, _req, res, next) => {
  console.log("ERRORS", errors.message);
  if (Array.isArray(errors)) {
    const error = errors.map((err) => err.message);
    res.send(error);
    next(errors);
  }
  if (errors.name === "ValidationError") {
    res.status(404).json({ msg: "GRESKA" });
  }

  return res.status(400).json({ message: errors.message });
};

export default { errorHandler };
