import React, { useState } from "react";
import { setSelectedAddTicket } from "../reducer.js";
import { setTicketAddedTigger } from "../reducer.js";
import { useSelector, useDispatch } from "react-redux";
import closeImg from "../Images/cross-svgrepo-com.svg";

export default function CreateTicket() {
  const tickets = JSON.parse(localStorage.getItem("tickets"));

  const ticketAddedTrigger = useSelector(
    (state) => state.ticketsStateManager.ticketAddedTigger
  );

  const [ticketData, setTicketData] = useState({
    ticketid: "",
    subject: "",
    priority: "Low",
    category: "Incident",
    status: "Open", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTicketAddedTigger(ticketAddedTrigger + 1));
    const updatedTickets = [
      ...tickets,
      {
        ...ticketData,
        id: tickets.length + 1,
      },
    ];
    // console.log("updatedTickets", tickets, ticketData);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTicketData({
      ticketid: "",
      subject: "",
      priority: "",
      category: "",
      status: "Open",
    });
  };

  const selectedAddTicket = useSelector(
    (state) => state.ticketsStateManager.selectedAddTicket
  );

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setSelectedAddTicket(false));
  };
  return (
    <>
      <div className="ticketPreviewCont">
        <div
          className={`add-ticket-container ticket-details ${
            selectedAddTicket ? "animatorRight" : ""
          }`}
        >
          <div className="ticketHeadCont d-flex justify-content-between align-center">
            <h2>Add New Ticket</h2>
            <img
              src={closeImg}
              width={12}
              height={12}
              alt="close button"
              onClick={onClose}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label>Ticket ID:</label>
            <input
              type="text"
              name="ticketid"
              value={ticketData.ticketid}
              onChange={handleChange}
              required
            />
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={ticketData.subject}
              onChange={handleChange}
              required
            />
            <label>Priority:</label>
            <select
              name="priority"
              value={ticketData.priority}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <label>Category:</label>
            <select
              name="category"
              value={ticketData.category}
              onChange={handleChange}
              required
            >
              <option value="Incident">Incident</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Question">Question</option>
              {/* Add more categories as needed */}
            </select>
            <div className="marginTop1">
              <button className="addNewTicket" type="submit">
                Add Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
