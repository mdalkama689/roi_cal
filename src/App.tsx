import { useEffect, useState } from 'react';
import { Calculator } from './components/Calculator';
import { Header } from './components/Header';
import MobileShare from './components/share/MobileShare';
import TabShare from './components/share/TabShare';

function App() {
   const [deviceType, setDeviceType] = useState<"big" | "small">("big");

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-gray-100">
         {deviceType === "small" ? <MobileShare /> : <TabShare />}
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Calculator />
        </main>
      </div>
  );
}

export default App;