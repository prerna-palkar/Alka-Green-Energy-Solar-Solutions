from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.domain import User
from schemas.domain import UserResponse, UserCreate

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("/", response_model=List[UserResponse])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Very basic user creation for Phase 2 without hashing
    db_user = User(email=user.email, full_name=user.full_name, password_hash=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
