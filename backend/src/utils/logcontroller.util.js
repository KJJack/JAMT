export function logControllername(cb) {
  return (req, res, next) => {
    req.controllerName = cb.name;
    next();
  };
}
