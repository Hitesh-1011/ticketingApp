import { configureStore } from "@reduxjs/toolkit";
import ticketsStateManager from "../reducer.js";

export default configureStore({
  reducer: {
    ticketsStateManager: ticketsStateManager,
  },
});
