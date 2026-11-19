import jwt from "jsonwebtoken";
export const JWT_SECRET =
  process.env.JWT_SECRET || "lead-evo-secret-jwt-key-2026";
export const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch {}
  }
  next();
};
