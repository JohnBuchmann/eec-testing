import { createGlobalStyle } from 'styled-components';

// TODO: Remove this styles after the theme is created
const GlobalStyle = createGlobalStyle`
html, body, #root, #app {
  height: 100%;
  background-color: #edf0f3;
  color: #373a37;
}
html {
  font-size: 100%;
  font-family: Inter, sans-serif !important;
}
h1 {
  font-size: 1.5rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
h3 {
  font-size: 1rem;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.1px;
}
h6 {
  color: #373a37;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
}
p {
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.1px;
}
b, .caption-bold {
  font-size: 0.875rem;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.08px;
}
small, .small-body {
  font-size: 0.875rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal; }
caption, .caption {
  font-size: 0.875rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.08px;
 }
 .timestamp {
  font-size: 0.75rem;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.extra-small-body {
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.MuiIconButton-root:hover {
  background-color: transparent !important;
  opacity: 0.5;
}
`;

export default GlobalStyle;
