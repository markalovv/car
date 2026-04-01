from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from .database import Base


class Booking(Base):
    """Booking ORM Model"""
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    appointmentDate = Column(String, nullable=False)
    timeSlot = Column(String, nullable=False)
    carModel = Column(String, nullable=False)
    isInspectorRequired = Column(Boolean, default=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now())
