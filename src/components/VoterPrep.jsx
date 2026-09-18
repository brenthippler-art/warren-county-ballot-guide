import { PREP_STEPS, ID_INFO } from '../voterPrep.js';

export default function VoterPrep() {
  return (
    <>
      <div className="card dates-card">
        {PREP_STEPS.map((step, i) => (
          <div className="prep-row" key={i}>
            <div>
              <p className="datestop-title">{step.title}</p>
              <p className="note">{step.note}</p>
            </div>
            <a
              className="prep-link"
              href={step.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {step.linkLabel} →
            </a>
          </div>
        ))}
      </div>

      <div className="card id-card">
        <p className="section-heading">What ID do you need?</p>
        <p className="note" style={{ marginBottom: 16 }}>
          Bring a valid photo ID with your name — accepted forms include:
        </p>
        <ul className="id-list">
          {ID_INFO.accepted.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="section-heading" style={{ marginTop: 24 }}>
          Don't have a valid photo ID?
        </p>
        <p className="note" style={{ marginBottom: 16 }}>
          If you don’t have a valid photo ID, consider getting a free state-issued ID card, which is available for any individual who is at least 18 and doesn’t have a valid driver’s license. To get one, bring a birth certificate, social security card, and proof of residency to your local Circuit Clerk’s office, or to a Kentucky Transportation Cabinet’s Regional Driver Licensing Office.
        </p>
      </div>

      <div className="card hotline-card">
        <p className="section-heading" style={{ color: '#fff' }}>
          Something go wrong at the polls?
        </p>
        <p className="note" style={{ color: 'rgba(246,243,236,0.78)', marginBottom: 14 }}>
          The Election Protection Hotline is a nonpartisan resource for any voting problem.
        </p>
        <a className="hotline-number" href="tel:18666878683">
          1-866-OUR-VOTE Hotline
        </a>
        <br></br>
        <a target="_blank" rel="noopener noreferrer" className="hotline-number" href="https://866ourvote.org/">
          866 OUR VOTE Website
        </a>
      </div>
    </>
  );
}
