import { createMuiTheme } from '@material-ui/core';

export const Colors = {
  white: '#ffffff',
  black: '#000000',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  jaggeIce: '#d0eedd',
  surfCrest: '#c8e4c8',
  tiber: '#062c3f',
  mountainMeadow: '#20c161',
  dustyGray: '#959595',
  athensGray: '#f3f6f8',
  affair: '#984ea3',
  bostonBlue: '#377eb8',
  bamboo: '#db6400',
  flushOrange: '#ff7f00',
  fern: '#61b15a',
  goldenFizz: '#ffff33',
  goldenSand: '#f2d974',
  paarl: '#a65628',
  persianPink: '#f781bf',
  dustGray: '#999999',
  silver: '#bfbfbf',
  hokeyPok: '#d8b031',
  havelockBlue: '#6383dd',
  mercury: '#d7dde3',
  lunarGreen: '#373a37',
  lunarGreenAlpha10: '#d6e2e1',
  aquaSqueeze: '#e8f6f4',
  olivine: '#23df78',
  codGray: '#191919',
  goldenDream: '#ebcb39',
  christine: '#f36f13',
  thunderbird: '#c13017',
  pacificBlue: '#0b94bc',
  stJohn: '#285469',
  tarawera: '#063951',
  primaryLight: '#62d390',
  primaryDark: '#179048',
  secondaryLight: '#d2f3df',
  secondaryDark: '#a6e6c0',
  alizarinCrimson: '#db544a',
  rollingStone: '#737578',
  silverSand: '#b4bbbd',
  lynch: '#647f99',
  apple: '#43b542',
  finlandia: '#5a6b5a',
  wildSand: '#f6f6f6',
  flameaPea: '#e02020',
  nandor: '#515e51',
  geyser: '#d6dde4',
  peachYellow: '#faeaa3',
  buccaneer: '#5e2727',
  cancan: '#da96a6',
  cadillac: '#af4a74',
  eucalyptus: '#299d5e',
  alphaWhite: '#fbfbfb',
  gray: '#808080',
  rgbaGray87: 'rgba(0, 0, 0, 0.87)',
  rgbaGray12: 'rgba(0, 0, 0, 0.12)',
  edward: '#abaeae',
  melanie: '#d5abbc',
};

