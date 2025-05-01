import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the UserState type.
interface UserState {
    id: string | null;
    name: string;
    email: string;
    isAuthenticated: boolean;
}

// This is what the user state should default to initially.
const initialState: UserState = {
    id: null,
    name: "",
    email: "",
    isAuthenticated: false
}

// Create the slice for user data.
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to log in a user.
        login: (state, action: PayloadAction<{
            id: string;
            name: string;
            email: string;
        }>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            //TODO: Actually authenticate this!
            state.isAuthenticated = true;
        },

        // Action to log out the user.
        logout: (state) => {
            state.id = null;
            state.name = "";
            state.email = "";
            state.isAuthenticated = false;
        }
    }
});

// Export the action for this slice and the reducer.
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
