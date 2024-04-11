import React from "react";
import closeImg from "../Images/cross-svgrepo-com.svg";
import { setSelectedTicket } from "../reducer.js";
import { useSelector, useDispatch } from "react-redux";

export default function TicketDetails({ ticket }) {
  const selectedTicketData = useSelector(
    (state) => state.ticketsStateManager.selectedTicket
  );

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setSelectedTicket(""));
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
          <p>Ticket ID: {ticket.ticketid}</p>
          <p>Subject: {ticket.subject}</p>
          <p>Priority: {ticket.priority}</p>
          <p>Category: {ticket.category}</p>
          <p>Status: {ticket.status}</p>
        </div>
      </div>
    </>
  );
}
