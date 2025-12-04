import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

const colorPalettes = {
  "Midnight Red": {
    primary: "#EF4444",
    accent: "#FB923C",
    background: "#0A0A0A",
    navbar: "#171717",
    text: "#F5F5F5"
  },
  // "Ocean Blue": {
  //   primary: "#3B82F6",
  //   accent: "#0EA5E9",
  //   background: "#0F172A",
  //   navbar: "#1E293B",
  //   text: "#F1F5F9"
  // }
  // },
  // "Forest Green": {
  //   primary: "#10B981",
  //   accent: "#34D399",
  //   background: "#064E3B",
  //   navbar: "#065F46",
  //   text: "#ECFCCB"
  // },
  // "Purple Haze": {
  //   primary: "#8B5CF6",
  //   accent: "#EC4899",
  //   background: "#1E1B4B",
  //   navbar: "#312E81",
  //   text: "#F5F3FF"
  // },
  "Sunset Orange": {
    primary: "#F97316",
    accent: "#FACC15",
    background: "#1C1917",
    navbar: "#292524",
    text: "#FEF3C7"
  },
  // "Deep Ocean": {
  //   primary: "#06B6D4",
  //   accent: "#0284C7",
  //   background: "#164E63",
  //   navbar: "#155E75",
  //   text: "#E0F2FE"
  // },
  // "Cherry Blossom": {
  //   primary: "#EC4899",
  //   accent: "#F472B6",
  //   background: "#FDF2F8",
  //   navbar: "#FCE7F3",
  //   text: "#831843"
  // },
  "Arctic Blue": {
    primary: "#0EA5E9",
    accent: "#38BDF8",
    background: "#F0F9FF",
    navbar: "#E0F2FE",
    text: "#0C4A6E"
  },
  // "Lime Fresh": {
  //   primary: "#84CC16",
  //   accent: "#BEF264",
  //   background: "#F7FEE7",
  //   navbar: "#ECFCCB",
  //   text: "#365314"
  // },
  // "Royal Purple": {
  //   primary: "#7C3AED",
  //   accent: "#A78BFA",
  //   background: "#FAF5FF",
  //   navbar: "#F3E8FF",
  //   text: "#4C1D95"
  // },
  // "Charcoal": {
  //   primary: "#64748B",
  //   accent: "#94A3B8",
  //   background: "#020617",
  //   navbar: "#0F172A",
  //   text: "#F1F5F9"
  // },
  // "Campus Core": {
  //   primary: "#2563EB",
  //   accent: "#F97316",
  //   background: "#F9FAFB",
  //   navbar: "#E5E7EB",
  //   text: "#0F172A"
  // },
  // "Eco Ride": {
  //   primary: "#16A34A",
  //   accent: "#22C55E",
  //   background: "#F0FDF4",
  //   navbar: "#DCFCE7",
  //   text: "#052E16"
  // },
  // "Night Shuttle": {
  //   primary: "#0EA5E9",
  //   accent: "#FACC15",
  //   background: "#020617",
  //   navbar: "#020817",
  //   text: "#F9FAFB"
  // },
  // "Marketplace Sunset": {
  //   primary: "#FB923C",
  //   accent: "#EC4899",
  //   background: "#FFFBEB",
  //   navbar: "#FEF3C7",
  //   text: "#1F2937"
  // },
  // "Social Grape": {
  //   primary: "#6366F1",
  //   accent: "#E11D48",
  //   background: "#EEF2FF",
  //   navbar: "#E0E7FF",
  //   text: "#020617"
  // },
  // "Tech Minimal": {
  //   primary: "#0F172A",
  //   accent: "#3B82F6",
  //   background: "#FFFFFF",
  //   navbar: "#F3F4F6",
  //   text: "#020617"
  // },
  // "Cafe Commons": {
  //   primary: "#65A30D",
  //   accent: "#EA580C",
  //   background: "#F5F5F4",
  //   navbar: "#E7E5E4",
  //   text: "#1C1917"
  // },
  // "Pastel Campus": {
  //   primary: "#38BDF8",
  //   accent: "#F472B6",
  //   background: "#FDF2FF",
  //   navbar: "#FCE7F3",
  //   text: "#0F172A"
  // },
  // "Urban Transit": {
  //   primary: "#111827",
  //   accent: "#F97316",
  //   background: "#E5E7EB",
  //   navbar: "#D1D5DB",
  //   text: "#020617"
  // },
  // "Library Calm": {
  //   primary: "#0284C7",
  //   accent: "#14B8A6",
  //   background: "#ECFEFF",
  //   navbar: "#CFFAFE",
  //   text: "#082F49"
  // }
};

export default function TopBar() {
  const router = useRouter();
  const [selectedPalette, setSelectedPalette] = useState("Midnight Red");

  const handlePaletteChange = (e) => {
    const paletteName = e.target.value;
    setSelectedPalette(paletteName);
    const palette = colorPalettes[paletteName];
    
    // Update CSS variables for Tailwind @theme
    const root = document.documentElement;
    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-accent', palette.accent);
    
    // Update body background
    const isDark = palette.background.toLowerCase().includes('#0') || palette.background.toLowerCase().includes('#1');
    if (isDark) {
      document.body.style.background = `linear-gradient(to bottom, ${palette.background} 0%, ${palette.background} 50%, ${palette.background} 100%)`;
    } else {
      document.body.style.background = palette.background;
    }
    
    // Update background color for all pages
    document.body.style.backgroundColor = palette.background;
    
    // Update theme-color meta tag for Safari UI blending
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', palette.background);
    }
    
    // Create style element to override Tailwind text colors and backgrounds
    let styleEl = document.getElementById('theme-override');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-override';
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = `
      .text-white, h1, h2, h3, h4, h5, h6, p {
        color: ${palette.text} !important;
      }
      .text-gray-300 {
        color: ${palette.text}CC !important;
      }
      .text-gray-400 {
        color: ${palette.text}99 !important;
      }
      .text-gray-500 {
        color: ${palette.text}66 !important;
      }
      .text-gray-200 {
        color: ${palette.text}DD !important;
      }
      /* Update icon colors */
      svg {
        color: ${palette.text} !important;
      }
      .text-primary svg {
        color: ${palette.primary} !important;
      }
      /* Update navbar backgrounds using navbar color */
      header {
        background: ${palette.navbar} !important;
        backdrop-filter: blur(12px) !important;
      }
      nav {
        background: ${palette.navbar} !important;
        backdrop-filter: blur(12px) !important;
      }
    `;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#171717]/95 backdrop-blur-lg border-b border-white/10 z-40 px-5" style={{paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "env(safe-area-inset-top)"}}>
      <div className="flex justify-between items-center h-16 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">
          {/* <span className="text-white">Campus</span> */}    
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Connect</span>
        </h1>
        
        {/* Color Palette Selector */}
        <select
          value={selectedPalette}
          onChange={handlePaletteChange}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
        >
          {Object.keys(colorPalettes).map((name) => (
            <option key={name} value={name} className="bg-[#171717] text-white">
              {name}
            </option>
          ))}
        </select>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/profile')}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center hover:border-primary transition-all"
        >
          <FiUser size={20} className="text-primary" />
        </motion.button>
      </div>
    </header>
  );
}
