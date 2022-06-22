# Filters

This is a quick guide for Developers on how to work with the sites filters

## Filters functions

This function **getSites** under the path **app/utils/propertyValidation.js**, this receive 5 parameters

1. customersList
1. selectedStatus
1. selectedCustomers
1. selectedAreas
1. selectedSites

This is a data sample of the customersList

    [
        {
            "customerId": 96,
            "companyName": "Faith Investments",
            "areas": [
                {
                    "areaName": "Not Defined",
                    "locations": [
                        {
                            "locationId": 1506,
                            "locationName": "EnTech R&D Neenah",
                            "assets": [
                                {
                                    "siteId": 9785,
                                    "externalIcianId": "ryan.boersma@faithtechinc.com",
                                    "name": "R&D Xcape UAT R3",
                                    "icianName": "Ryan Boersma",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 1267,
                                        "addressLine1": "225 Main ST",
                                        "addressLine2": null,
                                        "city": "Menasha",
                                        "state": "WI",
                                        "postalCode": 54952,
                                        "latitude": "44.2008699",
                                        "longitude": "-88.4472779"
                                    }
                                }
                            ]
                        },
                        {
                            "locationId": 580,
                            "locationName": "Info Model Test Site - D-Series",
                            "assets": [
                                {
                                    "siteId": 9782,
                                    "externalIcianId": "chris.kohrmann@faithtechinc.com",
                                    "name": "Asset for Info Model Test Site - D-Series",
                                    "icianName": "Chris Kohrmann",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 348,
                                        "addressLine1": "123 Any Street",
                                        "addressLine2": null,
                                        "city": "Menasha",
                                        "state": "WI",
                                        "postalCode": 54952,
                                        "latitude": "44.2022084",
                                        "longitude": "-88.44649729999999"
                                    }
                                }
                            ]
                        },
                        {
                            "locationId": 581,
                            "locationName": "Info Model Test Site - Xcape",
                            "assets": [
                                {
                                    "siteId": 9769,
                                    "externalIcianId": "harry.ayers@faithtechinc.com",
                                    "name": "Xcape Microgrid",
                                    "icianName": "Harry Ayers",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 349,
                                        "addressLine1": "225-A Main Street",
                                        "addressLine2": null,
                                        "city": "Menasha",
                                        "state": "WI",
                                        "postalCode": 54952,
                                        "latitude": "44.2008699",
                                        "longitude": "-88.4472779"
                                    }
                                }
                            ]
                        },
                        {
                            "locationId": 572,
                            "locationName": "Lakeside",
                            "assets": [
                                {
                                    "siteId": 9771,
                                    "externalIcianId": "lakeflysupport@faithtechinc.com",
                                    "name": "DSeries (20) Microgrid - Lakeside",
                                    "icianName": "Matt Bergmann",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 1262,
                                        "addressLine1": "123 Any street",
                                        "addressLine2": null,
                                        "city": "Menasha",
                                        "state": "WI",
                                        "postalCode": 54596,
                                        "latitude": "44.2022084",
                                        "longitude": "-88.44649729999999"
                                    }
                                }
                            ]
                        },
                        {
                            "locationId": 1500,
                            "locationName": "Lakeside_UAT2",
                            "assets": [
                                {
                                    "siteId": 9772,
                                    "externalIcianId": "lakeflysupport@faithtechinc.com",
                                    "name": "DSeries (20) Microgrid - Lakeside UAT2",
                                    "icianName": "Matt Bergmann",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 1255,
                                        "addressLine1": "321 elm street",
                                        "addressLine2": null,
                                        "city": "anytown",
                                        "state": "WI",
                                        "postalCode": 12345,
                                        "latitude": "43.7844397",
                                        "longitude": "-88.7878678"
                                    }
                                }
                            ]
                        },
                        {
                            "locationId": 1501,
                            "locationName": "Dustin is #1",
                            "assets": [
                                {
                                    "siteId": 9774,
                                    "externalIcianId": "lakeflysupport@faithtechinc.com",
                                    "name": "DSeries (20) Microgrid",
                                    "icianName": "Matt Bergmann",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 1264,
                                        "addressLine1": "212 Main St",
                                        "addressLine2": null,
                                        "city": "Menasha",
                                        "state": "WI",
                                        "postalCode": 54956,
                                        "latitude": "44.2013582",
                                        "longitude": "-88.44776999999999"
                                    }
                                }
                            ]
                        },
                        {
                            "locationId": 1503,
                            "locationName": "Middleton_UAT",
                            "assets": [
                                {
                                    "siteId": 9775,
                                    "externalIcianId": "cody.hoffman@faithtechinc.com",
                                    "name": "DSeries (20) Microgrid - Middleton",
                                    "icianName": "Cody Hoffman",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 1265,
                                        "addressLine1": "338 Stone Valley Rd",
                                        "addressLine2": null,
                                        "city": "Middleton",
                                        "state": "WI",
                                        "postalCode": 53528,
                                        "latitude": "43.1296049",
                                        "longitude": "-89.62924529999999"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "areaName": "Mid-West",
                    "locations": [
                        {
                            "locationId": 1504,
                            "locationName": "Release 3 UAT Site - Xcape",
                            "assets": [
                                {
                                    "siteId": 9783,
                                    "externalIcianId": "ryan.boersma@faithtechinc.com",
                                    "name": "Release 3 UAT Asset - Xcape",
                                    "icianName": "Ryan Boersma",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": null
                                },
                                {
                                    "siteId": 9436,
                                    "externalIcianId": "ryan.boersma@faithtechinc.com",
                                    "name": "Xcape Test Asset #2 for Joel",
                                    "icianName": "Ryan Boersma",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": null
                                }
                            ]
                        }
                    ]
                },
                {
                    "areaName": "West",
                    "locations": [
                        {
                            "locationId": 1499,
                            "locationName": "Lakeside_UAT",
                            "assets": [
                                {
                                    "siteId": 9773,
                                    "externalIcianId": "lakeflysupport@faithtechinc.com",
                                    "name": "DSeries (20) Microgrid-Lakeside UAT",
                                    "icianName": "Matt Bergmann",
                                    "siteType": null,
                                    "live": true,
                                    "siteStatus": null,
                                    "siteStatusSymbolName": null,
                                    "siteCommStatus": null,
                                    "siteCommStatusSymbolName": null,
                                    "islandMode": null,
                                    "address": {
                                        "addressId": 1263,
                                        "addressLine1": "225 Main St",
                                        "addressLine2": null,
                                        "city": "Menasha",
                                        "state": "WI",
                                        "postalCode": 54952,
                                        "latitude": "44.2008699",
                                        "longitude": "-88.4472779"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    ]

The customerList is the main array that contains all the information about the customers, areas and sites, selected selectedStatus, selectedCustomers, selectedAreas and selectedSites are arrays that contain what are the selected options in the dropdowns.

In this function a iteration is done, starting with the customersList and will check against the selectedCustomers to verify it one or more customers are selected if so then it will iterate inside of the area array and will do the same proces until it reaches the sites array

This function returns four arrays

1. formattedSitesList
1. customersOptions
1. areasOptions
1. sitesOptions

The formattedSitesList is the array that contains only the sites based on the filtering done with the selected customes, areas and sites. The customersOptions, areasOptions and sitesOptions are the options that will be used on the dropdown for the filters since this are dynamic values.

The function **getFilteredSites** located on the path **app/store/Sites/selectors.js** receives as parameter the state of the application

Inside of this function the **getSites** function will be called based on the values from the state of the application, in the state of the application, there is an object called **filters** and from there we can access to the **status**, **customer**, **area**, **location** array that will be send to the **getSites** function

In the function **getFilteredSites** there is also some logic to handle the filtering by text and by assigned user, this function will return four arrays **filteredSites**, **customerScopeOptions**, **areasScopeOptions**, **sitesScopeOptions**.
**filteredSites** is formatted site list, this info will be used to display the information in the cards and the other arrays are for the dropdown options

In the component **SitesDashboard** with the **app/containers/SitesPage/Dashboard/index.js** path, is where we obtain the the info from the global state **filteredSites**,**customerScopeOptions**,**areasScopeOptions**, **sitesScopeOptions**, and this is passed via props to the component **SitesStatusListPanel**, and that info will be used to display the cards and the info in the select dropdowns

The component **SitesDashboard** has a function **handleSelectChange** that will trigger **filterData** and this function will identify which select dropwown was clicked and will trigger a disptach function that will update the redux state, and basically it will trigger the **getFilteredSites** funciton in the path **app/store/Sites/selectors.js**, and will follow the same process of filtering but now with the updated info from the redux state
