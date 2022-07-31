import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";

export const CustomizedBox = ({title, value,icon, iconColor, children,...rest}) => {
    console.log(iconColor)
return(
    <Card
      sx={{ height: '100%' }}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              {title}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: iconColor,
                height: 56,
                width: 56
              }}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  )}