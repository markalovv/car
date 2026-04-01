from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, get_db

# Create all database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Booking API",
    description="Car Booking API for K.C.S.P. Autoshop",
    version="1.0.0"
)

# Add CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "Booking API is running"}


# **[CN334-W10-A3HandsOn-07] Create and Test HTTP POST**
@app.post("/api/bookings", response_model=schemas.BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking: schemas.BookingCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new booking
    
    ### Data Model:
    - **fullName**: Full name of the customer (required)
    - **phone**: Phone number (required)
    - **appointmentDate**: Date of appointment in YYYY-MM-DD format (required)
    - **timeSlot**: Time slot for appointment (required)
    - **carModel**: Car model selected (required)
    - **isInspectorRequired**: Whether inspector is required for inspection (optional, default: false)
    
    Returns the created booking with ID and timestamp
    """
    try:
        db_booking = crud.create_booking(db=db, booking=booking)
        return db_booking
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating booking: {str(e)}"
        )


# **[CN334-W10-A3HandsOn-14] CRUD Operations (Read Data)**
@app.get("/api/bookings/{booking_id}", response_model=schemas.BookingResponse)
async def read_booking(booking_id: int, db: Session = Depends(get_db)):
    """
    Get a specific booking by ID
    """
    db_booking = crud.get_booking(db=db, booking_id=booking_id)
    if db_booking is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID {booking_id} not found"
        )
    return db_booking


@app.get("/api/bookings", response_model=list[schemas.BookingResponse])
async def read_all_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get all bookings with pagination
    """
    bookings = crud.get_all_bookings(db=db, skip=skip, limit=limit)
    return bookings


# **[CN334-W10-A3HandsOn-12] CRUD Operations (Update)**
@app.put("/api/bookings/{booking_id}", response_model=schemas.BookingResponse)
async def update_booking(
    booking_id: int,
    booking: schemas.BookingUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a booking
    """
    db_booking = crud.update_booking(db=db, booking_id=booking_id, booking_update=booking)
    if db_booking is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID {booking_id} not found"
        )
    return db_booking


@app.delete("/api/bookings/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    """
    Delete a booking
    """
    success = crud.delete_booking(db=db, booking_id=booking_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID {booking_id} not found"
        )
    return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3340)
