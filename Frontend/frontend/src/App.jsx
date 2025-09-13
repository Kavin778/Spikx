import Sidebar from "./components/Sidebar"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <div className="bg-gray-900">
      <Sidebar />
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App
