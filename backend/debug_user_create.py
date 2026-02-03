from src.models import UserCreate

data = {"email": "test@example.com", "name": "Test", "password": "password123"}
user_in = UserCreate(**data)
print(f"UserIn: {user_in}")
print(f"Password: {user_in.password}")
print(f"Model Fields: {user_in.model_fields.keys()}")
