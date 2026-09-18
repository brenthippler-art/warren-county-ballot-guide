# Warren County Ballot Guide

A React (Vite) rebuild of the address → ballot lookup tool for Warren County
Democrats: enter an address, get U.S. Senate/House, KY House/Senate, county
magistrate, and Bowling Green City Commission races, with Warren County
Democratic Party endorsements where on file.

## Setup

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Project layout

```
src/
  App.jsx              main app: tabs, search box + results, election dates, voter prep
  data.js               <-- edit this file to update endorsements
  electionDates.js      <-- edit this file to update key election dates
  voterPrep.js           <-- edit this file to update the voter prep checklist and ID rules
  index.css             all styles
  lib/gis.js             geocoding + district-lookup calls to county/state GIS services
  components/
    RaceRow.jsx          one race row (level icon, office, endorsed pick or blank state)
    EndorsementSeal.jsx   the gold "WCDP Endorsed" seal icon
    ElectionDates.jsx     Election Dates tab
    VoterPrep.jsx          Voter Prep tab (registration, polling place, ID, hotline)
  assets/
    logo-wcd.webp             header logo
    flag-us.webp               U.S. flag icon (Federal races)
    flag-ky.webp               Kentucky state seal icon (State races)
    seal-warren-county.webp    Warren County seal (Magistrate race)
    seal-bowling-green.webp    Bowling Green seal (City Commission race)
```

## Updating endorsements

Everything you need to change for a new cycle lives in `src/data.js`:

- `senate.pick` / `usHouse.pick` — statewide/federal, shown to everyone
- `stateHouse` / `stateSenate` — keyed by district number as a string, e.g. `"20": { pick: "Name", url: "https://..." }`
- `magistrate` — keyed by magistrate district number
- `cityCommission` — an array, since it's multiple at-large seats

Each pick can include an optional `url` — when present, the candidate's name
links out to their campaign site. Leave an entry out (or set no `pick`) and
that race shows "No endorsement on file yet" instead of a badge.

## Updating election dates and voter prep content

`src/electionDates.js` and `src/voterPrep.js` hold the content for those two
tabs (deadlines, voting windows, ID requirements, hotline). Both are sourced
from the Kentucky State Board of Elections via ourpeopleourvote.org and
should be re-checked each cycle, since dates and rules can change.

## Data sources

District boundaries and geocoding are queried live, client-side, from public
ArcGIS REST services — no backend, no stored address data:

- Address geocoding: Warren County/Bowling Green `CompositeLocator911`
- Magistrate districts: City-County Planning Commission (`CCPC_Magisterial_Voting_Districts`)
- Bowling Green city limits: City of Bowling Green GIS (`BGKY_Bowling_Green_City_Limits`)
- KY House / KY Senate districts: Commonwealth of Kentucky DGI (`Ky_House_Districts_WM`, `Ky_Senate_Districts_WM_gdb`)

If any of these services move, update the corresponding URL constant in
`src/lib/gis.js`.
