import React from 'react'
import { Typography, Link } from '@material-ui/core'

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <Link color="inherit" href="mailto:johan.strand@appliedtechnology.se">
        Johan Strand
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

export { Copyright }