import Forgetpassword from "@/components/Forgetpassword";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {},
    signup: {},
    forgetpassword: {}
};

const homepageSlice = createSlice({
    name: "homepageSlice",
    initialState,
    reducers: {

    }
});

export const {} = homepageSlice.actions;
export default homepageSlice.reducer;