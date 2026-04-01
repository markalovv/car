from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# ตั้งค่า CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# สร้าง Model สำหรับข้อมูลการจองคิว
class BookingRequest(BaseModel):
    fullName: str
    phone: str
    appointmentDate: str
    timeSlot: str
    carModel: str
    isInspectorRequired: bool

class BookingResponse(BaseModel):
    message: str
    bookingId: int
    data: BookingRequest

# เก็บข้อมูลชั่วคราว (ในการใช้งานจริงควรใช้ Database)
bookings_db = []
booking_counter = 1

# Health Check endpoint
@app.get("/")
async def root():
    return {"message": "Booking API is running"}

# API endpoint สำหรับรับข้อมูลการจอง
@app.post("/api/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingRequest):
    global booking_counter
    
    try:
        # บันทึกข้อมูลการจอง
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

# API endpoint สำหรับดึงข้อมูลการจองทั้งหมด
@app.get("/api/bookings")
async def get_bookings():
    return {
        "total": len(bookings_db),
        "bookings": bookings_db
    }

# API endpoint สำหรับดึงข้อมูลการจองตามรหัส
@app.get("/api/bookings/{booking_id}")
async def get_booking(booking_id: int):
    for booking in bookings_db:
        if booking["id"] == booking_id:
            return booking
    raise HTTPException(status_code=404, detail="Booking not found")
