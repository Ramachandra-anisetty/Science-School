<div
      class="gs-modal-backdrop"
      id="eventDetailsModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edmodalTitle"
    >
      <div class="gs-modal">
        <div class="gs-modal-head">
          <span class="edmodal-category" id="edmodalCategory"></span>
          <h3 class="edmodal-title" id="edmodalTitle"></h3>
          <button
            class="gs-modal-close"
            id="edmodalClose"
            aria-label="Close event details"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div class="edmodal-body">
          <p class="edmodal-description" id="edmodalDescription"></p>

          <div class="edmodal-row">
            <div class="edmodal-field">
              <span class="edmodal-field-label">Venue</span>
              <span class="edmodal-field-value" id="edmodalVenue"></span>
            </div>
            <div class="edmodal-field">
              <span class="edmodal-field-label">Location</span>
              <span class="edmodal-field-value" id="edmodalLocation"></span>
            </div>
          </div>

          <div class="edmodal-row">
            <div class="edmodal-field">
              <span class="edmodal-field-label">Start Date</span>
              <span class="edmodal-field-value" id="edmodalStart"></span>
            </div>
            <div class="edmodal-field">
              <span class="edmodal-field-label">End Date</span>
              <span class="edmodal-field-value" id="edmodalEnd"></span>
            </div>
          </div>

          <div class="edmodal-row edmodal-row-3">
            <div class="edmodal-field">
              <span class="edmodal-field-label">Contact Person</span>
              <span class="edmodal-field-value" id="edmodalContactPerson"></span>
            </div>
            <div class="edmodal-field">
              <span class="edmodal-field-label">Contact Number</span>
              <span class="edmodal-field-value" id="edmodalContactNumber"></span>
            </div>
            <div class="edmodal-field">
              <span class="edmodal-field-label">School</span>
              <span class="edmodal-field-value" id="edmodalSchool"></span>
            </div>
          </div>
        </div>
        <div class="edmodal-footer">
          <button class="edmodal-btn edmodal-btn-outline" id="edmodalCloseBtn" type="button">
            Close
          </button>
          <a
            class="edmodal-btn edmodal-btn-solid cmodal-open-trigger"
            id="edmodalRegisterBtn"
            href="#"
            role="button"
            aria-haspopup="dialog"
          >
            Register Here
          </a>
        </div>
      </div>
    </div>
