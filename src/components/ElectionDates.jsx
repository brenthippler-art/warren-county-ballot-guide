import { ELECTION_DATES } from '../electionDates.js';

export default function ElectionDates() {
  return (
    <div className="card dates-card">
      {ELECTION_DATES.map((d, i) => (
        <div className="datestop" key={i}>
          <div className="datestop-date">{d.date}</div>
          <div>
            <p className="datestop-title">{d.title}</p>
            <p className="note">{d.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
