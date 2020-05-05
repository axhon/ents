import { hash, Options } from 'argon2'

export async function createHashedPassword(
  password: string,
  hashingFn = hash,
  options: Options & { raw?: false } = { saltLength: 12 }
): Promise<string> {
  return hashingFn(password, options)
}
