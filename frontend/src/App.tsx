import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TicketProvider } from "./context/TicketContext";
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import EditTicket from "./pages/EditTicket";
import NotFound from "./pages/NotFound";
import "./App.scss";

function App() {
  return (
    <Router>
      <TicketProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTicket />} />
            <Route path="/edit/:id" element={<EditTicket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TicketProvider>
    </Router>
  );
}

export default App;
