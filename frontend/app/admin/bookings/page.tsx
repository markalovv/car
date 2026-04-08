'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../../Component/admin/DataTable';
import { apiService, Booking } from '../../Component/admin/apiService';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const columns = [
    {
      key: 'id' as keyof Booking,
      header: 'ID',
      sortable: true,
    },
    {
      key: 'fullName' as keyof Booking,
      header: 'ชื่อ-นามสกุล',
      sortable: true,
    },
    {
      key: 'phone' as keyof Booking,
      header: 'เบอร์โทร',
      sortable: false,
    },
    {
      key: 'appointmentDate' as keyof Booking,
      header: 'วันที่นัด',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('th-TH'),
    },
    {
      key: 'timeSlot' as keyof Booking,
      header: 'ช่วงเวลา',
      sortable: false,
    },
    {
      key: 'carModel' as keyof Booking,
      header: 'รุ่นรถ',
      sortable: true,
    },
    {
      key: 'isInspectorRequired' as keyof Booking,
      header: 'ต้องการช่างตรวจ',
      sortable: false,
      render: (value: boolean) => value ? 'ใช่' : 'ไม่',
    },
    {
      key: 'createdAt' as keyof Booking,
      header: 'วันที่สร้าง',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('th-TH'),
    },
  ];

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลการจองได้');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = (booking: Booking) => {
    router.push(`/admin/bookings/${booking.id}/edit`);
  };

  const handleDelete = async (booking: Booking) => {
    if (window.confirm(`คุณต้องการลบการจองของ ${booking.fullName} ใช่หรือไม่?`)) {
      try {
        await apiService.deleteBooking(booking.id);
        setBookings(prev => prev.filter(b => b.id !== booking.id));
      } catch (err) {
        alert('ไม่สามารถลบการจองได้');
        console.error('Error deleting booking:', err);
      }
    }
  };

  const handleAdd = () => {
    router.push('/admin/bookings/new');
  };

  return (
    <div className="min-h-screen bg-[#091413] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Orbitron']">
            Admin Dashboard - จัดการการจอง
          </h1>
          <p className="text-[#B0E4CC]">
            จัดการข้อมูลการจองรถยนต์ทั้งหมดในระบบ
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Data Table */}
        <DataTable
          data={bookings}
          columns={columns}
          searchPlaceholder="ค้นหาการจอง..."
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          addButtonText="เพิ่มการจองใหม่"
          loading={loading}
        />

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-[#285A48] text-[#B0E4CC] px-6 py-3 rounded-lg hover:bg-[#408A71] transition-colors"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}