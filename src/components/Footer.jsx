import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Polytech Montpellier BDE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer(){
  return(
    <Box sx={{ bgcolor: 'background.paper', p: 6, bottom: 0 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        Vous avez rencontré des problèmes ou avez des suggestions ?
        
        Vous pouvez contacter <Link href='mailto:lucas.nouguier@etu.umontpellier.fr'>Lucas Nouguier</Link> ou <Link href='mailto:jason.moret@etu.umontpellier.fr'>Jason Moret</Link>
        </Typography>
        <Copyright />
      </Box>
  )
}