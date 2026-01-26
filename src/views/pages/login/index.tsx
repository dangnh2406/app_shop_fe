'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  useTheme
} from '@mui/material'
import { NextPage } from 'next'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/components/text-field'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import * as yup from 'yup'
import { MdVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import { log } from 'console'

type TProps = {}

type TDefaultValues = {
  email: string
  password: string
}

const LoginPage: NextPage<TProps> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isRememberMe, setIsRememberMe] = useState(true)

  const { login } = useAuth()

  const theme = useTheme()
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required').matches(EMAIL_REG, 'Email is not valid'),
    password: yup.string().required('Password is required').matches(PASSWORD_REG, 'Password is not valid')
  })

  const defaultValues: TDefaultValues = {
    email: '',
    password: ''
  }

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    login({ ...data, rememberMe: isRememberMe })
    console.log('data', data, errors)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: 4
      }}
    >
      <Box
        display={{
          md: 'flex',
          xs: 'none'
        }}
        sx={{
          justifyContent: 'center',
          borderRadius: '20px',
          backgroundColor: theme.palette.customColors.bodyBg,
          height: '100%',
          minWidth: '50vw'
        }}
      >
        <Image
          src={theme.palette.mode === 'light' ? LoginLight : LoginDark}
          alt='login-light'
          style={{ height: 'auto', width: 'auto' }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <form autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 2 }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email Address'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoFocus
                    error={!!errors.email}
                    placeholder='Input your email address'
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
                name='email'
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Password'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Input your password'
                    helperText={errors.password ? errors.password.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='password'
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={
                  <Checkbox value='remember' color='primary' onChange={e => setIsRememberMe(e.target.checked)} />
                }
                label='Remember me'
              />
              <Link href='#'>Forgot password?</Link>
            </Box>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Sign In
            </Button>

            <Grid container sx={{ mt: 4 }}>
              <Grid item xs>
                <Typography>Don't have an account?</Typography>
              </Grid>
              <Grid item>
                <Link href='/register'>{'Register'}</Link>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>
  )
}
export default LoginPage
