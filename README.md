# parking-software-realpage
Angular App that allows to register and remove vehicles in a parking lot with different parking spot sizes.

Angular CLI: 9.0.4
Node: 13.1.0

How to run it?

1.Install node.js https://nodejs.org/es/
2.Install angular CLI in the CMD - npm install -g @angular/cli
3.In the CMD go to the project folder and type ng-serve , if for some reason ng is not recognized try with npm run ng-serve.
4.In the browser open localhost:4200

Features.
- The UI shows options to add vehicles, show the next vehicle in queue and different panels and progress bar indicators to see the availability of smalll, medium and large parking spots and the option to remove a random vehicle.
- Data is persisted in the browser's local storage.
- The option Add Vehicle displays a modal panel that allows to choose the vehicle's type and identification.
- Adding the vehicle tries to park the vehicle following the rules.
- There is a button to remove a random vehicle that also looks if there are any vehicles in queue and if there are any it tries to add it to the parking lot.
- The UI is updated inmediately after each interaction.

Rules:
There is a parking lot. 
o There are three types of vehicles:
 Motorcycle
 Sedan
 Truck

 There are three types of parking spaces
o Small
o Medium
o Large
 The vehicles can park in the following spaces
o A motorcycle can part in all spaces, small, medium and large
o A sedan can park only in the medium and large space
o A truck can only park in the large space.
 If the parking lot is full, new vehicles can no longer enter.  They must wait in queue. 
 Vehicles cannot cut in front of other vehicles in the queue
