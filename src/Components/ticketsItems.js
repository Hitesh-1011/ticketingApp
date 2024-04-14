import React, { useState } from "react";
import closeImg from "../Images/cross-svgrepo-com.svg";
import { setSelectedTicket } from "../reducer.js";
import { useSelector, useDispatch } from "react-redux";
import { setTicketAddedTigger } from "../reducer.js";
import { toast } from "react-toastify";

export default function TicketDetails({ ticket }) {
  const selectedTicketData = useSelector(
    (state) => state.ticketsStateManager.selectedTicket
  );

  const ticketAddedTrigger = useSelector(
    (state) => state.ticketsStateManager.ticketAddedTigger
  );

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setSelectedTicket(""));
  };

  const [selectedStatus, setSelectedStatus] = useState(ticket.status);

  const handleChange = (e) => {
    dispatch(setTicketAddedTigger(ticketAddedTrigger + 1));
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    toast.success("Ticket Updated successfully!");
    onClose();
    // Update local storage
    const ticketsFromStorage = JSON.parse(localStorage.getItem("tickets"));
    const updatedTickets = ticketsFromStorage.map((t) =>
      t.id === ticket.id ? { ...t, status: newStatus } : t
    );
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };
  return (
    <>
      <div className="ticketPreviewCont">
        <div
          className={`ticket-details ${
            selectedTicketData ? "animatorRight" : ""
          }`}
        >
          <div className="ticketHeadCont d-flex justify-content-between align-center">
            <h2>Ticket Preview</h2>
            <img
              src={closeImg}
              width={12}
              height={12}
              alt="close button"
              onClick={onClose}
            />
          </div>
          <div className="ticketsDetailsSection">
            <p className="ticketid">{ticket.ticketid}</p>
            <p className="ticketName">{ticket.subject}</p>
            <select
              name="category"
              value={selectedStatus}
              onChange={handleChange}
              required
              className="bgDownArrow"
              style={{
                backgroundColor:
                  selectedStatus === "Open"
                    ? "#32c8f2"
                    : selectedStatus === "Closed"
                    ? "orange"
                    : selectedStatus === "Terminated"
                    ? "red"
                    : "white", // Default background color if none of the conditions match
                color: "white", // Text color to ensure visibility
              }}
            >
              <option selected disabled>
                {selectedStatus}
              </option>
              <option value="Open">Open</option>
              <option value="Closed">Close</option>
              <option value="Terminated">Terminate</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="ticketsDetailsSectionBelow">
            <div className="priorityTab">
              <p className="detailsHead">Priority</p>
              <p className="detailsStat">{ticket.priority}</p>
            </div>
            <div className="categoryTab">
              <p className="detailsHead">Category</p>
              <p className="detailsStat">{ticket.category}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
