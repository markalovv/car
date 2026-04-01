# การเชื่อม Booking API กับ Frontend

## ✅ Backend Setup (FastAPI Booking API)

### โครงสร้างไฟล์ที่สร้างแล้ว:
```
backend/booking-api/
├── app/
│   ├── __init__.py              # Package initialization
│   ├── main.py                  # FastAPI application & routes
│   ├── database.py              # Database configuration & SQLAlchemy setup
│   ├── models.py                # ORM Models using SQLAlchemy
│   ├── schemas.py               # Pydantic schemas for data validation
│   └── crud.py                  # CRUD operations for bookings
├── requirements.txt             # Python dependencies
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose orchestration
└── bookings.db                  # SQLite database (auto-created)
```

## 📋 API Endpoints

### 1. Create Booking (POST)
```bash
POST /api/bookings
Content-Type: application/json

{
  "fullName": "สมชาย ทดสอบ",
  "phone": "0812345678",
  "appointmentDate": "2026-04-15",
  "timeSlot": "09:00 - 12:00",
  "carModel": "Civic 1.8 EL",
  "isInspectorRequired": true
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "fullName": "สมชาย ทดสอบ",
  "phone": "0812345678",
  "appointmentDate": "2026-04-15",
  "timeSlot": "09:00 - 12:00",
  "carModel": "Civic 1.8 EL",
  "isInspectorRequired": true,
  "createdAt": "2026-04-01T10:30:00",
  "updatedAt": null
}
```

### 2. Get All Bookings (GET)
```bash
GET /api/bookings?skip=0&limit=100
```

### 3. Get Booking by ID (GET)
```bash
GET /api/bookings/{id}
```

### 4. Update Booking (PUT)
```bash
PUT /api/bookings/{id}
Content-Type: application/json
```

### 5. Delete Booking (DELETE)
```bash
DELETE /api/bookings/{id}
```

### 6. Health Check (GET)
```bash
GET /health
```

## 🚀 วิธีรัน

### Option 1: Using Docker Compose (Recommended)
```bash
cd backend/booking-api
docker-compose up --build
```
API จะเชื่อมต่อที่ `http://localhost:3340`

### Option 2: Manual Python Setup
```bash
cd backend/booking-api
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 3340 --reload
```

### Option 3: Frontend Development (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend จะเชื่อมต่อที่ `http://localhost:3000`

## 🔗 Frontend Integration

Frontend check01 (/autoCheck/check01) ได้เชื่อมต่อกับ API แล้ว:

1. **Form Submission**: ส่ง POST request ไปที่ `http://localhost:3340/api/bookings`
2. **Data Structure**: ข้อมูลตรงกับ BookingCreate schema
3. **Response Handling**: 
   - Success (201): แสดง bookingId และเปลี่ยนไปหน้า check02
   - Error: แสดง error message ให้ผู้ใช้ทราบ

## 📚 หมวดหมู่งาน (CN334-W10-A3HandsOn)

- ✅ [01] Environment Setup with Docker
- ✅ [02] Create Dockerfile
- ✅ [03] Create docker-compose.yml
- ✅ [04] Preparing Project Requirements
- ✅ [05] Create Simple FastAPI HTML Page (API endpoints)
- ✅ [06] Run FastAPI Docker
- ✅ [07] Create and Test HTTP POST
- ✅ [08] Data Model ด้วย Pydantic (schemas.py)
- ✅ [09] การเชื่อมต่อกับ NextJS Frontend (check01 connected)
- ✅ [10] Database Configuration & SQLAlchemy Setup
- ✅ [11] Create ORM Models for Database Schema
- ✅ [12] CRUD Operations (Create & Update Data)
- ✅ [13] Dependency Injection & Router (FastAPI dependencies)
- ✅ [14] CRUD Operations (Read Data)

## 🧪 Testing

### Using curl:
```bash
# Create booking
curl -X POST http://localhost:3340/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "สมชาย ทดสอบ",
    "phone": "0812345678",
    "appointmentDate": "2026-04-15",
    "timeSlot": "09:00 - 12:00",
    "carModel": "Civic 1.8 EL",
    "isInspectorRequired": true
  }'

# Get all bookings
curl http://localhost:3340/api/bookings

# Get booking by ID
curl http://localhost:3340/api/bookings/1

# Health check
curl http://localhost:3340/health
```

### Using Postman:
1. Import collection หรือ สร้าง HTTP request
2. Set method: POST, URL: `http://localhost:3340/api/bookings`
3. Set header: `Content-Type: application/json`
4. Set body: JSON ตามตัวอย่างข้างบน

## 🛠️ Troubleshooting

### Port 3340 already in use
```bash
# Kill process on Windows
netstat -ano | findstr :3340
taskkill /PID <PID> /F

# Or use different port
docker-compose modify docker-compose.yml
```

### CORS Error
- Backend ได้ enable CORS สำหรับ all origins
- ถ้ายังมีปัญหา ให้ตรวจสอบ headers ใน frontend

### Database Error
- SQLite database จะ auto-create ที่ `backend/booking-api/bookings.db`
- ถ้า error ให้ลบไฟล์และ restart

## 📝 Notes

- Database ใช้ SQLite เปลี่ยนเป็น PostgreSQL ได้ถ้าต้องการ production setup
- CORS ใหญ่เปิดให้ all origins สำหรับ development เท่านั้น
- Frontend form ที่ check01 ถูกอัปเดตให้ส่ง request ไปที่ API ถูกต้อง
