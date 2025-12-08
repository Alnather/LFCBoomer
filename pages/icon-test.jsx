import { FiTruck } from 'react-icons/fi';
import { MdDirectionsCar, MdLocalTaxi } from 'react-icons/md';
import { FaCar } from 'react-icons/fa';
import { IoCarSport } from 'react-icons/io5';

export default function IconTest() {
  const icons = [
    { name: 'Option 1: FiTruck', icon: FiTruck, description: 'Simple truck/vehicle icon from Feather Icons' },
    { name: 'Option 2: MdDirectionsCar', icon: MdDirectionsCar, description: 'Standard car icon from Material Design' },
    { name: 'Option 3: MdLocalTaxi', icon: MdLocalTaxi, description: 'Taxi/rideshare icon from Material Design' },
    { name: 'Option 4: FaCar', icon: FaCar, description: 'Car icon from Font Awesome' },
    { name: 'Option 5: IoCarSport', icon: IoCarSport, description: 'Sports car icon from Ionicons' },
  ];

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Car Icon Options for Rides</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {icons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1C1C1C] to-[#171717] rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Large preview */}
                  <div className="w-32 h-32 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon size={64} className="text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{item.description}</p>
                  
                  {/* Navbar preview */}
                  <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5">
                    <p className="text-gray-500 text-xs mb-3">In Navbar:</p>
                    <div className="flex items-center justify-center gap-2">
                      <Icon size={24} className="text-white" />
                      <span className="text-white text-sm font-medium">Rides</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">Visit this page and choose your favorite!</p>
          <p className="text-gray-500 text-sm mt-2">Navigate to: /icon-test</p>
        </div>
      </div>
    </div>
  );
}
