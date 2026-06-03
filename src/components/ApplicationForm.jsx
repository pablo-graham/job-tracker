// Demos controlled form state, validation, events and state updates
import { useState } from "react"

// ========= Add Job Application =========
const initialFormState = {
  company: "",
  role: "",
  status: "Applied",
  location: "",
  dateApplied: "",
}


function ApplicationForm({ onAddApplication }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  // validation will be done in the utils/validation.js
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

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onAddApplication({
      id: crypto.randomUUID(),
      ...formData,
    })

    setFormData(initialFormState)
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Job Application</h2>

      <label>
        Company
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </label>
      {errors.company && <p className="error">{errors.company}</p>}

      <label>
        Role
        <input name="role" value={formData.role} onChange={handleChange} />
      </label>
      {errors.role && <p className="error">{errors.role}</p>}

      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </label>

      <label>
        Location
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>

      <label>
        Date Applied
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
        />
      </label>
      {errors.dateApplied && <p className="error">{errors.dateApplied}</p>}

      <button type="submit">Add Application</button>
    </form>
  )
}

export default ApplicationForm