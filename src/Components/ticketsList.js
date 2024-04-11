import React, { useEffect, useState } from "react";
import { setSelectedTicket, setSelectedAddTicket } from "../reducer.js";
import { DataGrid } from "@mui/x-data-grid";
import TicketDetails from "./ticketsItems.js";
import { useDispatch, useSelector } from "react-redux";
import CreateTicket from "./createTicketForm.js";

export default function TicketsList() {
  const [tickets, setTickets] = useState("");

  const selectedTicketData = useSelector(
    (state) => state.ticketsStateManager.selectedTicket
  );

  const selectedAddTicket = useSelector(
    (state) => state.ticketsStateManager.selectedAddTicket
  );

  const ticketAddedTrigger = useSelector(
    (state) => state.ticketsStateManager.ticketAddedTigger
  );
  
  useEffect(() => {
    // Load data from local storage when component mounts
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, [ticketAddedTrigger]);

  //  Column names or header of the table
  const columns = [
    { field: "ticketid", headerName: "Ticket ID", width: 150 },
    { field: "subject", headerName: "Subject", width: 350 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const handleRowClick = (params) => {
    dispatch(setSelectedTicket(params.row));
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="button">
        <button
          className="addNewTicket"
          onClick={() => {
            dispatch(setSelectedAddTicket(true));
          }}
        >
          Add new ticket
        </button>
      </div>
      <div className="borderStyle">
        <DataGrid
          rows={tickets}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
        />
      </div>

      {selectedTicketData && <TicketDetails ticket={selectedTicketData} />}
      {selectedAddTicket && <CreateTicket />}
    </>
  );
}
