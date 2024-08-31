import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Create action for creating a user
export const createUser = createAsyncThunk(
  'createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('https://66cf4eb8901aab248421b650.mockapi.io/crud', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Read action for showing users
export const showUser = createAsyncThunk(
  'showUser',
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch('https://66cf4eb8901aab248421b650.mockapi.io/crud', {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://66cf4eb8901aab248421b650.mockapi.io/crud/${id}`, { method: 'DELETE' })
    if (!response.ok) { throw new Error("Failed to delete the data") }
    const result = await response.json();
    return result
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const editUser = createAsyncThunk('editUser', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://66cf4eb8901aab248421b650.mockapi.io/crud/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error occured", error.message);
    return rejectWithValue(error.message)
  }
})

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      // Create actions
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Read actions
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete action
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.payload
        if (id) { state.users = state.users.filter(user => user.id !== id) }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update actions
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user => (user.id === action.payload.id ? action.payload : user))
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { searchUser } = userDetailSlice.actions;
export default userDetailSlice.reducer;
