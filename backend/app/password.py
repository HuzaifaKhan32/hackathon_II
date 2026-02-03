import bcrypt

# Maximum length for bcrypt passwords is 72 bytes
BCRYPT_MAX_BYTES = 72

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Ensure plain_password is bytes and truncated to max allowed by bcrypt
    plain_password_bytes = plain_password[:BCRYPT_MAX_BYTES].encode('utf-8')
    # bcrypt.checkpw expects hashed_password to be bytes
    return bcrypt.checkpw(plain_password_bytes, hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    # Ensure password is bytes and truncated to max allowed by bcrypt
    password_bytes = password[:BCRYPT_MAX_BYTES].encode('utf-8')
    # Generate salt and hash
    salt = bcrypt.gensalt()
    hashed_password_bytes = bcrypt.hashpw(password_bytes, salt)
    return hashed_password_bytes.decode('utf-8')