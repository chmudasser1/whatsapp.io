import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const showUSer = createAsyncThunk('showUser', async (args, { rejectWithValue }) => {
    const token = localStorage.getItem("socket");
    console.log(token)
    if (!token) {
        return rejectWithValue("No token found");
    }

    const response = await fetch("http://localhost:8000/api/message/users", {
        credentials: "include",  // This is correct
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const Chat = createSlice({
    name: "Chat",
    initialState: {
        chat: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(showUSer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showUSer.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Store the fetched users
            })
            .addCase(showUSer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message
            })
    },
})

export default Chat.reducer;