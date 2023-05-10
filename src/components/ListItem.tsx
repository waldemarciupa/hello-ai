import {
  ListItem as MuiListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface ListItemProps {
  pathname: string;
}

const ListItem = ({ pathname }: ListItemProps) => {
  return (
    <MuiListItem divider disableGutters>
      <Link
        href={{
          pathname: `/${pathname}`,
        }}
        style={{ width: '100%' }}
      >
        <ListItemButton>
          <ListItemText primary={pathname} />
        </ListItemButton>
      </Link>
    </MuiListItem>
  );
};

export default ListItem;
