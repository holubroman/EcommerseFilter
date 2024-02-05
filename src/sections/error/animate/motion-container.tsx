import { m, MotionProps } from 'framer-motion';

import Box, { BoxProps } from '@mui/material/Box';
import { Theme, SxProps } from '@mui/material/styles';

import { varContainer } from './var-container';

type IProps = BoxProps & MotionProps;

export interface Props extends IProps {
  animate?: boolean;
  action?: boolean;
  sx?: SxProps<Theme>;
}

export default function MotionContainer({
  sx,
  animate,
  action = false,
  children,
  ...other
}: Props) {
  if (action) {
    return (
      <Box
        sx={sx}
        component={m.div}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      sx={sx}
      component={m.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
