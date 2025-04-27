import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const showUSer = createAsyncThunk('showUser ', async (args, { rejectWithValue }) => {
    const token = Cookies.get('socket');
    if (!token) {
        return rejectWithValue("No token found");
    }

    try {
        const response = await fetch("http://localhost:8000/api/message/users", {
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        // Check if the response is okay
        if (!response.ok) {
            const errorResult = await response.json(); // Get the error response
            console.error("Error response:", errorResult);
            return rejectWithValue(errorResult.message || "Failed to fetch users");
        }

        const result = await response.json();
        console.log("Response body:", result);
        return result;
    } catch (error) {
        console.error("Fetch error:", error);
        return rejectWithValue("Network error or other issue");
    }
});

export const getmessage = createAsyncThunk('getmessage', async (data, { rejectWithValue }) => {
    console.log(data, "data")
    const token = Cookies.get('socket')
    const response = await fetch(`http://localhost:8000/api/message/${data._id}`, {
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const setselectuser = createAsyncThunk('setselectuser', async (userData, { rejectWithValue }) => {
    try {
        // You can add any async logic here if needed
        // For example, validate the user data before setting
        if (!userData || !userData._id) {
            throw new Error("Invalid user data");
        }

        // If no async operations needed, just return the data
        return userData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

export const Chat = createSlice({
    name: "Chat",
    initialState: {
        chat: [],
        messages: [],
        selectuser: null,
        loading: false,
        error: null,
    },
    // reducers: {
    //     // Add this reducer to handle setting the selected user
    //     setselectuser: (state, action) => {
    //         state.selectuser = action.payload;
    //     }
    // },
    extraReducers: (builder) => {
        builder
            .addCase(showUSer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showUSer.fulfilled, (state, action) => {
                state.loading = false;
                state.chat = action.payload; // Store the fetched users
            })
            .addCase(showUSer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message
            })
            .addCase(getmessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getmessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload; // Store the fetched users
            })
            .addCase(getmessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store the error message
            })
            .addCase(setselectuser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setselectuser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("setselectuser.fulfilled called with:", action.payload);
                if (state.selectuser?._id !== action.payload._id) {
                    console.log("Updating selectuser state:", action.payload);
                    state.selectuser = action.payload;
                    state.messages = []; // Clear messages when user changes
                } else {
                    console.log("No change in selectuser state, skipping update.");
                }
            })
            .addCase(setselectuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default Chat.reducer;