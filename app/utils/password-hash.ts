import { hash, compare } from 'bcrypt';

/**
 * This is for the final password hash in the database for the current service.
 * @param password The password to be temporarily hashed
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashValue = await hash(password, saltRounds);
  return hashValue;
};

/**
 *
 * @param password
 * @param hash
 * @returns Bolean
 */
export const matchPasswordHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const match = await compare(password, hash);
  return match;
};
