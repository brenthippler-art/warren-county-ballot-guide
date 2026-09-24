// ---------------------------------------------------------------
// CANDIDATE DATA
// Edit this file to update endorsements. Nothing else in the
// project needs to change when candidates/endorsements change.
// ---------------------------------------------------------------

export const DATA = {
  senate: { office: 'U.S. Senate', pick: 'Charles Booker', url: 'https://charlesbooker.org/' },
  usHouse: {
    office: 'U.S. House, District 2',
    pick: 'Megan Wingfield',
    url: 'https://www.wingfieldforcongress.com/',
  },

  // Keyed by Kentucky House/Senate district number (as strings).
  stateHouse: {
    // no recommendations this cycle
  },
  stateSenate: {
    // no recommendations this cycle
  },

  // Keyed by magistrate district number, as returned by Mag_Dist.
  magistrate: {
    '2': {pick: 'Tom Lawrence', url: 'https://www.warrencountyky.gov/departments/fiscal-court/second-district/' },
    '3': { pick: 'Barry Brown', url: 'https://www.barrymbrownformagistrate.com/' },
    '4': { pick: 'Megan Bailey', url: 'https://www.meg4mag.com/' },
  },

  // Keyed by magistrate district number, as returned by Mag_Dist.
  constable: {
    '2': {pick: 'Daniel Alexander', url: ''},
  },

  // County surveyor - all precincts
  countySurveyor: {
    office: 'Warren County Surveyor', pick: 'Barry Claypool', url: '' 
  },  

  // At-large — same for every address inside Bowling Green city limits.
  cityCommission: [
    { pick: 'Dana Beasley-Brown', url: 'https://www.facebook.com/DanaForBG' },
    // TODO: confirm Carlos Bailey's actual site — currently points to Dana's page as given.
    { pick: 'Carlos Bailey', url: 'https://www.facebook.com/BaileyForBG' },
    { pick: 'Tom Morris', url: 'https://www.morrisforbg.com/2026/index.html' },
  ],

  // At-large — same for every address inside Plum Springs city limits.
  plumSpringsCommission: [
    { pick: 'William Dakota Compton', url: 'https://www.facebook.com/Compton4KY2024/' },
  ],

  // BGISD School Board - represented as District 0 in this shared county layer
  schoolBoard: {
    '0': {pick: 'Frank Hampton Moore, Jr.', url: 'https://www.bgreen.kyschools.us/page/board-of-education'},
  },
};
