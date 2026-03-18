import React from 'react';

export default function BookingStep3() {
  return (
    <main className="min-h-screen bg-[#020D0B] text-white font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold tracking-tight">AutoCheck</span>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">1</span>
                <span className="h-[1px] w-10 bg-white/20"></span>
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">2</span>
                <span className="h-[1px] w-10 bg-white/20"></span>
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">3</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Step 3 : track your request</p>
          </div>
        </header>

        {/* Booking status card */}
        <section className="mt-10 bg-[#0A1A17] rounded-3xl border border-white/10 shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold">สถานะการจอง</h1>
            <p className="text-gray-400 mt-2">ติดตามสถานะการจองของคุณ</p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#020D0B]/40 overflow-hidden">
              <div className="px-8 py-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-400">รูปตัวอย่างรถ</p>
                        <div className="mt-4 h-32 bg-white/10 rounded-2xl flex items-center justify-center text-gray-400">
                          <span>รูปตัวอย่างรถ</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Civic 1.8 EL</p>
                        <p className="text-2xl font-bold mt-2">Civic 1.8 EL</p>
                        <p className="text-sm text-gray-400 mt-1">ปี 2021 | สีขาวมุก</p>
                        <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full border border-white/20 text-sm">
                          <span className="w-2 h-2 rounded-full bg-yellow-400" />
                          <span className="text-gray-200">pending - รอการยืนยัน</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm text-gray-400">
                      <div className="p-4 bg-white/5 rounded-2xl">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">วันที่</p>
                        <p className="mt-1 font-bold">8 Aug 2026</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">ช่วงเวลา</p>
                        <p className="mt-1 font-bold">09:00 - 12:00</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">BOOKING ID</p>
                        <p className="mt-1 font-bold">#AC‑2658</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-[#020D0B] border border-white/10 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold">ยนตรกิจ เชียงใหม่ (สาขา นิมมาน)</p>
                      <p className="text-xs text-gray-400 mt-1">123 ถ.นิมมานเหมินท์ ซ.1 ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200</p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#B0E4CC] underline"
                    >
                      <span className="text-lg">📍</span>
                      Google Maps
                    </a>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 font-bold text-sm hover:bg-white/15 transition">
                    View Inspection Report
                  </button>
                  <button className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 font-bold text-sm hover:bg-white/15 transition">
                    Cancel Booking
                  </button>
                </div>

                <div className="mt-8 bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Inspection Score</p>
                      <p className="text-xs text-gray-400">ผลตรวจสภาพโดย AutoCheck</p>
                    </div>
                    <div className="text-3xl font-bold">92<span className="text-base font-normal">/100</span></div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      { label: 'เครื่องยนต์', value: 94 },
                      { label: 'ตัวถัง', value: 92 },
                      { label: 'ไฟฟ้า', value: 93 },
                      { label: 'ยางล้อ', value: 88 },
                      { label: 'เบรก', value: 95 },
                    ].map((item) => (
                      <div key={item.label} className="grid grid-cols-3 items-center gap-3">
                        <div className="text-sm font-semibold text-gray-200">{item.label}</div>
                        <div className="col-span-2 bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#408A71]"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <button className="w-full sm:w-auto flex-1 rounded-2xl border border-white/20 bg-white/10 py-4 font-bold text-sm hover:bg-white/15 transition">
                    📷 SCREENSHOT
                  </button>
                  <button className="w-full sm:w-auto flex-1 rounded-2xl border border-white/20 bg-[#408A71] py-4 font-bold text-sm hover:bg-[#4aa47e] transition">
                    ✓ Back to Step 1
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
