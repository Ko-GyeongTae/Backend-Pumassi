import jwt from 'jsonwebtoken';

export const createJWT = (
  payload: object,
  expiresIn: string,
  algorithm?: string,
): string => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn,
    },
    algorithm,
  );
  return token;
};
