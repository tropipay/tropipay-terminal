import {
    createTheme
} from '@material-ui/core/styles';

const theme = createTheme({
    root: {
        width: '98%'
    },
    palette: {
        primary: {
            light: '#6574e2',
            main: '#4a59d9',
            dark: '#4552c9',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fff',
            main: '#fff',
            dark: '#fff',
            contrastText: '#6574e2',
        },
        text: {
            primary: "#39365b",
            secondary: "rgba(57, 54, 91, 0.70)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)"
        },
        background: {
            paper: "#fff",
            default: "#f9f9fC"
        },
        common: {
            black: "#39365b",
            white: "#fff"
        }

    },
    typography: {
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontFamily: 'Roboto',
        color: "#39365b",
        h1: {
            color: "#4a59d9",
            fontSize: '2.8125rem',
        },
        h2: {
            color: "#39365b"
        },
        h3: {
            fontWeight: 300
        },
        h4: {
            color: "#39365b"
        },
        h5: {
            color: "#39365b"
        },
        h6: {
            color: "#39365b",
            fontWeight: 300
        },
        subtitle1: {
            color: "#39365b"
        },
        body2: {
            color: "#39365b"
        },
        body1: {
            color: "#39365b"
        },
        caption: {
            color: "#39365b"
        },
        button: {
            color: "#39365b"
        }
    },
    overrides: {
        MuiOutlinedInput: {
            inputMarginDense: {
                paddingTop: '15px',
                paddingBottom: '15px',
            }
        },
        MuiInputLabel: {
            marginDense: {
                lineHeight: '1.5 !important',
            }
        },
        MuiFormHelperText: {
            root: {
                lineHeight: '1.2em',
                letterSpacing: 0,
            }
        }
    },
});

export default theme;