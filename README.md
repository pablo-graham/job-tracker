# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Basic React

* Function Components:
    * `function Dashboard()`:
        * Function component: `Dashboard` is the main page component that controls the job tracker UI.
    * `function ApplicationCard({ application })`:
        * Function component using props to render one job application card.
    * `function ApplicationForm({ onAddApplication })`:
        * Function component that manages form input state and sends valid data to the parent component.
    * `function SearchBar({ searchTerm, onSearchChange })`:
        * Function component that renders the search input and communicates input changes to the parent.
    * `function StatusFilter({ selectedStatus, onStatusChange })`:
        * Function component that renders filter buttons for each job application status.
    * `function Pagination({ currentPage, totalPages, onPageChange })`:
        * Function component that renders previous/next pagination controls.

* JSX:
    * React lets us describe the UI structure using HTML-like syntax inside JavaScript.
    * `Dashboard`:
        ```jsx
        return (
          <main>
        ```
        * This JSX describes the main page layout.
    * `ApplicationCard`:
        ```jsx
        return (
          <article className="card">
        ```
        * This JSX describes how one job application card should appear.
    * `ApplicationForm`:
        ```jsx
        return (
          <form onSubmit={handleSubmit} className="form">
        ```
        * This JSX describes the form UI and connects the form submit event to React logic.

* Props:
    * Props allow a parent component to pass data or functions into a child component.
    * `ApplicationCard`:
        ```jsx
        function ApplicationCard({ application }) {
        ```
        * This component receives application data from the parent instead of owning that data itself.
    * `Dashboard`:
        ```jsx
        <ApplicationCard
          key={application.id}
          application={application}
        />
        ```
        * `Dashboard` passes each job application object into `ApplicationCard`.
    * `SearchBar`:
        ```jsx
        function SearchBar({ searchTerm, onSearchChange }) {
        ```
        * `searchTerm` controls the input value, and `onSearchChange` lets the child notify the parent when the input changes.
    * `ApplicationForm`:
        ```jsx
        function ApplicationForm({ onAddApplication }) {
        ```
        * `onAddApplication` is a callback passed from `Dashboard` so the form can add a new application to the parent state.
    * `StatusFilter`:
        ```jsx
        function StatusFilter({ selectedStatus, onStatusChange }) {
        ```
        * `selectedStatus` tells the component which filter is active, and `onStatusChange` updates the parent state when a button is clicked.
    * `Pagination`:
        ```jsx
        function Pagination({ currentPage, totalPages, onPageChange }) {
        ```
        * Pagination receives the current page, total pages, and a callback for changing pages.

* State:
    * State stores values that can change over time and cause the UI to rerender.
    * `Dashboard` owns shared state needed by multiple child components:
        ```jsx
        const [applications, setApplications] = useState(mockApplications)
        const [searchTerm, setSearchTerm] = useState("")
        const [selectedStatus, setSelectedStatus] = useState("All")
        const [currentPage, setCurrentPage] = useState(1)
        ```
        * `applications`: stores the job application list.
        * `searchTerm`: stores the current search input.
        * `selectedStatus`: stores the active status filter.
        * `currentPage`: stores the current pagination page.
    * `ApplicationForm` owns local form state:
        ```jsx
        const [formData, setFormData] = useState(initialFormState)
        const [errors, setErrors] = useState({})
        ```
        * `formData`: stores the controlled form input values.
        * `errors`: stores validation messages.
        * This state is colocated inside `ApplicationForm` because other components do not need direct access to every keystroke.

* Rendering:
    * React renders UI based on the current component state and props.
    * `Dashboard` renders the list of applications:
        ```jsx
        visibleApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
          />
        ))
        ```
        * Each application object is rendered as one `ApplicationCard`.

* List Rendering:
    * `Dashboard` uses `.map()` to render multiple job cards:
        ```jsx
        visibleApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
          />
        ))
        ```
        * The `key` helps React identify each list item efficiently during reconciliation.
    * `StatusFilter` uses `.map()` to render the filter buttons:
        ```jsx
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={selectedStatus === status ? "active" : ""}
          >
            {status}
          </button>
        ))}
        ```
        * This avoids manually writing a button for each status.

* Conditional Rendering:
    * `Dashboard` conditionally renders either job cards or an empty message:
        ```jsx
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
        ```
        * If there are matching applications, cards are shown.
        * If there are no matches, an empty-state message is shown.
    * `Pagination` hides itself when pagination is unnecessary:
        ```jsx
        if (totalPages <= 1) {
          return null
        }
        ```
        * Returning `null` tells React to render nothing for this component.

* Event Handling:
    * React uses event handlers like `onChange`, `onClick`, and `onSubmit` to respond to user interaction.
    * `SearchBar` handles typing:
        ```jsx
        onChange={(event) => onSearchChange(event.target.value)}
        ```
        * When the user types, the new value is sent to `Dashboard`.
    * `StatusFilter` handles filter button clicks:
        ```jsx
        onClick={() => onStatusChange(status)}
        ```
        * Clicking a status button updates the active filter.
    * `ApplicationForm` handles form submission:
        ```jsx
        <form onSubmit={handleSubmit} className="form">
        ```
        * React handles the submit event instead of letting the browser reload the page.
    * `Pagination` handles page changes:
        ```jsx
        onClick={() => onPageChange(currentPage + 1)}
        ```
        * Clicking next updates the current page in the parent component.