export const FeatTheme = createMuiTheme({
  palette: {
    primary: {
      light: Colors.primaryLight,
      main: `${Colors.mountainMeadow} !important`,
      dark: Colors.primaryDark,
      contrastText: Colors.white,
    },
    error: {
      main: Colors.alizarinCrimson,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: 'Inter, sans-serif !important',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '-0.12px',
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 600,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '-0.1px',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.5',
      letterSpacing: '-0.1px',
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '-0.1px',
      color: Colors.lunarGreen,
    },
    subtitle1: {
      fontSize: '1rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '-0.08px',
      color: Colors.mountainMeadow,
    },
    fontWeightBold: 600,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '2px',
        padding: '0',
      },
      containedPrimary: {
        height: 'auto',
        minHeight: '2.5rem',
        minWidth: '10rem',
        padding: '0',
        '&:hover': {
          backgroundColor: Colors.primaryLight,
        },
        '&:active': {
          backgroundColor: Colors.primaryDark,
        },
        '&: disabled': {
          opacity: 0.2,
        },
      },
      outlinedPrimary: {
        height: 'auto',
        minHeight: '2.5rem',
        minWidth: '10rem',
        padding: '0',
        '&:focus': {
          backgroundColor: Colors.secondaryLight,
        },
        '&:hover': {
          backgroundColor: Colors.secondaryLight,
        },
        '&:active': {
          backgroundColor: Colors.secondaryDark,
        },
        '&: disabled': {
          opacity: 0.2,
        },
      },
      label: {
        padding: '0rem 0.5rem',
      },
    },
    MuiCardContent: {
      root: {
        padding: '12px 16px 16px 16px',
      },
    },
    MuiLink: {
      root: {
        fontSize: '1rem',
      },
      button: {
        color: Colors.mountainMeadow,
        textDecoration: 'underline',
        '&:hover': {
          color: Colors.primaryLight,
        },
        '&:active': {
          color: Colors.primaryDark,
        },
      },
    },
    MuiAccordion: {
      root: {
        backgroundColor: Colors.white,
        border: 0,
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
        marginBottom: '0.5rem',
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: '0 0 0.5rem 0',
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        marginBottom: -1,
        minHeight: '3rem',
        '&$expanded': {
          minHeight: '3rem',
        },
        border: 0,
        padding: '0 1rem 0 .75rem',
      },
      content: {
        '&$expanded': {
          margin: '12px 0',
          border: 0,
        },
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '.5rem 0.875rem 1rem',
      },
    },
    MuiOutlinedInput: {
      root: {
        '&:not(.MuiOutlinedInput-multiline)': {
          height: '2.5rem',
          '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderColor: Colors.silver,
          },
          '&$disabled $notchedOutline': {
            borderColor: Colors.silver,
          },
        },
      },
      notchedOutline: {
        borderColor: Colors.mercury,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '2px',
      },
      adornedStart: {
        paddingLeft: '0.3rem',
      },
      input: {
        padding: '10.5px 14px',
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: Colors.athensGray,
        '&$disabled': {
          backgroundColor: Colors.mercury,
        },
      },
      input: {
        padding: '0 0.75rem 0 0 ',
        color: Colors.lunarGreen,
        fontSize: '0.875rem',
      },
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'Inter, sans-serif',
        fontFize: '0.875rem',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.14,
        letterSpacing: 'normal',
      },
      contained: {
        marginTop: '0.125',
        marginLeft: 0,
        marginRight: 0,
      },
    },
    MuiTabs: {
      root: {
        height: '2.5rem',
        minWidth: ' 0.125rem',
        color: Colors.surfCrest,
      },
      fixed: {
        height: '2.5rem',
        color: Colors.surfCrest,
      },
      indicator: {
        backgroundColor: Colors.mountainMeadow,
      },
    },
    MuiTab: {
      root: {
        '&$selected': {
          color: Colors.mountainMeadow,
        },
      },
    },
    MuiToggleButtonGroup: {
      root: {
        borderRadius: 0,
      },
    },
    MuiToggleButton: {
      root: {
        color: `${Colors.white} !important`,
        border: 0,
        padding: '0',
        width: '2.912rem',
        height: '2.5rem',
        fontSize: '0.875rem',
        borderRadius: 2,
        backgroundColor: `${Colors.silver} !important`,
        '&:hover': {
          backgroundColor: Colors.silver,
        },
        '&$selected': {
          color: Colors.white,
          backgroundColor: `${Colors.mountainMeadow} !important`,
          '&:hover': {
            backgroundColor: Colors.mountainMeadow,
          },
        },
      },
    },
    MuiDialog: {
      paperWidthSm: {
        width: '39rem',
        maxWidth: '39rem',
      },
      paper: {
        margin: 0,
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '1.5rem 2rem 1rem',
        fontFamily: 'Inter !important',
        fontSize: '1.5rem',
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '-0.12px',
        color: Colors.lunarGreen,
        borderBottom: '1px solid',
        borderBottomColor: Colors.mercury,
      },
    },
    MuiDialogContent: {
      root: {
        fontFamily: 'Inter !important',
        padding: '1rem 2rem',
        fontSize: '0.875rem',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '-0.08px',
        color: Colors.lunarGreen,
        minHeight: '5rem',
      },
    },
    MuiDialogActions: {
      root: {
        padding: '1.5rem 2rem',
        fontFamily: 'Inter !important',
      },
    },
    MuiCheckbox: {
      root: {
        color: Colors.silverSand,
        '&$checked': {
          color: Colors.mountainMeadow,
        },
      },
    },
    MuiAvatarGroup: {
      avatar: {
        width: '1.25rem',
        height: '1.25rem',
        fontSize: '0.625rem',
        fontWeight: 'bold',
        letterSpacing: '-0.06px',
        textAlign: 'center',
        backgroundColor: Colors.mountainMeadow,
        marginLeft: '0.25em',
      },
    },
    MuiSelect: {
      outlined: {
        '&.MuiSelect-outlined': {
          paddingRight: '3.312rem',
        },
      },
    },
    MuiListItemAvatar: {
      root: {
        minWidth: '1.25rem',
        paddingRight: '0.75rem',
      },
    },
    MuiInputLabel: {
      outlined: {
        '&.MuiInputLabel-outlined': {
          fontSize: '14px',
          transform: 'translate(14px, 12px) scale(1) !important',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75) !important',
          },
        },
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
      disableElevation: true,
    },
    MuiCheckbox: {
      disableRipple: true,
    },
  },
});
