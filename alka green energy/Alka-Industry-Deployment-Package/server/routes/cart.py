from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.domain import CartItem
from schemas.domain import CartItemResponse, CartItemCreate

router = APIRouter(prefix="/api/cart", tags=["Cart"])

@router.get("/{user_id}", response_model=List[CartItemResponse])
def get_cart_items(user_id: int, db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
    return cart_items

@router.post("/{user_id}", response_model=CartItemResponse)
def add_to_cart(user_id: int, item: CartItemCreate, db: Session = Depends(get_db)):
    db_item = CartItem(user_id=user_id, product_id=item.product_id, quantity=item.quantity)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
