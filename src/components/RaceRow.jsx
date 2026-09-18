import EndorsementSeal from './EndorsementSeal.jsx';

function LevelLabel({ text, icon, circular }) {
  return (
    <div className="level">
      {icon && (
        <img
          className="level-flag"
          src={icon}
          alt=""
          style={circular ? { borderRadius: '50%' } : undefined}
        />
      )}
      <span>{text}</span>
    </div>
  );
}

export default function RaceRow({ level, office, pick, note, preNote, icon, circular }) {
  const has = pick && pick.pick;
  return (
    <div className="race">
      <LevelLabel text={level} icon={icon} circular={circular} />
      <div>
        <p className="office">{office}</p>
        {preNote && <p className="note pre-note">{preNote}</p>}
        {has ? (
          <div className="pick">
            {pick.url ? (
              <a className="name candidate-link" href={pick.url} target="_blank" rel="noopener noreferrer">
                {pick.pick}
              </a>
            ) : (
              <span className="name">{pick.pick}</span>
            )}
            <span className="badge">
              <span className="badge-seal">
                <EndorsementSeal />
              </span>
              <span className="badge-label">WCDP Endorsed</span>
            </span>
          </div>
        ) : (
          <p className="no-endorsement">No endorsement on file yet.</p>
        )}
        {note && <p className="note">{note}</p>}
      </div>
    </div>
  );
}

export { LevelLabel };
