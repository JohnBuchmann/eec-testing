# DCentriq Web App
This repository contains the source code for the DCentriQ React Web Application.

# Setup

1. Install [NodeJS](https://nodejs.org/en/) (pick the one labeled as "Recommended For Most Users")

1. Clone repository

1. Go to repository folder

1. Run `npm install`

1. After instalation is complete, run `npm run start`

    1. If running application in a brand new runtime session, it will take some time for it to boot

1. After that, go to `localhost:3000`

# Pointing the application to other environments

1. Open file `config.js`

1. Modify value of `domainName` variable to the desired one:
    1. https://qaweb.tapi7.dcentriq.energybyentech.com
    1. https://uatweb.tapi7.dcentriq.energybyentech.com 

# Important Notes

1. Okta is the IAM platform to this app
    1. User login is managed through [Okta's Javascript widget](https://github.com/okta/okta-auth-js#api-reference), which handles authentication workflows (i.e. *Okta's **embedded authentication**) out of the box
    1. Further reading:
        1. https://developer.okta.com/docs/guides/auth-js/main/#handle-responses
        1. https://developer.okta.com/docs/guides/sign-into-spa-redirect/react/main/#use-the-access-token

1. Data from customers comes from Salesforce Service Cloud APIs, but this is transparent to the frontend

1. Application has charting capabilities and uses [D3.js](https://d3js.org/) for such feature

1. Application shows few map views across screens, which are rendered through Google Maps APIs

1. Application architecture was setup referencing [ReactBoilerplate](https://github.com/react-boilerplate/react-boilerplate) project

1. Application uses [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) for unit testing

1. Application has built in code to generate PDF files and Excel exports, both done with 3rd party [npm packages](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm)

1. Application uses [Axios](https://www.npmjs.com/package/axios) for handling HTTP requests

1. Application uses [MaterialUI](https://mui.com/getting-started/installation/) to build the layout components and styles

# Tools 

1. [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) (Chrome Only)

1. [Redux Developer Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) (Chrome Only)

