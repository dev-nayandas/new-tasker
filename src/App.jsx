import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/TaskBoard";


function App() {
  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
     <Header/>
     <Hero/>
     <TaskBoard/>
     <Footer/>
    </div>
  );
}

export default App;
