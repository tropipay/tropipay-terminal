import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from 'mdi-react/AccountCircleIcon';
import { useHistory } from "react-router-dom";

import { useTranslation } from 'react-i18next';

export default function Menu() {
  const { t } = useTranslation()
  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '0.9rem' }}>
      <AppBar position="static" color="default" >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('home.name')}
          </Typography>
          <IconButton
            aria-haspopup="true"
            onClick={() => history.push("/profile")}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
