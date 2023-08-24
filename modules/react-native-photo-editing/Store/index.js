
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uri: null
};

const photoEditingSlice = createSlice({
  name: "photoEditing",
  initialState,
  reducers: {
    setImageUri(state, action) {
      state.uri = action.payload;
    }
  }
});

export const { setImageUri } = photoEditingSlice.actions;
export default photoEditingSlice.reducer;
