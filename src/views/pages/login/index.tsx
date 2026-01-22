'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Typography } from '@mui/material'
import { NextPage } from 'next'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/components/text-field'
import * as yup from 'yup'

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
  })
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data', data, errors)
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>

      <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextField
                required
                fullWidth
                label='Email Address'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                autoFocus
              />
            )}
            name='email'
          />
          {errors.email && <Typography color='error'>This is required field</Typography>}
        </Box>

        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextField required fullWidth label='Password' onChange={onChange} onBlur={onBlur} value={value} />
            )}
            name='password'
          />
          {errors.password && <Typography color='error'>This is required field</Typography>}
        </Box>

        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />

        <Button type='submit' fullWidth variant='contained' color='primary'>
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href='#'>Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link href='#'>{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
export default LoginPage
