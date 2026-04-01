from sqlalchemy.orm import Session
from . import models, schemas


def create_booking(db: Session, booking: schemas.BookingCreate) -> models.Booking:
    """Create a new booking"""
    db_booking = models.Booking(
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
    return db_booking


def get_booking(db: Session, booking_id: int) -> models.Booking:
    """Get a booking by ID"""
    return db.query(models.Booking).filter(models.Booking.id == booking_id).first()


def get_all_bookings(db: Session, skip: int = 0, limit: int = 100):
    """Get all bookings with pagination"""
    return db.query(models.Booking).offset(skip).limit(limit).all()


def update_booking(
    db: Session, 
    booking_id: int, 
    booking_update: schemas.BookingUpdate
) -> models.Booking:
    """Update a booking"""
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if db_booking:
        update_data = booking_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_booking, field, value)
        db.add(db_booking)
        db.commit()
        db.refresh(db_booking)
    return db_booking


def delete_booking(db: Session, booking_id: int) -> bool:
    """Delete a booking"""
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if db_booking:
        db.delete(db_booking)
        db.commit()
        return True
    return False
