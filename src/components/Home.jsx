
import React from 'react';
import SideBar from "./SideBar";
import {  Frame, HorizontalStack,  } from "@shopify/polaris";
import ProductList from "./ProductList";
import SelectThreshold from "./SelectThreshold";
import { useSelector } from "react-redux";
import Settings from "./Settings";

const Home = () => {
    const state = useSelector((state) => state.current_state)
    const threshold = useSelector((state) => state.threshold);


    return (
        <>
            <Frame>
                <HorizontalStack wrap={false}>
                    <SideBar />
                    {state === "select_threshold" && <SelectThreshold />}
                    {state !== "select_threshold" && threshold === "0" && <Settings />}
                    {state !== "select_threshold" && threshold !== "0" && <ProductList />}
                </HorizontalStack>
            </Frame>
        </>
    );
}

export default Home