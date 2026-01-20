import jwt from "jsonwebtoken";

export function generateToken(userId, role) {
  const payload = { id: userId, role };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
