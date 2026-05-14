import { Button } from "../Ui/Buttons/Button"
import LPPhoto from "../Images/LPPhoto.png"
import { AIMagic } from "../Ui/Icons/AIMagic"
import { Collab } from "../Ui/Icons/Collaboration"
import { WritePlan } from "../Ui/Icons/WritePlan"

export function LandingPage() {
    return (
        <>
            <div className="pt-4 pb-8 overflow-x-hidden selection:bg-blue-100 bg-white">
                <nav className="flex w-full px-6 md:px-12 items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 py-4 border-b border-slate-50">
                    <div className="text-blue-500 flex justify-center items-center text-2xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer">
                        TripzyAI
                    </div>
                    <div className="flex justify-end items-center gap-2 md:gap-4">
                        <Button color="white" size="middle" text="SignIn" textColor="grey"/>
                        <Button color="blue" size="middle" text="Start Planning" textColor="white"/>
                    </div>
                </nav>

                <div className="bg-slate-50 px-6 md:px-12 mt-4 rounded-[2.5rem] mx-2 md:mx-6 border border-slate-100 shadow-sm">
                    <div className="flex flex-col lg:flex-row pt-12 md:pt-20 items-center gap-12 lg:gap-4">
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h1 className="font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-slate-900">
                                The Future <br /> of Travel is
                                <span className="block lg:inline-block text-blue-400 italic lg:ml-4 animate-pulse drop-shadow-sm">Personal</span>
                            </h1>
                            <p className="text-lg md:text-xl mt-8 font-light text-slate-600 max-w-xl leading-relaxed">
                                Experience an Intelligent Concierge that learns your unique taste, curating bespoke journeys that evolve with every step you take.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mt-10">
                                <Button color="grey" size="secondry" text="Experience the Future" textColor="grey"/>
                                <div className="shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] rounded-full transition-hover hover:scale-105 duration-300">
                                    <Button color="blue" size="secondry" text="Get Started" textColor="white"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
                                <img 
                                    className="relative w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem] rounded-[2.5rem] shadow-2xl object-cover border-4 border-white"
                                    style={{ animation: 'heroFloat 7s ease-in-out infinite' }} 
                                    src={LPPhoto} 
                                    alt="Luxury Destination" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-32 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800">Plan, Collaborate, Explore.</h2>
                        <p className="font-light text-xl mt-4 text-slate-500 max-w-2xl">Moving beyond the spreadsheet to an editorial-first travel philosophy.</p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
                        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12 hover:-translate-y-2 transition-all duration-500 border border-slate-100">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex justify-center items-center shadow-inner text-blue-600">
                                <AIMagic/>
                            </div>
                            <h3 className="text-3xl font-bold mt-6 text-slate-800 tracking-tight">AI-Powered Discovery</h3>
                            <p className="font-light text-lg mt-4 text-slate-600 leading-relaxed">
                                Tell us your mood, your budget, and your curiosities. Our engine doesn't just find destinations; it architectures experiences tailored to your history.
                            </p>
                        </div>

                        <div className="lg:col-span-5 bg-blue-500 rounded-3xl shadow-2xl shadow-blue-500/30 p-8 md:p-12 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex justify-center items-center text-white relative z-10">
                                <Collab/>
                            </div>
                            <h3 className="text-3xl font-bold mt-6 text-white relative z-10">Live Collaboration</h3>
                            <p className="font-light text-lg mt-4 text-blue-50 leading-relaxed relative z-10">
                                Invite your inner circle. Watch real-time as your group adjusts flight paths, swaps hotels, and votes on dining hotspots.
                            </p>
                        </div>

                        <div className="lg:col-span-12 bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 hover:-translate-y-2 transition-all duration-500 border border-slate-50">
                            <div className="w-20 h-20 bg-red-50 rounded-2xl flex-shrink-0 flex justify-center items-center shadow-inner text-red-500">
                                <WritePlan/>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Your Travel Legacy</h3>
                                <p className="font-light text-lg mt-2 text-slate-600 leading-relaxed">
                                    A permanent archive of your journeys. Analyze your travel trends, revisit high-resolution memories, and export professionally designed guides for friends.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-40 w-full px-4">
                        <span className="font-mono text-sm tracking-[0.4em] text-blue-600 font-bold uppercase">Voice of the Traveler</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight text-slate-900">The Intelligent Concierge <br /> in Action</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 pb-20">
                            {[
                                { name: "Julian V.", role: "Design Director", text: "Finally, a tool that understands that luxury isn't just about price—it's about the precision of the experience. It found a hidden jazz bar in Tokyo I would have never seen.", img: "https://img.freepik.com/free-photo/beautiful-african-woman-face-portrait-close-up_53876-148041.jpg" },
                                { name: "Elena R.", role: "Tech Lead", text: "Collaborating on our honeymoon was actually fun. No more endless email threads or messy spreadsheets. Tripzy made it feel like we were co-authoring a story.", img: "https://plus.unsplash.com/premium_photo-1675080431524-3e7c85323972?fm=jpg&q=60&w=300" },
                                { name: "Marcus S.", role: "Venture Partner", text: "The analytics revealed I spend 40% of my time in Mediterranean climates. The AI now proactively suggests coastal villas before I even search.", img: "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?fm=jpg&q=60&w=300" }
                            ].map((user, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-300 border border-slate-50 flex flex-col justify-between">
                                    <p className="italic text-lg text-slate-700 leading-relaxed">"{user.text}"</p>
                                    <div className="flex items-center gap-4 mt-10">
                                        <img className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-50 shadow-md" src={user.img} alt={user.name} />
                                        <div>
                                            <div className="font-bold text-slate-900 text-lg">{user.name}</div>
                                            <div className="font-medium text-sm text-blue-500">{user.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 flex justify-center items-center pb-24 md:pb-40">
                        <div className="bg-blue-600 rounded-[3rem] w-full max-w-5xl py-16 px-8 relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(37,99,235,0.4)]">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">Your next Legacy Journey <br /> Starts now.</h2>
                                <p className="text-blue-100 font-light mt-6 text-xl max-w-lg leading-relaxed">Join a community of travelers who value depth, discovery, and design.</p>
                                <div className="mt-12 scale-125 hover:scale-135 transition-transform duration-500">
                                    <Button color="white" size="secondry" text="Get Started for Free" textColor="blue"/>
                                </div>
                                <p className="text-white/60 text-[0.7rem] mt-10 tracking-[0.2em] uppercase font-bold">No credit card required • Pure exploration</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-16 bg-white px-6 md:px-12 py-12 border-t border-slate-50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <div className="text-2xl font-black text-slate-800 tracking-tighter">TripzyAI</div>
                            <div className="text-slate-400 text-sm mt-2 font-medium">
                                © 2026 The TripzyAI. Intelligent Concierge Experiences.
                            </div>
                        </div>
                        <div className="flex gap-10 text-sm font-semibold text-slate-500">
                            <span className="hover:text-blue-500 cursor-pointer transition-colors uppercase tracking-widest">Privacy</span>
                            <span className="hover:text-blue-500 cursor-pointer transition-colors uppercase tracking-widest">Terms</span>
                            <span className="hover:text-blue-500 cursor-pointer transition-colors uppercase tracking-widest">Contact</span>
                        </div>
                    </div>
                </footer>
            </div>
            
            <style>{`
                @keyframes heroFloat {
                    0%, 100% { transform: translateY(0px) rotate(-1deg) scale(1); }
                    50% { transform: translateY(-25px) rotate(1deg) scale(1.02); }
                }
            `}</style>
        </>
    )
}