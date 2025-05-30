import { createSlice } from "@reduxjs/toolkit";
import { Lead } from "@/types";
import { getLeadIndex, getLeadShow, postLeadStore, putLeadUpdate, deleteLeadDestroy } from "@/actions/leadAction";

interface LeadState {
  leads: Lead[];
  lead: Lead | null;
  loading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: [],
  lead: null,
  loading: false,
  error: null
};

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadIndex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadIndex.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.result || [];
      })
      .addCase(getLeadIndex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch leads";
      })

      .addCase(getLeadShow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadShow.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload.result || null;
      })
      .addCase(getLeadShow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch lead";
      })

      .addCase(postLeadStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLeadStore.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.unshift(action.payload.result);
      })
      .addCase(postLeadStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create lead";
      })

      .addCase(putLeadUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putLeadUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = state.leads.map((lead) =>
          lead.id === action.payload.result.id ? action.payload.result : lead
        );
      })
      .addCase(putLeadUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update lead";
      })

      .addCase(deleteLeadDestroy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadDestroy.fulfilled, (state, action) => {
        state.loading = false;
        const deletedIds = action.meta.arg;
        state.leads = state.leads.filter((lead) => !deletedIds.includes(lead.id));
      })
      .addCase(deleteLeadDestroy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete lead";
      });
  }
});

export default leadSlice.reducer;