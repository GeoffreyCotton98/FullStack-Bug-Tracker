import {
  Paper,
  Box,
  Grid,
  TextField,
  Divider,
  Button,
  Container,
  Typography,
} from "@mui/material";

import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

const theme = createTheme();

export default function Login() {
  const [isFound, setIsFound] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect when logged in
    if (isSuccess || (user && user.role === "Admin")) {
      navigate("/Dashboard/Home");
    }
    if (isSuccess || (user && user.role !== "Admin")) {
      navigate("/Dashboard/MyTickets");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginAdmin = (e) => {
    const userData = {
      email: "DemoAdmin@email.com",
      password: "123456789",
    };

    dispatch(login(userData));
  };

  const loginPM = (e) => {
    const userData = {
      email: "DemoPM@email.com",
      password: "123456789",
    };

    dispatch(login(userData));
  };

  const loginDev = (e) => {
    const userData = {
      email: "DemoDev@email.com",
      password: "123456789",
    };

    dispatch(login(userData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("please fill out all fields");
      return;
    } else {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };

  const handleEasterEgg = () => {
    setIsFound(true);

    toast("Thanks for finding that bug! Ill make a report on that!");
  };

  return (
    <>
      <span className="loginDecor1"></span>
      <span className="loginDecor2"></span>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <Grid container spacing={10}>
            <Grid
              item
              xs={12}
              md={6}
              lg={8}
              sx={{
                p: 2,
                marginTop: 20,
                minHeight: 600,
                minWidth: 500,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="mosura">
                {/* <span
                  onClick={handleEasterEgg}
                  className={`EasterEgg ${isFound ? "isFound" : ""}`}
                >
                  <BugReportOutlinedIcon />
                </span>{" "} */}
                Mosura
              </div>
              <div className="subHeading">Project Management Application</div>

              <div className="demo">Demo Login:</div>
              <div className="demoUser" onClick={loginAdmin}>
                Admin
              </div>
              <div className="demoUser" onClick={loginPM}>
                Project-Manager
              </div>
              <div className="demoUser" onClick={loginDev}>
                Developer
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                elevation={7}
                sx={{
                  marginTop: 30,
                  p: 2,
                  minHeight: 400,
                }}
              >
                <Box
                  sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={email}
                      onChange={onChange}
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      value={password}
                      onChange={onChange}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs={12} sx={{ m: 2 }}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          onClick={() => navigate("/Register")}
                          variant="outlined"
                          sx={{ mt: 1, mb: 1 }}
                        >
                          Register
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
