import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const showUSer = createAsyncThunk('showUser ', async (args, { rejectWithValue }) => {
    const token = Cookies.get('socket');
    if (!token) {
        return rejectWithValue("No token found");
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_SEVER_BASEURL}/api/message/users`, {
            // credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            method: 'GET'
        });

        // Check if the response is okay
        if (!response.ok) {
            const errorResult = await response.json(); // Get the error response
            console.error("Error response:", errorResult);
            return rejectWithValue(errorResult.message || "Failed to fetch users");
        }

        const result = await response.json();
        // console.log("Response body:", result);
        return result;
    } catch (error) {
        console.error("Fetch error:", error);
        return rejectWithValue("Network error or other issue");
    }
});

export const getmessage = createAsyncThunk('getmessage', async (data, { rejectWithValue }) => {
    const token = Cookies.get('socket')
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_SEVER_BASEURL}/api/message/${data._id}`, {
        // credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: 'GET'
    });

    try {
        const result = await response.json();
        if (result.length === 0) {
            console.log("No messages found for this user.");
            return null;
        } else {
            // console.log("Messages found:", result);
            return result;
        }
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const Sendmessages = createAsyncThunk('Sendmessages', async (text, { rejectWithValue, getState }) => {
    // Access the selectuser from the Redux state
    // console.log("Message the user wants to send is :", text)
    const state = getState();
    const selecteduser = state.app.selectuser?._id; // Ensure selectuser is not null
    // console.log("SendMessage ID:", selecteduser);

    if (!selecteduser) {
        return rejectWithValue("No user selected");
    }

    const token = Cookies.get('socket');

    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_SEVER_BASEURL}/api/message/send/${selecteduser}`, {
            method: 'POST', // Assuming you want to send a message
            // credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text }) // Send the message in the body
        });

        if (!response.ok) {
            const errorResult = await response.json();
            console.error("Error response:", errorResult);
            return rejectWithValue(errorResult.message || "Failed to send message");
        }

        const result = await response.json();
        console.log("Message sent successfully:", result);
        return result; // Return the result if needed
    } catch (error) {
        console.error("Fetch error:", error);
        return rejectWithValue("Network error or other issue");
    }
});

export const setselectuser = createAsyncThunk('setselectuser', async (userData, { rejectWithValue }) => {
    try {
        // You can add any async logic here if needed
        // For example, validate the user data before setting
        // if (!userData || !userData._id) {
        //     throw new Error("Invalid user data");
        // }

        // If no async operations needed, just return the data
        return userData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

export const UserMatchForMessage = createAsyncThunk('UserMatchForMessage', async (User, { rejectWithValue }) => {
    return User;
})

export const Chat = createSlice({
    name: "Chat",
    initialState: {
        chat: [],
        messages: [],
        userformessage: JSON.parse(localStorage.getItem('userformessage')) || null, // Load from local storage
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
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload); // Add the new message to the messages array
        },
    },
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
                // console.log("setselectuser.fulfilled called with:", action.payload);
                // Directly set selectuser to the action payload
                state.selectuser = action.payload; // This can be null
                state.messages = []; // Clear messages when user changes
            })
            .addCase(setselectuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(Sendmessages.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(Sendmessages.fulfilled, (state, action) => {
                // state.loading = false;
                // console.log("Message sent successfully:", action.payload);
                // Optionally, you can update the messages state or perform other actions
                // For example, you might want to add the new message to the messages array
                state.messages.push(action.payload); // Assuming the payload contains the sent message
            })
            .addCase(Sendmessages.rejected, (state, action) => {
                // state.loading = false;
                state.error = action.payload; // Store the error message
            })
            .addCase(UserMatchForMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UserMatchForMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.userformessage = action.payload; // This can be null
                // Save userformessage to local storage
                localStorage.setItem('userformessage', JSON.stringify(action.payload));
            })
            .addCase(UserMatchForMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})
export const { addMessage } = Chat.actions; // Export the addMessage action

export default Chat.reducer;