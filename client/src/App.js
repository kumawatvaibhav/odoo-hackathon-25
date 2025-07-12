import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { Toaster } from 'react-hot-toast';
import ActionBar from './components/ActionBar/ActionBar';
import Footer from './components/Footer/Footer';
import HomeMainbar from './components/HomeMainbar/HomeMainbar';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [filter, setFilter] = useState('newest');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers());
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Toaster />
        <Navbar setIsOpen={setIsOpen}/>
        <ActionBar onFilterChange={setFilter} />
        {/* Only pass filter to HomeMainbar if on home route */}
        <AllRoutes HomeMainbarComponent={<HomeMainbar filter={filter} />} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
