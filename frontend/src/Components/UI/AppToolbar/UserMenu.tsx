import React, { useState } from 'react';
import { User } from '../../../types';
import {Link} from 'react-router-dom';
import {Button, Menu, MenuItem} from '@mui/material';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link to="/track_history" style={{textDecoration: "none", color: 'black'}}>Track History</Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;