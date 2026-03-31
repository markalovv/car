"use client";

import React from "react";

const inspectionItems = [
  {
    title: "เครื่องยนต์และระบบกำลัง",
    subtitle: "ตรวจสอบ 24 รายการ",
    status: "ผ่าน",
    note: "",
    warning: false,
  },
  {
    title: "ตัวถังและสีรถ",
    subtitle: "ตรวจสอบ 18 รายการ",
    status: "ผ่าน",
    note: "",
    warning: false,
  },
  {
    title: "ระบบไฟฟ้าและอิเล็กทรอนิกส์",
    subtitle: "ตรวจสอบ 16 รายการ",
    status: "ผ่าน",
    note: "",
    warning: false,
  },
  {
    title: "ยางล้อและช่วงล่าง",
    subtitle: "ตรวจสอบ 19 รายการ",
    status: "แนะนำให้ตรวจเพิ่ม",
    note: "พบ 1 รายการ แนะนำเปลี่ยน",
    warning: true,
  },
];

export default function Popup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[28px] border border-[#408A71]/35 bg-[#091413] text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        {/* top bar */}
        <div className="flex items-start justify-between border-b border-white/10 px-6 pt-6 pb-4">
          <div>
            <h2 className="text-[30px] font-bold leading-none tracking-tight">
              Inspection Report
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#E7F5EE]">
              Civic 1.8 EL <span className="text-white/70">ปี 2021 · สีขาวมุก</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* body */}
        <div className="space-y-4 px-6 py-5">
          {inspectionItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[22px] border border-[#B0E4CC]/18 bg-[#285A48]/18 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/65">{item.subtitle}</p>

                  {item.note && (
                    <p className="mt-2 text-sm text-[#B0E4CC]">{item.note}</p>
                  )}
                </div>

                <div
                  className={[
                    "shrink-0 rounded-full px-3 py-1 text-sm font-semibold",
                    item.warning
                      ? "border border-amber-300/25 bg-amber-300/12 text-amber-300"
                      : "border border-[#B0E4CC]/20 bg-[#408A71]/18 text-[#B0E4CC]",
                  ].join(" ")}
                >
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex gap-3 border-t border-white/10 px-6 py-5">
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            ปิด
          </button>

          <button className="flex-1 rounded-2xl bg-[#408A71] py-3 text-sm font-bold text-white transition hover:bg-[#4c9c80]">
            ดาวน์โหลดรายงาน
          </button>
        </div>
      </div>
    </div>
  );
}