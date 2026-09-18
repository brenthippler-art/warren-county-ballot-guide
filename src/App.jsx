import { useState } from "react";
import { lookupBallot } from "./lib/gis.js";
import { DATA } from "./data.js";
import RaceRow, { LevelLabel } from "./components/RaceRow.jsx";
import ElectionDates from "./components/ElectionDates.jsx";
import VoterPrep from "./components/VoterPrep.jsx";

import logoWcd from "./assets/logo-wcd.webp";
import flagUs from "./assets/flag-us.webp";
import flagKy from "./assets/flag-ky.webp";
import sealWarrenCounty from "./assets/seal-warren-county.webp";
import sealBowlingGreen from "./assets/seal-bowling-green.webp";
import sealPlumSprings from "./assets/seal-plum-springs.webp";
import bgisd from "./assets/Bowling_Green_Independent_KY_Logo.png"

export default function App() {
  const [view, setView] = useState("ballot"); // 'ballot' | 'dates' | 'prep'
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState({ msg: "", kind: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSearch() {
    const trimmed = address.trim();
    if (!trimmed) {
      setStatus({ msg: "Enter an address first.", kind: "err" });
      return;
    }

    setLoading(true);
    setResult(null);
    setStatus({ msg: "Looking up your address…", kind: "" });

    try {
      const ballot = await lookupBallot(trimmed);
      setStatus({ msg: "", kind: "" });
      setResult(ballot);
    } catch (err) {
      setStatus({
        msg: err.message || "Something went wrong looking that up.",
        kind: "err",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <>
      <header className="top">
        <div className="wrap" style={{ padding: 0 }}>
          <img className="logo" src={logoWcd} alt="Warren County Democrats" />
          <p className="eyebrow">
            Warren County, Kentucky · General Election, Nov 3 2026
          </p>
          {view === "ballot" ? (
            <>
              <h1>Find your ballot, district by district.</h1>
              <p className="sub">
                Enter your home address to see your U.S. Senate, U.S. House,
                state legislature, county magistrate, and city commission races
                — with candidates endorsed by the Warren County Democratic Party
                where noted.
              </p>
            </>
          ) : view === "dates" ? (
            <>
              <h1>Key dates to vote.</h1>
              <p className="sub">
                Deadlines and voting windows for the November 3, 2026 general
                election, from the Kentucky State Board of Elections.
              </p>
            </>
          ) : (
            <>
              <h1>Get ready to vote.</h1>
              <p className="sub">
                Register, confirm your polling place, and know what ID to bring
                — everything you need to do before Election Day.
              </p>
            </>
          )}
          <nav className="tabs">
            <button
              className={`tab ${view === "ballot" ? "active" : ""}`}
              onClick={() => setView("ballot")}
            >
              Find My Ballot
            </button>
            <button
              className={`tab ${view === "dates" ? "active" : ""}`}
              onClick={() => setView("dates")}
            >
              Election Dates
            </button>
            <button
              className={`tab ${view === "prep" ? "active" : ""}`}
              onClick={() => setView("prep")}
            >
              Voter Prep
            </button>
          </nav>
        </div>
      </header>

      <div className="wrap">
        {view === "dates" ? (
          <ElectionDates />
        ) : view === "prep" ? (
          <VoterPrep />
        ) : (
          <>
            <div className="card search-card">
              <label htmlFor="addr">Home address</label>
              <div className="search-row">
                <input
                  type="text"
                  id="addr"
                  placeholder="e.g. 1141 State St, Bowling Green, KY"
                  autoComplete="off"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="primary"
                  disabled={loading}
                  onClick={handleSearch}
                >
                  Find my ballot
                </button>
              </div>
              <p className="hint">
                Address is only used in your browser to query Warren County's
                public GIS services — nothing is stored or sent anywhere else.
              </p>
              {status.msg && (
                <p className={`status show ${status.kind}`}>{status.msg}</p>
              )}
            </div>

            {result && (
              <div className="results show">
                <div className="found-addr">
                  <span>Matched address</span>
                  {result.matched}
                </div>

                <div className="card" style={{ padding: "0 24px" }}>
                  <RaceRow
                    level="Federal"
                    office={DATA.senate.office}
                    pick={DATA.senate}
                    icon={flagUs}
                  />
                  <RaceRow
                    level="Federal"
                    office={DATA.usHouse.office}
                    pick={DATA.usHouse}
                    icon={flagUs}
                  />

                  {result.houseDist ? (
                    <RaceRow
                      level="State"
                      office={`Kentucky House, District ${result.houseDist}`}
                      pick={DATA.stateHouse[result.houseDist]}
                      note="Kentucky General Assembly"
                      icon={flagKy}
                    />
                  ) : (
                    <RaceRow
                      level="State"
                      office="Kentucky House of Representatives"
                      pick={null}
                      note="Couldn't determine your house district."
                      icon={flagKy}
                    />
                  )}

                  {result.senateDist ? (
                    <RaceRow
                      level="State"
                      office={`Kentucky Senate, District ${result.senateDist}`}
                      pick={DATA.stateSenate[result.senateDist]}
                      note="Kentucky General Assembly"
                      icon={flagKy}
                    />
                  ) : (
                    <RaceRow
                      level="State"
                      office="Kentucky Senate"
                      pick={null}
                      note="Couldn't determine your senate district."
                      icon={flagKy}
                    />
                  )}

                  {result.magDist ? (
                    <RaceRow
                      level="County"
                      office={`Magistrate, District ${result.magDist}`}
                      pick={DATA.magistrate[result.magDist]}
                      note="Warren County Fiscal Court"
                      icon={sealWarrenCounty}
                      circular
                    />
                  ) : (
                    <RaceRow
                      level="County"
                      office="Magistrate"
                      pick={null}
                      note="Couldn't determine your magistrate district."
                      icon={sealWarrenCounty}
                      circular
                    />
                  )}

                  {result.inCity ? (
                    DATA.cityCommission.length ? (
                      DATA.cityCommission.map((c, i) => (
                        <RaceRow
                          key={i}
                          level="City"
                          office="Bowling Green City Commission"
                          pick={c}
                          note="While voters can choose up to four candidates, we recommend only voting for these three endorsed candidates."
                          icon={sealBowlingGreen}
                          circular
                        />
                      ))
                    ) : (
                      <RaceRow
                        level="City"
                        office="Bowling Green City Commission"
                        pick={null}
                        note="At-large race — same candidates for every address in city limits."
                        icon={sealBowlingGreen}
                        circular
                      />
                    )
                  ) : (
                    <div className="race">
                      <LevelLabel
                        text="City"
                        icon={sealBowlingGreen}
                        circular
                      />
                      <div>
                        <p className="office">Bowling Green City Commission</p>
                        <p className="no-endorsement">
                          Your address is outside Bowling Green city limits, so
                          this race isn't on your ballot.
                        </p>
                      </div>
                    </div>
                  )}

                  {result.smallCity &&
                    result.smallCity.toLowerCase() === "plum springs" &&
                    (DATA.plumSpringsCommission.length ? (
                      DATA.plumSpringsCommission.map((c, i) => (
                        <RaceRow
                          key={i}
                          level="City"
                          office="Plum Springs City Commission"
                          pick={c}
                          icon={sealPlumSprings}
                          circular
                        />
                      ))
                    ) : (
                      <RaceRow
                        level="City"
                        office="Plum Springs City Commission"
                        pick={null}
                        note="At-large race — same candidates for every address in Plum Springs city limits."
                        icon={sealPlumSprings}
                        circular
                      />
                    ))}

                  {result.schoolDist === "0" && (
                    <RaceRow
                      level="School"
                      office="BGISD Board of Education"
                      pick={DATA.schoolBoard["0"]}
                      note="Bowling Green Independent Schools — single at-large seat."
                      icon={bgisd}
                      circular
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}

        <footer>
          District boundaries and geocoding come from the City-County Planning
          Commission, City of Bowling Green, and Commonwealth of Kentucky public
          GIS services. Candidates marked "WCDP Endorsed" are endorsed by the{" "}
          <strong>Warren County Democratic Party</strong> — this is not official
          ballot information. Confirm your registration and sample ballot at{" "}
          <a
            href="https://vrsws.sos.ky.gov/ovrweb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            govote.ky.gov
          </a>
          .
        </footer>
      </div>
    </>
  );
}
