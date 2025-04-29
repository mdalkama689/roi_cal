import { Calculator } from './components/Calculator';
import { Header } from './components/Header';

function App() {
  return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Calculator />
        </main>
      </div>
  );
}

export default App;