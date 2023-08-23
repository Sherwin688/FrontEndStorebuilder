import React from 'react'
import {Box, Frame, Navigation} from '@shopify/polaris';
import { SettingsMinor, HomeMinor} from '@shopify/polaris-icons';
import { useDispatch } from "react-redux";
import { actions } from "../store";
const SideBar = () => {
  const dispatch = useDispatch()
  return (
    <Box>
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '/',
              label: 'Home',
              icon: HomeMinor,
              excludePaths: ['#'],
              onClick:()=>dispatch(actions.setState("select_threshold"))

            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Settings',
              icon: SettingsMinor,
              onClick:()=>{
                dispatch(actions.setState("products_list"))
                dispatch(actions.setThreshold(0))
              }
            },
          ]}
        />
      </Navigation>
    </Frame>
    </Box>

  )
}

export default SideBar