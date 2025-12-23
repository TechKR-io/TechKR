"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center">
        <img
          src="/about_background.jpg"
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl font-bold mb-6">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto font-light leading-relaxed">
            To build Africa's most trusted platform where every skilled
            individual, digital or local can find consistent work, earn fairly,
            and unlock their full economic potential.
          </p>
        </div>
      </section>

      {/* Our Story Overlay */}
      <section className="container mx-auto px-6 -mt-20 relative z-20 mb-32">
        <div className="bg-black text-white p-12 rounded-[40px] max-w-6xl mx-auto shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-10">Our Story</h2>
          <div className="space-y-8 text-gray-300 text-sm md:text-base text-center leading-relaxed">
            <p>
              <span className="font-bold text-white uppercase">TechKR</span> was
              born out of a real problem observed across Nigeria: thousands of
              skilled individuals; graphic designers, writers, developers,
              plumbers, barbers, tailors, hairdressers were unemployed not
              because they lacked skill, but because they lacked access.
            </p>
            <p>
              Digital talents struggle on crowded platforms where they can’t
              stand out. Local artisans struggle because they have no shops, no
              visibility, and no structured way to find clients.
            </p>
            <p>
              <span className="font-bold text-white uppercase">TechKR</span> was
              created to solve this. A platform designed to bring visibility,
              access, fairness, and opportunity to all skilled Nigerians, both
              digital and non-digital.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-[#F8FAFF] py-24 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-black">Our Mission</h2>
          <p className="text-gray-600 mb-20 text-lg">
            These core values guide our decisions, shape our culture, and define
            who we are as a company.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm text-left border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
                💎
              </div>
              <h4 className="text-xl font-bold mb-3">Integrity</h4>
              <p className="text-gray-500 text-sm">
                We believe in fairness and transparency in every transaction,
                ensuring our clients and talent can trust each other.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm text-left border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                📈
              </div>
              <h4 className="text-xl font-bold mb-3">Growth</h4>
              <p className="text-gray-500 text-sm">
                We provide an avenue for both career and business growth,
                connecting talent to high-value opportunities.
              </p>
            </div>
            {/* Repeat for other cards in design... */}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">Meet Our Team</h2>
        <p className="text-gray-500 mb-16 text-lg">
          Our leadership team brings together decades of experience and a shared
          passion for innovation and excellence.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {[
            {
              name: "Ayomi Shuga",
              role: "Team Lead",
              img: "/ayomi.jpg",
            },
            {
              name: "Tobi Oladeko",
              role: "Product Designer",
              img: "/tobi.jpg",
            },
            {
              name: "Daud Gbadegesin",
              role: "Developer",
              img: "/daud.jpg",
            },
            {
              name: "Usman Alawode",
              role: "Product Designer",
              img: "/usman.jpg",
            },
            {
              name: "Ojeh Agbaje",
              role: "Developer",
              img: "/ojeh.jpg",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col items-center"
            >
              <img
                src={m.img}
                className="w-24 h-24 rounded-full mb-4 object-cover bg-gray-100"
              />
              <h5 className="font-bold text-lg">{m.name}</h5>
              <p className="text-sm text-gray-400">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
