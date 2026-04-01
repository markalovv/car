from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from schemas import BookingRequest, BookingResponse
from crud import create_booking, get_all_bookings, get_booking, update_booking, delete_booking
from database import get_db, init_db

app = FastAPI()

# Initialize database tables
init_db()

# ตั้งค่า CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check endpoint
@app.get("/")
async def root():
    return {"message": "Booking API is running"}

# CREATE - สร้างการจองใหม่
@app.post("/api/bookings", response_model=BookingResponse)
async def create_new_booking(booking: BookingRequest, db: Session = Depends(get_db)):
    return create_booking(booking, db)

# READ - ดึงการจองทั้งหมด
@app.get("/api/bookings")
async def get_all(db: Session = Depends(get_db)):
    return get_all_bookings(db)

# READ - ดึงการจองตามรหัส
@app.get("/api/bookings/{booking_id}")
async def get_by_id(booking_id: int, db: Session = Depends(get_db)):
    return get_booking(booking_id, db)

# UPDATE - อัปเดตการจองตามรหัส
@app.put("/api/bookings/{booking_id}")
async def update_by_id(booking_id: int, booking: BookingRequest, db: Session = Depends(get_db)):
    return update_booking(booking_id, booking, db)

# DELETE - ลบการจองตามรหัส
@app.delete("/api/bookings/{booking_id}")
async def delete_by_id(booking_id: int, db: Session = Depends(get_db)):
    return delete_booking(booking_id, db)
