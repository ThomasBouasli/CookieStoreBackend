import { useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import * as PS from '../../Styles/pages';
import * as S from './styles';

import Button from '../../Components/Button';
import useBackend from '../../Hooks/useBackend';

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { LogIn } = useBackend();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    await LogIn(data.get('email') as string, data.get('password') as string);
  }

  return (
    <PS.Page>
      <PS.Title>Log In</PS.Title>
      <S.Wrapper>
        <S.FormWrapper onSubmit={handleSubmit}>
          <TextField variant="standard" label="email" name="email" />
          <TextField
            name="password"
            label="Password"
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button text="Log In" type="submit" />
        </S.FormWrapper>
      </S.Wrapper>
    </PS.Page>
  );
}
