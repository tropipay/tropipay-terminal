

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

/**
 * @description Custom Media Query in Array
 * @returns {FUNCTION}
 */
const useMediaQueryIn = () => {

  const theme = useTheme();
  
  const mq = {
    xs: useMediaQuery(theme.breakpoints.only('xs')), // extra-small: 0px
    sm: useMediaQuery(theme.breakpoints.only('sm')), // small: 600px
    md: useMediaQuery(theme.breakpoints.only('md')), // medium: 900px
    lg: useMediaQuery(theme.breakpoints.only('lg')), // large: 1200px
    xl: useMediaQuery(theme.breakpoints.only('xl')), // extra-large: 1536px
  }

  function mediaQueryIn(lst, opt='or') {
    if(!lst) return false;
    lst = typeof(lst) === 'string' ? [lst] : lst;
    lst = lst.map((x) => mq[x]);
    return opt==='or' ? lst.reduce( (p, c) => p || c, false )
                      : lst.reduce( (p, c) => p && c, true );
  }

  return mediaQueryIn;
};

export default useMediaQueryIn;

/**
 * Ex:  const mqIn = useMediaQueryIn();
 *      <span hidden={mqIn(['xs', 'lg'])}> VA </span>
 */