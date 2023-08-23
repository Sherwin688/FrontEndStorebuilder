import { configureStore, createSlice } from "@reduxjs/toolkit"

const thresholdSlice = createSlice({
    name: "threshold",
    initialState: { threshold: "1",current_state:"select_threshold",alerts:[] },
    reducers: {
        setThreshold(state, action) {
            state.threshold = action.payload.toString()
        },
        setState(state, action) {
            state.current_state = action.payload
        },
        setAlerts(state, action) {
            state.alerts = action.payload
        }
    }
})
export const actions = thresholdSlice.actions
const store = configureStore({
    reducer: thresholdSlice.reducer
})

export default store