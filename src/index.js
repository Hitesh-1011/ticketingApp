import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store.js";
import { Provider } from "react-redux";

const initialTicketData = [
  {
    id: 1,
    ticketid: "#TC-001",
    subject: "Unrecognized Charges on My Account",
    priority: "Medium",
    category: "Incident",
    status: "Open",
  },
  {
    id: 2,
    ticketid: "#TC-002",
    subject: "Defective Item Received",
    priority: "High",
    category: "Suggestion",
    status: "Closed",
  },
  {
    id: 3,
    ticketid: "#TC-003",
    subject: "Unable to Access My Account",
    priority: "Low",
    category: "Question",
    status: "Open",
  },
];

const storedTickets = localStorage.getItem("tickets");

if (storedTickets === null) {
  localStorage.setItem("tickets", JSON.stringify(initialTicketData));
}
// Store initial rows in local storage

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
