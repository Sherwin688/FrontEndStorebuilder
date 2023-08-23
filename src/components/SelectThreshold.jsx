import { Box, Button, TextField } from "@shopify/polaris"
import React, { useCallback, useState } from 'react'
import { useDispatch } from "react-redux";
import { actions } from "../store";

const SelectThreshold = () => {
    const [value, setValue] = useState(1);
    const dispatch = useDispatch()

    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );

    const setThreshold = () => {
        if (value === "") {
            dispatch(actions.setThreshold(0))
        }
        else {
            dispatch(actions.setThreshold(value))
        }
        dispatch(actions.setState("products_list"))
    }
    return (
        <Box padding={6} width="40%">
            <TextField
                requiredIndicator
                label="Set Threshold Limit"
                type="number"
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
            <Box padding={6}>
                <Button onClick={setThreshold} primary fullWidth>Save</Button>
            </Box>
        </Box>
    )
}

export default SelectThreshold