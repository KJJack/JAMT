export default function ApplicationInformation({ application }) {
  return (
    <div className="application-information-container">
      <div className="app-info-column">
        <p>Added Date: {application.addedAt}</p>
        <p>Company: {application.company}</p>
        <p>CompanyURL: {application.companyUrl}</p>
        <p>Position: {application.position}</p>
        <p>Location: {application.location}</p>
        <p>
          Source:{" "}
          {application.appSource === 'Other' ? application.custSource : application.appSource}
        </p>
      </div>

      <div className="app-info-column">
        <p>
          Pay:
          {application.salary !== 0
            ? `Salary $${application.salary}`
            : application.hourly !== 0
            ? `Hourly $${application.hourly}`
            : `Negotiable`}
        </p>
        <p>Confidence: {application.confidence}</p>
        <p>Contacted: {application.contaced ? "Yes" : "No"}</p>
        <p>Contact Date: {application.contactedAt}</p>
        <p>Interview Date: {application.interviewDate}</p>
        <p>Language Requirments: {application.prereqs}</p>
      </div>

      <p>Additional Info: {application.description}</p>
    </div>
  );
}
