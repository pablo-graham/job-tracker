// Demos list rendering and event handling
const statuses = ["All", "Applied", "Interviewing", "Offer", "Rejected"]

function StatusFilter({ selectedStatus, onStatusChange }) {
  return (
    <div>
      <p>Filter by status:</p>

      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={selectedStatus === status ? "active" : ""}
        >
          {status}
        </button>
      ))}
    </div>
  )
}

export default StatusFilter