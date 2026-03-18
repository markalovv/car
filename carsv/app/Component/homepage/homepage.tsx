export default function Home() {
    const cars = [
    { name: 'Civic 1.8 EL', year: 2021, price: '549,000', km: '45,000', score: 92, color: 'สีขาวมุก' },
    { name: 'Civic e:HEV EL', year: 2023, price: '1,090,000', km: '14,000', score: 98, color: 'สีเทา Meteoroid' },
    // เพิ่มข้อมูลอื่นๆ ตามต้องการ
  ];

  return (
    <main className="min-h-screen bg-[#091413] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <span className="bg-[#285A48] text-[#B0E4CC] px-4 py-1 rounded-full text-sm font-medium italic">
            Step 1: choose your car
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 font-['Orbitron']">
            Honda Civic มือสอง<br />ที่ผ่านการตรวจแล้ว
          </h1>
        </div>

        {/* Filter Box (ปรับให้ดู Modern ขึ้น) */}
        <div className="bg-[#1a2e2a] border border-[#285A48] rounded-3xl p-6 mb-8">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-[#B0E4CC] mr-2">กรอง</span>
            <button className="bg-[#408A71] text-white px-4 py-1.5 rounded-full text-sm">ทั้งหมด (5)</button>
            <button className="border border-[#285A48] text-[#B0E4CC] px-4 py-1.5 rounded-full text-sm hover:bg-[#285A48]/30">Civic</button>
            <button className="border border-[#285A48] text-[#B0E4CC] px-4 py-1.5 rounded-full text-sm hover:bg-[#285A48]/30">คะแนน</button>
            
            <div className="ml-auto relative w-full md:w-auto mt-4 md:mt-0">
               <input type="text" placeholder="ค้นหา" className="bg-[#091413] border border-[#285A48] text-white px-10 py-2 rounded-full w-full outline-none focus:border-[#B0E4CC]" />
               <span className="absolute left-4 top-2.5 text-[#408A71]">🔍</span>
            </div>
          </div>
        </div>

        {/* Grid Display */}
        <div className="flex justify-between items-end mb-6 text-[#B0E4CC]">
          <p>แสดง 5 คันที่พบ</p>
          <button className="text-sm border-b border-[#408A71] pb-1">เรียงตามคะแนนสูงสุด</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cars.map((car, index) => (
            <div key={index} className="bg-[#d1d5db] rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02]">
              {/* Image Area */}
              <div className="h-48 bg-[#e5e7eb] flex items-center justify-center relative">
                <p className="text-[#4b5563] font-bold">รูปตัวอย่างรถ</p>
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#091413]">
                  {car.name.split(' ')[1]}
                </div>
              </div>

              {/* Detail Area */}
              <div className="bg-[#091413] p-5 border-t border-[#285A48]">
                <p className="text-[#408A71] text-sm">Honda {car.year}</p>
                <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
                <p className="text-gray-400 text-xs mb-4">{car.color} · วิ่ง {car.km} กม.</p>
                
                <div className="flex gap-2 mb-4">
                  <div className="bg-[#1a2e2a] px-3 py-1 rounded-lg border border-[#285A48] text-[10px] text-[#B0E4CC]">
                    ระยะทาง {car.km} KM
                  </div>
                  <div className="bg-[#1a2e2a] px-3 py-1 rounded-lg border border-[#285A48] text-[10px] text-[#B0E4CC]">
                    ปี {car.year}
                  </div>
                </div>

                {/* Score Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-white mb-1">
                    <span>คะแนน {car.score}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1a2e2a] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient from-[#285A48] to-[#B0E4CC]" style={{ width: `${car.score}%` }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#B0E4CC]">{car.price} บาท</span>
                  <button className="bg-white text-[#091413] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#B0E4CC] transition-colors">
                    จองทดลองขับ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}