* Controlled Components:
    * Controlled components keep form values in React state.
    * `ApplicationForm` company input:
        ```jsx
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        ```
        * The input value comes from `formData.company`.
        * User input updates React state through `handleChange`.
    * `SearchBar` input:
        ```jsx
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by company or role"
        />
        ```
        * The search input is controlled by state stored in `Dashboard`.

* Form Validation:
    * `ApplicationForm` validates required fields before adding a new job application.
    * Validation function:
        ```jsx
        function validateForm() {
          const newErrors = {}

          if (!formData.company.trim()) {
            newErrors.company = "Company is required."
          }

          if (!formData.role.trim()) {
            newErrors.role = "Role is required."
          }

          if (!formData.dateApplied) {
            newErrors.dateApplied = "Date applied is required."
          }

          return newErrors
        }
        ```
        * This checks whether the user filled out the required fields.
    * Validation guard:
        ```jsx
        if (Object.keys(validationErrors).length > 0) {
          return
        }
        ```
        * This prevents invalid form data from being submitted.
    * Error rendering:
        ```jsx
        {errors.company && <p className="error">{errors.company}</p>}
        ```
        * The error message only appears when the field has an error.

* State Design:
    * State is colocated when only one component needs it.
    * State is lifted when multiple components need access to it.
    * Derived values are calculated instead of stored as extra state.
    * Colocated state in `ApplicationForm`:
        ```jsx
        const [formData, setFormData] = useState(initialFormState)
        const [errors, setErrors] = useState({})
        ```
        * The form owns its input values and validation errors because no other component needs them while the user is typing.
    * Lifted state in `Dashboard`:
        ```jsx
        const [applications, setApplications] = useState(mockApplications)
        ```
        * Applications live in `Dashboard` because the form, filters, pagination, and list all depend on this data.
    * Parent-child communication:
        ```jsx
        <ApplicationForm onAddApplication={addApplication} />
        ```
        * `Dashboard` passes a callback so `ApplicationForm` can update lifted state.
    * Avoiding unnecessary state:
        ```jsx
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
        ```
        * `filteredApplications` is derived from existing state, so it is calculated with `useMemo` instead of stored in another `useState`.
    * Paginated visible data:
        ```jsx
        const visibleApplications = useMemo(() => {
          const startIndex = (currentPage - 1) * APPLICATIONS_PER_PAGE
          const endIndex = startIndex + APPLICATIONS_PER_PAGE

          return filteredApplications.slice(startIndex, endIndex)
        }, [filteredApplications, currentPage])
        ```
        * `visibleApplications` is also derived data, so it is memoized instead of stored as duplicate state.

* React Hooks:
    * `useState`:
        ```jsx
        const [applications, setApplications] = useState(mockApplications)
        ```
        * `useState` stores data that can change and cause the UI to rerender.
    * `useMemo`:
        ```jsx
        const filteredApplications = useMemo(() => {
          ...
        }, [applications, searchTerm, selectedStatus])
        ```
        * `useMemo` prevents recalculating filtered results unless one of its dependencies changes.
    * `useMemo` dependency array:
        ```jsx
        }, [applications, searchTerm, selectedStatus])
        ```
        * The dependency array includes every value used inside the memoized calculation.
    * Functional state update:
        ```jsx
        setApplications((currentApplications) => [
          newApplication,
          ...currentApplications,
        ])
        ```
        * This safely uses the previous state when adding a new application.
    * Functional form update:
        ```jsx
        setFormData((currentFormData) => ({
          ...currentFormData,
          [name]: value,
        }))
        ```
        * This preserves the existing form fields while updating only the changed field.

* Virtual DOM and Reconciliation:
    * React handles the Virtual DOM and reconciliation internally.
    * State update:
        ```jsx
        setApplications((currentApplications) => [
          newApplication,
          ...currentApplications,
        ])
        ```
        * When this state changes, React creates a new virtual UI tree and compares it with the previous one.
    * List key:
        ```jsx
        key={application.id}
        ```
        * The `key` helps React match list items between renders so it can update the real DOM efficiently.

* Performance Optimizations:
    * Memoized filtering:
        ```jsx
        const filteredApplications = useMemo(() => {
          ...
        }, [applications, searchTerm, selectedStatus])
        ```
        * Filtering is memoized so it does not rerun unless the application list, search term, or selected status changes.
    * Memoized pagination:
        ```jsx
        const visibleApplications = useMemo(() => {
          ...
        }, [filteredApplications, currentPage])
        ```
        * Pagination slicing is memoized so visible results are only recalculated when filtered data or the current page changes.
    * Pagination:
        ```jsx
        const totalPages = Math.ceil(filteredApplications.length / APPLICATIONS_PER_PAGE)
        ```
        * The app avoids rendering every item at once by showing a limited number of applications per page.