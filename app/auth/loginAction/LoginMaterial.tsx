"use client";
import React, { useActionState } from "react";
import { Button, Link, Stack, TextField } from "@mui/material";
import loginAction from "@/app/auth/loginAction/action/loginAction";
import NextLink from "next/link";

const LoginMaterial = () => {
  const [state, formAction] = useActionState(loginAction, { error: "" });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          error={!!state?.error}
          helperText={state?.error}
          name="email"
          label="Email"
          variant="outlined"
          type="email"
        />
        <TextField
          error={!!state?.error}
          helperText={state?.error}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  );
};

export default LoginMaterial;
