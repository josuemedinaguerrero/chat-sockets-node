import jwt from 'jsonwebtoken';

export const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const comprobarJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};
