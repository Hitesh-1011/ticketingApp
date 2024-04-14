import "./App.css";
import TicketsList from "./Components/ticketsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <TicketsList />
    </>
  );
}

export default App;
