from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.domain import Order
from schemas.domain import OrderResponse, OrderCreate

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.get("/{user_id}", response_model=List[OrderResponse])
def get_orders(user_id: int, db: Session = Depends(get_db)):
    orders = db.query(Order).filter(Order.user_id == user_id).all()
    return orders

@router.post("/{user_id}", response_model=OrderResponse)
def create_order(user_id: int, order: OrderCreate, db: Session = Depends(get_db)):
    db_order = Order(user_id=user_id, total_amount=order.total_amount, status=order.status)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order
