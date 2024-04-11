import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: "",
  selectedTicket: "",
  selectedAddTicket: "",
  ticketAddedTigger: 0,
};

const ticketManager = createSlice({
  name: "ticketsStateManager",
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    setSelectedAddTicket: (state, action) => {
      state.selectedAddTicket = action.payload;
    },
    setTicketAddedTigger: (state, action) => {
      state.ticketAddedTigger = action.payload;
    },
  },
});

export const {
  setSelectedTicket,
  setSelectedAddTicket,
  setTickets,
  setTicketAddedTigger,
} = ticketManager.actions;

export default ticketManager.reducer;
