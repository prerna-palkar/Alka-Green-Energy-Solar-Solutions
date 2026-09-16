import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "alka_solar_secret_key_default_2026")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "alka_solar_jwt_secret_key_default_2026")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    
    # Database Configuration
    raw_db_url = os.getenv("DATABASE_URL")
    db_type = os.getenv("DB_ENGINE", "sqlite").lower()
    
    if raw_db_url:
        SQLALCHEMY_DATABASE_URI = raw_db_url
    elif db_type == "mysql":
        DB_HOST = os.getenv("DATABASE_HOST", "localhost")
        DB_PORT = os.getenv("DATABASE_PORT", "3306")
        DB_NAME = os.getenv("DATABASE_NAME", "alka_solar_db")
        DB_USER = os.getenv("DATABASE_USER", "root")
        DB_PASSWORD = os.getenv("DATABASE_PASSWORD", "")
        SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    else:
        # Default SQLite URI for seamless out-of-the-box local development & testing
        base_dir = os.path.abspath(os.path.dirname(__file__))
        db_path = os.path.join(base_dir, "..", "alka_solar.db")
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{db_path}"
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
