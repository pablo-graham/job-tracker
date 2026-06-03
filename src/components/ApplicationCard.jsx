// demonstrates a function component and props.

// Function component using props to render one job application card.
function ApplicationCard({ application }) {
  return (
    <article className="card">
      <h3>{application.company}</h3>
      <p>
        <strong>Role:</strong> {application.role}
      </p>
      <p>
        <strong>Status:</strong> {application.status}
      </p>
      <p>
        <strong>Location:</strong> {application.location}
      </p>
      <p>
        <strong>Date Applied:</strong> {application.dateApplied}
      </p>
    </article>
  )
}

export default ApplicationCard