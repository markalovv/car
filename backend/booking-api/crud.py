from fastapi import HTTPException
from schemas import BookingRequest, BookingResponse

# เก็บข้อมูลชั่วคราว (ในการใช้งานจริงควรใช้ Database)
bookings_db = []
booking_counter = 1


def create_booking(booking: BookingRequest) -> BookingResponse:
    """สร้างการจองใหม่"""
    global booking_counter
    
    try:
        booking_id = booking_counter
        booking_counter += 1
        
        bookings_db.append({
            "id": booking_id,
            "data": booking.dict()
        })
        
        return BookingResponse(
            message="Booking created successfully",
            bookingId=booking_id,
            data=booking
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def get_all_bookings():
    """ดึงการจองทั้งหมด"""
    return {
        "total": len(bookings_db),
        "bookings": bookings_db
    }


def get_booking(booking_id: int):
    """ดึงการจองตามรหัส"""
    for booking in bookings_db:
        if booking["id"] == booking_id:
            return booking
    raise HTTPException(status_code=404, detail="Booking not found")


def update_booking(booking_id: int, booking_data: BookingRequest):
    """อัปเดตการจองตามรหัส"""
    for booking in bookings_db:
        if booking["id"] == booking_id:
            booking["data"] = booking_data.dict()
            return {
                "message": "Booking updated successfully",
                "bookingId": booking_id,
                "data": booking_data
            }
    raise HTTPException(status_code=404, detail="Booking not found")


def delete_booking(booking_id: int):
    """ลบการจองตามรหัส"""
    global bookings_db
    for i, booking in enumerate(bookings_db):
        if booking["id"] == booking_id:
            bookings_db.pop(i)
            return {"message": "Booking deleted successfully", "bookingId": booking_id}
    raise HTTPException(status_code=404, detail="Booking not found")
