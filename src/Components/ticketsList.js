import React, { useEffect, useState } from "react";
import { setSelectedTicket, setSelectedAddTicket } from "../reducer.js";
import { DataGrid } from "@mui/x-data-grid";
import TicketDetails from "./ticketsItems.js";
import { useDispatch, useSelector } from "react-redux";
import CreateTicket from "./createTicketForm.js";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [numberOfTcikets, setNumberOfTickets] = useState(0);

  const selectedTicketData = useSelector(
    (state) => state.ticketsStateManager.selectedTicket
  );

  const selectedAddTicket = useSelector(
    (state) => state.ticketsStateManager.selectedAddTicket
  );

  const ticketAddedTrigger = useSelector(
    (state) => state.ticketsStateManager.ticketAddedTigger
  );

  // Filter the tickets to get only the open tickets
  const openTickets = tickets.filter((ticket) => ticket.status === "Open");

  // Get the number of open tickets
  const numberOfOpenTickets = openTickets.length;

  useEffect(() => {
    // Load data from local storage when component mounts
    const storedTickets = JSON.parse(localStorage.getItem("tickets"));
    if (storedTickets) {
      setTickets(storedTickets);
    }
    setNumberOfTickets(storedTickets.length);
  }, [ticketAddedTrigger]);

  // Define a function to render the status cell with color based on status value
  const renderStatusCell = (params) => {
    let color = "black"; // Default font color

    switch (params.value) {
      case "Open":
        color = "#32c8f2"; // Blue color for Open status
        break;
      case "Closed":
        color = "green"; // Green color for Closed status
        break;
      default:
        color = "red"; // Red color for other statuses
    }
    return (
      <span
        style={{
          color,
          fontWeight: "bold", // Bold font for Open status
        }}
      >
        {params.value}
      </span>
    );
  };

  //  Column names or header of the table
  const columns = [
    { field: "ticketid", headerName: "Ticket ID", width: 150 },
    { field: "subject", headerName: "Subject", width: 350 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: renderStatusCell,
    },
  ];

  const handleRowClick = (params) => {
    dispatch(setSelectedTicket(params.row));
  };

  const dispatch = useDispatch();

  // Function to filter rows based on search query
  const filteredRows = tickets.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
      <div className="statsContainer borderStyle">
        <div className="detailsContainer">
          <p className="detailHead">TICKETS</p>
          <p className="statsInfo">{numberOfTcikets}</p>
        </div>
        <div className="detailsContainer">
          <p className="detailHead">OVERDUE TICKET</p>
          <p className="statsInfo">{numberOfOpenTickets}</p>
        </div>
      </div>
      <div className="borderStyle">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="borderStyle">
        {filteredRows.length === 0 ? (
          <div className="no-results">
            <img
              src={require("../Images/pagenotfound.jpg")}
              width={200}
              height={200}
              alt="no results"
            />
            <p>No results found.</p>
          </div>
        ) : (
          <DataGrid
            rows={filteredRows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
          />
        )}
      </div>
      {selectedTicketData && <TicketDetails ticket={selectedTicketData} />}
      {selectedAddTicket && <CreateTicket />}
    </>
  );
}
