import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
} from "@mui/material";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { DriveFileRenameOutline, Email, FilterList, Phone } from "@mui/icons-material";
import { useRouter } from "next/router";

export const OperatorListToolbar = (props) => {
  const router = useRouter();

  return (
    <Box {...props}>
      {!props.hideHeader && (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Operators
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Import
            </Button>
            <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Export
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => router.push("/operator/register")}
            >
              Add Operators
            </Button>
          </Box>
        </Box>
      )}
      <Box>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={3} md={3} xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <DriveFileRenameOutline />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Operator Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={3} md={3} xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <Phone />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Phone number"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={3} md={3} xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <Email />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={3} md={3} xs={12}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <Email />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Area"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container marginTop={3} flex flexDirection="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                sx={{ height: "100%", width: 100, fontSize: 14 }}
                endIcon={<FilterList />}
              >
                Filter
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
