import "./App.css";
import TicketsList from "./Components/ticketsList";

import { setTickets } from "./reducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // Load data from local storage when component mounts
  const storedTickets = localStorage.getItem("tickets");

  if (storedTickets) {
    dispatch(setTickets(storedTickets));
  }
  return (
    <>
      <TicketsList />
    </>
  );
}

export default App;
