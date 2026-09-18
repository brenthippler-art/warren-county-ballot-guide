// ---------------------------------------------------------------
// VOTER PREP
// Source: Kentucky State Board of Elections / ourpeopleourvote.org
// Update these each cycle.
// ---------------------------------------------------------------

export const PREP_STEPS = [
  {
    title: 'Register or update your registration',
    note: 'Confirm your registration is current, especially if you moved or changed your name.',
    url: 'https://vrsws.sos.ky.gov/ovrweb',
    linkLabel: 'Register to vote',
  },
  {
    title: 'Check your registration status',
    note: 'Look yourself up to confirm you are registered and see your assigned precinct.',
    url: 'https://vrsws.sos.ky.gov/VIC',
    linkLabel: 'Check your status',
  },
  {
    title: 'Check your absentee ballot status',
    note: "If you requested a mail-in ballot, confirm it was received and counted.",
    url: 'https://vrsws.sos.ky.gov/VIC',
    linkLabel: 'Check ballot status',
  },
  {
    title: 'Find your polling place',
    note: 'Early voting and Election Day locations can differ — look up both.',
    url: 'https://warrencountyclerk.ky.gov/services/elections/polling-locations/',
    linkLabel: 'Find your polling place',
  },
  {
    title: 'Contact your county clerk',
    note: 'For registration questions, absentee applications, or anything else specific to Warren County.',
    url: 'https://warrencountyclerk.ky.gov/',
    linkLabel: 'Find your county clerk',
  },
  {
    title: 'Request a ride to the polls',
    note: 'Free rides are available if transportation is a barrier to voting.',
    url: 'https://rideshare2voteaware.org/request-a-ride/',
    linkLabel: 'Request a ride',
  },
  {
    title: 'Volunteer to work the polls',
    note: 'Election officers are needed every cycle — a paid, one-day civic role open to most registered voters.',
    url: 'https://www.powerthepolls.org/OPOV',
    linkLabel: 'Sign up to work the polls',
  },
];

export const ID_INFO = {
  accepted: [
    'A Kentucky driver\u2019s license (expired is still valid)',
    'A U.S. or Kentucky government-issued ID',
    'A military ID (U.S. Armed Forces, Merchant Marines, or KY National Guard)',
    'A student ID from a U.S. college, university, or postgraduate school',
    'An ID from a Kentucky city, county, or urban-county government',
  ],
};
