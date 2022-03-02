import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

/**
 * @description Custom Media Query in Array
 * @returns {OBJECT}
 */
const CustomMediaQuery = () => {

  const theme = useTheme();
  
  const mq = {
    xs: useMediaQuery(theme.breakpoints.only('xs')), // extra-small: 0px
    sm: useMediaQuery(theme.breakpoints.only('sm')), // small: 600px
    md: useMediaQuery(theme.breakpoints.only('md')), // medium: 900px
    lg: useMediaQuery(theme.breakpoints.only('lg')), // large: 1200px
    xl: useMediaQuery(theme.breakpoints.only('xl')), // extra-large: 1536px
  }

  return {
    in: (lst, opt='or') => {
      if(!lst) return false;
      lst = typeof(lst) === 'string' ? [lst] : lst;
      lst = lst.map((x) => mq[x]);
      return opt==='or' ? lst.reduce( (p, c) => p || c, false )
                        : lst.reduce( (p, c) => p && c, true );
    },
    on: (bp) => {
      return mq[bp] || false; 
    },
    up: (bp) => {
      return theme.breakpoints.up(bp);
    },
    down: (bp) => {
      return theme.breakpoints.down(bp);
    },
    not: (bp) => {
      return theme.breakpoints.not(bp);
    },
    between: (bpIn, bpOut) => {
      return theme.breakpoints.between(bpIn, bpOut);
    }
  };
};

export default CustomMediaQuery;

/**
 * From: https://mui.com/customization/breakpoints/
 * Ex:  const mq.in = CustomMediaQuery();
 *      <span hidden={mq.in(['xs', 'lg'])}> VA </span>
 */