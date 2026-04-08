'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '../../../Component/admin/ReusableForm';
import { apiService, CreateBookingRequest } from '../../../Component/admin/apiService';

export default function NewBookingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fields = [
    {
      name: 'fullName',
      label: 'ชื่อ-นามสกุล',
      type: 'text' as const,
      required: true,
      placeholder: 'กรุณาป้อนชื่อ-นามสกุล',
      validation: (value: string) => {
        if (value.length < 2) return 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
        return null;
      },
    },
    {
      name: 'phone',
      label: 'เบอร์โทรศัพท์',
      type: 'tel' as const,
      required: true,
      placeholder: 'กรุณาป้อนเบอร์โทรศัพท์',
      validation: (value: string) => {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) return 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก';
        return null;
      },
    },
    {
      name: 'appointmentDate',
      label: 'วันที่นัดหมาย',
      type: 'date' as const,
      required: true,
      validation: (value: string) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'วันที่นัดหมายต้องเป็นวันปัจจุบันหรือวันข้างหน้า';
        return null;
      },
    },
    {
      name: 'timeSlot',
      label: 'ช่วงเวลา',
      type: 'select' as const,
      required: true,
      options: [
        { value: '09:00-10:00', label: '09:00-10:00' },
        { value: '10:00-11:00', label: '10:00-11:00' },
        { value: '11:00-12:00', label: '11:00-12:00' },
        { value: '13:00-14:00', label: '13:00-14:00' },
        { value: '14:00-15:00', label: '14:00-15:00' },
        { value: '15:00-16:00', label: '15:00-16:00' },
        { value: '16:00-17:00', label: '16:00-17:00' },
      ],
    },
    {
      name: 'carModel',
      label: 'รุ่นรถยนต์',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'Civic 1.8 EL', label: 'Civic 1.8 EL' },
        { value: 'Civic e:HEV EL', label: 'Civic e:HEV EL' },
        { value: 'Civic Type R', label: 'Civic Type R' },
        { value: 'Civic Hatchback', label: 'Civic Hatchback' },
        { value: 'อื่นๆ', label: 'อื่นๆ' },
      ],
    },
    {
      name: 'isInspectorRequired',
      label: 'ต้องการช่างตรวจสภาพรถ',
      type: 'checkbox' as const,
      required: false,
    },
  ];

  const handleSubmit = async (data: CreateBookingRequest) => {
    try {
      setLoading(true);
      await apiService.createBooking(data);
      router.push('/admin/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('เกิดข้อผิดพลาดในการสร้างการจอง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/bookings');
  };

  return (
    <div className="min-h-screen bg-[#091413] pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Orbitron']">
            เพิ่มการจองใหม่
          </h1>
          <p className="text-[#B0E4CC]">
            กรอกข้อมูลเพื่อสร้างการจองรถยนต์ใหม่
          </p>
        </div>

        {/* Form */}
        <ReusableForm
          fields={fields}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="สร้างการจอง"
          cancelButtonText="ยกเลิก"
          loading={loading}
        />
      </div>
    </div>
  );
}