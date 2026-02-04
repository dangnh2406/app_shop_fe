// ** Icon Imports
import { TextFieldProps, TextField, styled } from '@mui/material'

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
  return {
    '& .MuiInputLabel-root': {
      transform: 'none',
      lineHeight: 1.2,
      position: 'relative',
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize
    },

    '& .MuiInputBase-root': {
      borderRadius: 8,
      backgroundColor: 'transparent !important',
      border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
      transition: theme.transitions.create(['border-color', 'box-shadow'], {
        duration: theme.transitions.duration.shorter
      }),
      '&:before, &:after': {
        display: 'none'
      }
    },

    '.MuiInputBase-input': {
      padding: '12px 10px'
    },
    '& .MuiFormHelperText-root': {
      lineHeight: 1.2,
      margin: theme.spacing(1, 0, 0),
      fontSize: theme.typography.body2.fontSize,
      '& .Mui-error': {
        color: theme.palette.error.main
      }
    }
  }
})

const CustomTextField = (props: TextFieldProps) => {
  const { size = 'small', InputLabelProps, variant = 'filled', ...rest } = props

  return (
    <TextFieldStyled size={size} variant={variant} InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rest} />
  )
}

export default CustomTextField
