from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base


class Booking(Base):
    """Booking ORM Model"""
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    appointmentDate = Column(String(50), nullable=False)
    timeSlot = Column(String(50), nullable=False)
    carModel = Column(String(255), nullable=False)
    isInspectorRequired = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    class Config:
        from_attributes = True
