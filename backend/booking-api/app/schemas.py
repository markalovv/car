from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class BookingBase(BaseModel):
    """Base booking schema"""
    fullName: str = Field(..., min_length=1, description="Full name of the customer")
    phone: str = Field(..., min_length=10, description="Phone number")
    appointmentDate: str = Field(..., description="Appointment date (YYYY-MM-DD)")
    timeSlot: str = Field(..., description="Time slot for appointment")
    carModel: str = Field(..., description="Car model selected")
    isInspectorRequired: bool = Field(default=False, description="Whether inspector is required")


class BookingCreate(BookingBase):
    """Schema for creating booking"""
    pass


class BookingUpdate(BaseModel):
    """Schema for updating booking"""
    fullName: Optional[str] = None
    phone: Optional[str] = None
    appointmentDate: Optional[str] = None
    timeSlot: Optional[str] = None
    carModel: Optional[str] = None
    isInspectorRequired: Optional[bool] = None


class BookingResponse(BookingBase):
    """Schema for booking response"""
    id: int
    createdAt: datetime

    class Config:
        from_attributes = True
