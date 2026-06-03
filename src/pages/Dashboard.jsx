// Demos multiple React concepts in one page, including state, props, list rendering, conditional rendering, controlled forms, and event handling.
import { useMemo, useState } from "react"
import { mockApplications } from "../data/mockApplications"
import ApplicationCard from "../components/ApplicationCard"
import ApplicationForm from "../components/ApplicationForm"
import SearchBar from "../components/SearchBar"
import StatusFilter from "../components/StatusFilter"
import Pagination from "../components/Pagination"

const APPLICATIONS_PER_PAGE = 2
// Function component: Dashboard is the main page component that controls the job tracker UI.
function Dashboard() {
  const [applications, setApplications] = useState(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  function addApplication(newApplication) {
    setApplications((currentApplications) => [
      newApplication,
      ...currentApplications,
    ])
    setCurrentPage(1)
  }

  function handleSearchChange(value) {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  function handleStatusChange(status) {
    setSelectedStatus(status)
    setCurrentPage(1)
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.role.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        selectedStatus === "All" || application.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [applications, searchTerm, selectedStatus])

  const totalPages = Math.ceil(filteredApplications.length / APPLICATIONS_PER_PAGE)

  const visibleApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * APPLICATIONS_PER_PAGE
    const endIndex = startIndex + APPLICATIONS_PER_PAGE

    return filteredApplications.slice(startIndex, endIndex)
  }, [filteredApplications, currentPage])

  return (
    <main>
      <h1>Job Application Tracker</h1>

      <ApplicationForm onAddApplication={addApplication} />

      <section>
        <h2>Applications</h2>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
        />

        <p>
          Showing {visibleApplications.length} of {filteredApplications.length}{" "}
          applications.
        </p>

        {visibleApplications.length > 0 ? (
          visibleApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
            />
          ))
        ) : (
          <p>No applications match your filters.</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  )
}

export default Dashboard