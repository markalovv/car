from fastapi import HTTPException
from sqlalchemy.orm import Session
from schemas import BookingRequest, BookingResponse
from models import Booking


def create_booking(booking: BookingRequest, db: Session) -> BookingResponse:
    """สร้างการจองใหม่"""
    try:
        # Create new booking record
        db_booking = Booking(
            fullName=booking.fullName,
            phone=booking.phone,
            appointmentDate=booking.appointmentDate,
            timeSlot=booking.timeSlot,
            carModel=booking.carModel,
            isInspectorRequired=booking.isInspectorRequired
        )
        db.add(db_booking)
        db.commit()
        db.refresh(db_booking)
        
        return BookingResponse(
            message="Booking created successfully",
            bookingId=db_booking.id,
            data=booking
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


def get_all_bookings(db: Session):
    """ดึงการจองทั้งหมด"""
    bookings = db.query(Booking).all()
    return {
        "total": len(bookings),
        "bookings": bookings
    }


def get_booking(booking_id: int, db: Session):
    """ดึงการจองตามรหัส"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


def update_booking(booking_id: int, booking_data: BookingRequest, db: Session):
    """อัปเดตการจองตามรหัส"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    try:
        booking.fullName = booking_data.fullName
        booking.phone = booking_data.phone
        booking.appointmentDate = booking_data.appointmentDate
        booking.timeSlot = booking_data.timeSlot
        booking.carModel = booking_data.carModel
        booking.isInspectorRequired = booking_data.isInspectorRequired
        
        db.commit()
        db.refresh(booking)
        
        return {
            "message": "Booking updated successfully",
            "bookingId": booking_id,
            "data": booking_data
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


def delete_booking(booking_id: int, db: Session):
    """ลบการจองตามรหัส"""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    try:
        db.delete(booking)
        db.commit()
        return {"message": "Booking deleted successfully", "bookingId": booking_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
