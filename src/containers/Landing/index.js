import React, { useState } from "react";
import { Title, Hero } from "./components/layout";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { NavLink } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase/auth";
import { useFormik } from "formik";


const Landing = () => {
  // States for registering
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const formik = useFormik({
    initialValues: {
      email: undefined,
      password: undefined,
    },
    validate: (values) => {
      const errors = {}
      if (!values.email) {
        errors.email = "Email is required"
      }
      if (!values.password) {
        errors.password = "Password is required"
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      // Registering a new user
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, "user created");
          // navigate("/login")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });

      // User logging in with existing credentials 
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user, "user logging in")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      // Getting users email
      const user = auth.currentUser
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const email = user.email;
          console.log(email, "<- users email")
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    }
  });



  return (
    <>
      <Card
        sx={{
          position: "absolute",
          width: 500,
          height: 700,
          top: 100,
          left: 250,
          boxShadow: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "50%",
            flexDirection: "column",
            p: 5,
            boxSizing: "border-box",
            justifyContent: "space-between",
          }}
        >
          {/* Sign in Feature */}
          <Typography
            sx={{ py: 2, fontSize: "h5.fontSize", fontFamily: "Pacifico" }}
          >
            Sign In
          </Typography>
          <TextField
            type="email"
            label="Email"
            required
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            required
            value={formik.values.password}
            onChange={(e) => formik.setFieldValue("password", e.target.value)}
          />
          <Typography>
            <a href="#">Forgot Password?</a>
          </Typography>
          <Button variant="contained" onClick={formik.handleSubmit}>Login</Button>
        </Box>

        {/* Register Feature */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            p: 4,
          }}
        >
          <TextField
            type="email"
            label="Email address"
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
            // required
            placeholder="Email address"
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            type="password"
            label="Create password"
            value={formik.values.password}
            onChange={(e) => formik.setFieldValue("password", e.target.value)}
            // required
            placeholder="Password"
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
        </Box>
        <Box
          sx={{
            height: "20%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 12,
          }}
        >
          <Typography sx={{ fontSize: "h5.fontSize", fontFamily: "Pacifico" }}>
            Don't have an account?
          </Typography>
          <Button sx={{ width: "100%" }} variant="contained" onClick={formik.handleSubmit}>
            Register
          </Button>
        </Box>
      </Card>

      <Grid container rowSpacing={12}>
        <Grid item xs={12} sx={gridstyles}>
          <Title title="Locals" />
        </Grid>
        <Grid item xs={12} sx={gridstyles}>
          <Hero
            title="Tour your Destination"
            subtext="Get a local guide to show you their favorite spots"
            bgImage="test1.jpg"
            orientation="right"
          />
        </Grid>
        <Grid item xs={12} sx={gridstyles}>
          <Hero
            title="Become a Local Guide"
            subtext="connect with travellers in your home town"
            bgImage="test2.jpg"
            orientation="left"
          />
        </Grid>
      </Grid>
    </>
  )
};

const gridstyles = {
  height: `100vh`,
  display: `flex`,
  justifyContent: `center`,
  flexDirection: `column`,
};

export default Landing;
