<img width="616" alt="Screenshot 2024-03-12 at 9 50 59 AM" src="https://github.com/LuaanNguyen/epics-mern/assets/153343039/dda7458d-1332-4552-b556-0c42acd7fa37">

# EPICS: Online Database for Study Abroad Program
Community Partner: Vietnam Shrimp Farming team, aims to develop and implement a device that will analyze water quality to assist Vietnamese shrimp farmers.

The desired outcomes of this project entail the establishment of a functional, self-updating database to facilitate communication with shrimp farmers and ensure consistent data conversion and updating. The database must support the visualization of critical parameters such as water temperature, pH, oxygen concentration, and salinity over time. 

# Geting Started 
1) Make sure you have the lastest NodeJS installed on your computer. The document can be found at: https://nodejs.org/en
2) Fork and clone the repo on your local computer.
3) In "client", perform `npm i` to install all the necessary packages.
4) Do the same thing in "server"
5) Your developer environment should be good to go. 



## Website Testing
`npm run dev`
access the development environment at `localhost:5173`
edit the file and updates are deployed live to the environment

## Server initalization
`node --env-file=config.env server`
initialize the backend environment at `localhost:5050` (Could be changed in config.env)

## deploying (in progress)
### for vercel 
just push to main, but it might not be deployed immediately.

