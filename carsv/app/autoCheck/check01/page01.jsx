"use client"

import React, { useState } from 'react';

export default function BookingStep2() {
  const [isInspectorOn, setIsInspectorOn] = useState(false);

  return (
    <main className="min-h-screen bg-[#020D0B] text-white font-sans">
      
      {/* Navigation Header */}
      <nav className="flex justify-between items-center px-12 py-6 border-b border-white/5">
        <div className="text-[#B0E4CC] font-bold text-xl tracking-wider uppercase">
          K.C.S.P. <span className="text-white">Autoshop</span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors uppercase">Home</a>
          <a href="#" className="hover:text-white transition-colors uppercase border-b-2 border-[#408A71] text-white">Car</a>
          <a href="#" className="bg-[#1A302A] text-[#B0E4CC] px-6 py-2 rounded-full border border-[#285A48]">Service</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto pt-12 pb-20 px-6">
        
        {/* Progress Stepper & Title */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="bg-[#1A302A] text-[#B0E4CC] px-4 py-1.5 rounded-full text-xs font-bold italic border border-[#285A48]">
              Step 2 : Booking Request
            </span>
            <h1 className="text-4xl font-bold mt-4">นัดหมายทดลองขับ</h1>
            <p className="text-gray-500 mt-2">กรอกข้อมูลเพื่อยืนยันการนัดหมายที่ศูนย์บริการ</p>
          </div>
          
          {/* Stepper Design */}
          <div className="flex items-center gap-4 bg-[#0A1A17] p-4 rounded-3xl border border-white/5">
            <span className="w-8 h-8 rounded-full border border-[#285A48] flex items-center justify-center text-xs text-gray-500">1</span>
            <div className="w-8 h-[1px] bg-[#285A48]"></div>
            <span className="w-10 h-10 rounded-full bg-[#408A71] text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-[#408A71]/20">2</span>
            <div className="w-8 h-[1px] bg-[#285A48]"></div>
            <span className="w-8 h-8 rounded-full border border-[#285A48] flex items-center justify-center text-xs text-gray-500">3</span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Car Preview Card */}
            <div className="bg-[#0A1A17] rounded-[32px] overflow-hidden border border-white/5 shadow-xl">
              <div className="h-48 bg-[#E2E4E9] flex items-center justify-center">
                <p className="text-gray-400 font-bold text-sm uppercase">รูปตัวอย่างรถ</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#408A71] text-[11px] font-bold mb-2 uppercase">
                   <span className="w-4 h-4 bg-[#408A71] text-white rounded-full flex items-center justify-center text-[10px]">✓</span>
                   คันที่เลือก
                </div>
                <h3 className="text-2xl font-bold">Civic 1.8 EL</h3>
                <p className="text-gray-500 text-sm mt-1">สีขาวมุก · วิ่ง 45,000 กม · คะแนน 92/100</p>
                <p className="text-2xl font-black mt-4 text-[#B0E4CC]">549,000 บาท</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#1A302A]/30 rounded-[32px] p-6 border border-[#285A48]/30">
              <div className="flex gap-4">
                <div className="bg-[#1A302A] p-3 rounded-2xl h-fit border border-[#285A48] text-xl">
                  📍
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-bold text-[#408A71] uppercase tracking-widest">สถานที่ทดลองขับ</p>
                    <a href="#" className="text-[10px] text-[#B0E4CC] underline font-bold">Google Maps</a>
                  </div>
                  <p className="font-bold text-lg mt-1">ยนตรกิจ เชียงใหม่ (สาขา นิมมาน)</p>
                  <p className="text-xs text-gray-400 leading-relaxed mt-2">
                    123 ถ.นิมมานเหมินท์ ซ.1 ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200
                  </p>
                  
                  <div className="flex gap-2 mt-4">
                    <div className="bg-[#020D0B] border border-[#285A48] rounded-full px-4 py-1.5 text-[10px] font-bold text-[#B0E4CC]">
                      ⏰ 09:00 - 18:00
                    </div>
                    <div className="bg-[#020D0B] border border-[#285A48] rounded-full px-4 py-1.5 text-[10px] font-bold text-[#B0E4CC]">
                      📞 091-123-1234
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0A1A17] rounded-[40px] p-10 border border-white/5 shadow-2xl">
            <h2 className="text-sm font-bold text-[#408A71] uppercase tracking-widest border-b border-[#285A48] pb-4 mb-8">ข้อมูลผู้จอง</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">ชื่อ - นามสกุล</label>
                  <div className="relative">
                    <span className="absolute left-5 top-3.5 text-gray-500">👤</span>
                    <input 
                      type="text" 
                      defaultValue="สมชาย"
                      className="w-full bg-[#020D0B] border border-[#285A48] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:border-[#408A71] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">เบอร์โทรศัพท์</label>
                  <div className="relative">
                    <span className="absolute left-5 top-3.5 text-gray-500">📞</span>
                    <input 
                      type="text" 
                      defaultValue="096-000-0000"
                      className="w-full bg-[#020D0B] border border-[#285A48] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:border-[#408A71] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">วันที่นัดหมาย</label>
                  <div className="relative">
                    <span className="absolute left-5 top-3.5 text-gray-500">📅</span>
                    <input 
                      type="text" 
                      defaultValue="08 / 08 / 2026"
                      className="w-full bg-[#020D0B] border border-[#285A48] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:border-[#408A71] outline-none transition-all text-center"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">ช่วงเวลา</label>
                  <div className="relative">
                    <span className="absolute left-5 top-3.5 text-gray-500">⏰</span>
                    <input 
                      type="text" 
                      defaultValue="09:00 - 12:00"
                      className="w-full bg-[#020D0B] border border-[#285A48] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:border-[#408A71] outline-none transition-all text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Extra Inspector Toggle */}
              <div className="bg-[#1A302A]/20 rounded-[24px] p-6 flex items-center justify-between border border-[#285A48]/30 mt-8">
                <div className="flex gap-4 items-center">
                  <div className={`p-3 rounded-full border transition-colors ${isInspectorOn ? 'bg-[#408A71]/20 border-[#408A71] text-[#B0E4CC]' : 'bg-gray-800/30 border-gray-700 text-gray-500'}`}>
                    🔍
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">เพิ่ม inspectator ตรวจพิเศษ</p>
                    <p className="text-[13px] text-gray-500 leading-tight mt-1 max-w-xs">
                      ส่งช่าง AutoCheck ไปตรวจรถที่เต็นท์ก่อนคุณไปถึง 150+ จุด แจ้งผลภายใน 24 ชม.
                    </p>
                  </div>
                </div>
                <div 
                  onClick={() => setIsInspectorOn(!isInspectorOn)}
                  className={`w-14 h-7 rounded-full p-1 cursor-pointer border transition-colors ${isInspectorOn ? 'bg-[#1A302A] border-[#408A71]' : 'bg-gray-800 border-gray-600'}`}
                >
                   <div className={`w-5 h-5 rounded-full shadow-lg transition-transform ${isInspectorOn ? 'translate-x-7 bg-[#408A71]' : 'translate-x-0 bg-gray-500'}`}></div>
                </div>
              </div>

              {/* Confirm Button */}
              <button className="w-full bg-white hover:bg-[#B0E4CC] text-[#020D0B] font-black py-5 rounded-[24px] shadow-xl transition-all active:scale-[0.98] mt-4 uppercase tracking-widest flex items-center justify-center gap-3">
                <span className="text-xl">✓</span> CONFIRM BOOKING
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}