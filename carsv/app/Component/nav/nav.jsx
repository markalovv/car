

export default function Nav() {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#091413] border-b-2 border-[#285A48] shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        
                        <div className="font-['Orbitron'] font-bold text-xl tracking-wider text-[#B0E4CC]">
                            K.C.S.P. <span className="text-[#53ffc6]">Autoshop</span>
                        </div>
                    </div>

                    {/* Links */}
                    <ul className="flex gap-8 font-medium">
                        <li>
                            <a href="#" className="text-[#B0E4CC] hover:text-white transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-[#408A71] hover:text-[#B0E4CC] transition-colors">Car</a>
                        </li>
                        <li>
                            <a href="#" className="bg-[#285A48] text-white px-4 py-2 rounded-full hover:bg-[#408A71] transition-all">
                                Service
                            </a>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}