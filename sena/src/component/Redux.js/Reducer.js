import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  { rejectWithValue },
  async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/product/createProduct",
        product
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "product/getall",
  async ({ rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8000/api/product/getAll");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Redux slice for products
const userDetailSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false; // Stop loading
        state.error = action.payload; // Capture and store the error
      });
  },
});

// Export the reducer
export default userDetailSlice.reducer;
