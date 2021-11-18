import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import { useTranslation } from 'react-i18next'

import MenuIcon from 'mdi-react/MenuIcon'

export default function Menu() {
  const { t } = useTranslation()
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '0.9rem' }}>
      <AppBar position="static" color="default" >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('home.name')}
          </Typography>
          <IconButton
            aria-haspopup="true"
            onClick={() => console.log('click menu')}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
