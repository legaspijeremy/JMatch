from database import engine
from models.user import User

User.metadata.create_all(bind=engine)

print("Tables created successfully!")