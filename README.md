## Getting Started

There are no setup or installation required for this application. Simply go to the following webpage (insert here) to get started. If you wish to run a local file, click on the clone file button to download a copy of this application.

## UI/UX

Potential users of this site may be people older than 21 years of age. For the younger users on this range, they would likley not have any issues using any kind of interface. However, the older ones may need a foolproof design so that they can navigate the page easier. 

The conceptual design in mind was to create a one page application with checkboxes to indicate which supermarket users wish to look for and by clicking on the map, they are able to plot the location they would like to use as the midpoint. 

## Technologies

API used: Mapbox GL and Foursquare API

Coded using: HTML/CSS with Bootstrap, JavaScript and JQuery

## Features

Opening up the application, users would be greeted by an alert box giving simple instructions on how to use the map. User can either press on the map to plot where they are or click on the icon on the top right of the map to locate where they are. Dismissing the alert window, user will see a one paged webpage with a map, a navbar at the top and an empty results section on the left. 

Users can choose to click on the icon, where the map would locate and zoom into their location. Clicking it again would disable it. They can also choose to click on to the map to plot where they are, a red dot will appear on the place they clicked on. For map plotting, if the user wishes to clear the plot, they can click on to the *clear plot* button to clear the red dot. After which, they can choose the supermarket they wish to look for and press the *search* button.

Clicking the *search button* would locate the nearest supermarket requested within 3 kilometer radius. Users would see the results section filled up with the addresses. 

If the user is done searching, they can click on the *reset map* button to reset the map back to its original state.

## Testing

Testing of the application are done manually. No auto testing are done with this project. 

On opening of the application, the alert window should appear. It functions as inteded. However, the map seems to not load before the alert window pops up. It would be ideal for the map to load so that users can refer as they read the alert window. 

User is able to close alert window and the application would continue loading fully. 

On the map itself, the *search user* icon brings zooms the map to the users location. However clicking it again does not reset it back to preset. Location is fairly accurate. 

Clicking on the map produces the plot. Clicking on other places after plotting, the previous plot clears and a new plot will be produced. 

To clear the plot and reset the map, clicking on the *reset map* will do so. 

On the *select supermarket* dropdown list, the dropdown lists down the four supermarkets that was pre-selected during the planning phase. They are "NTUC Fairprice", "Sheng Siong", "Giant" and "Cold Storage". If user plots their location but do not select the type of supermarket they wish to look for, an alert message will popup telling the user to select a supermarket. 

After plotting and choosing the supermarket, user will need to click on the *search* button. Doing so will let the application start listing down the nearest supermarket within the range set in the code. Markers would also appear on the map. Something that I might have overlooked was assigning marker pop-ups to indicate the addresses. 

Clicking on *reset map* button clears all plots and markers on map.  
