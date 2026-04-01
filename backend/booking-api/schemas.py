from pydantic import BaseModel


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
