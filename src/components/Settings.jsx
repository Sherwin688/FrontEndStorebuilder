import { Box, Button, Text } from "@shopify/polaris"
import React from 'react'
import { useDispatch } from "react-redux"
import { actions } from "../store"

const Settings = () => {
    const dispatch = useDispatch()
    return (
        <Box padding={6}>
            <Box padding={2}>
            <Text variant="heading3xl" as="h2">Settings</Text>
            </Box>
            <Box padding={2}>
                <Button primary onClick={() => dispatch(actions.setState("select_threshold"))}>Set Low Threshold Limit</Button>
            </Box>
        </Box>
    )
}

export default Settings