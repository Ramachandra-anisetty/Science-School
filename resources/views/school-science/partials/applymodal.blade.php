<div
      class="apply-modal-backdrop"
      id="applyModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="applyModalTitle"
    >
      <div class="apply-modal-card">
        <div class="apply-modal-header">
          <h2 class="apply-modal-title" id="applyModalTitle">GAT 2026</h2>
          <button
            class="apply-modal-close"
            id="applyModalClose"
            aria-label="Close application form"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="apply-modal-body">
          <div class="apply-modal-toggles">
            <div class="apply-toggle-group">
              <span class="apply-toggle-label active" id="toggleIndianLabel">Indian</span>
              <button type="button" class="apply-switch" id="toggleNationalitySwitch" role="switch" aria-checked="false" aria-label="Toggle Indian or Foreign">
                <span class="apply-switch-knob"></span>
              </button>
              <span class="apply-toggle-label" id="toggleForeignLabel">Foreign</span>
            </div>
            <div class="apply-toggle-group">
              <span class="apply-toggle-label" id="toggleLoginLabel">Login</span>
              <button type="button" class="apply-switch active" id="toggleAuthSwitch" role="switch" aria-checked="true" aria-label="Toggle Login or Register">
                <span class="apply-switch-knob"></span>
              </button>
              <span class="apply-toggle-label active" id="toggleRegisterLabel">Register</span>
            </div>
          </div>

          <form id="applyModalForm" novalidate>
            <div class="apply-form-field">
              <input type="text" id="gat-name" placeholder="Enter Applicant Name *" required />
            </div>

            <div class="apply-form-field">
              <input type="email" id="gat-email" placeholder="Enter Email Address *" required />
            </div>

            <div class="apply-form-row phone-row">
              <div class="apply-code-select-wrap">
                <select id="gat-country-code" class="apply-select">
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+971">+971</option>
                  <option value="+65">+65</option>
                </select>
                <span class="apply-select-arrow">▾</span>
              </div>
              <div class="apply-form-field flex-grow">
                <input type="tel" id="gat-phone" placeholder="Enter Mobile Number *" required />
              </div>
            </div>

            <div class="apply-form-field">
              <input type="text" id="gat-otp" placeholder="Enter OTP" />
            </div>

            <div class="apply-form-field select-field" id="gat-state-wrap">
              <select id="gat-state" class="apply-select" required>
                <option value="" disabled selected>Select State *</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Kerala">Kerala</option>
                <option value="Other">Other State</option>
              </select>
              <span class="apply-select-arrow">▾</span>
            </div>

            <div class="apply-form-grid" id="gat-registration-fields">
              <div class="apply-form-field select-field">
                <select id="gat-level" class="apply-select" required>
                  <option value="" disabled selected>Select Level *</option>
                  <option value="ug">Undergraduate</option>
                  <option value="pg">Postgraduate</option>
                  <option value="phd">Ph.D / Research</option>
                </select>
                <span class="apply-select-arrow">▾</span>
              </div>

              <div class="apply-form-field select-field">
                <select id="gat-school" class="apply-select" required>
                  <option value="" disabled selected>Select School *</option>
                  <option value="science">School of Science</option>
                  <option value="technology">School of Technology</option>
                  <option value="business">School of Business</option>
                  <option value="humanities">School of Humanities</option>
                  <option value="pharmacy">School of Pharmacy</option>
                  <option value="law">School of Law</option>
                  <option value="architecture">School of Architecture</option>
                </select>
                <span class="apply-select-arrow">▾</span>
              </div>

              <div class="apply-form-field select-field">
                <select id="gat-campus" class="apply-select" required>
                  <option value="" disabled selected>Select Campus *</option>
                  <option value="visakhapatnam">Visakhapatnam</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="bengaluru">Bengaluru</option>
                </select>
                <span class="apply-select-arrow">▾</span>
              </div>

              <div class="apply-form-field select-field">
                <select id="gat-program" class="apply-select" required>
                  <option value="" disabled selected>Select Program *</option>
                  <option value="bsc-biotech">B.Sc. Biotechnology</option>
                  <option value="bsc-chem">B.Sc. Chemistry</option>
                  <option value="bsc-cs">B.Sc. Computer Science</option>
                  <option value="bsc-physics">B.Sc. Physics</option>
                  <option value="msc-biotech">M.Sc. Biotechnology</option>
                  <option value="msc-chem">M.Sc. Chemistry</option>
                  <option value="msc-datascience">M.Sc. Data Science</option>
                  <option value="msc-physics">M.Sc. Physics</option>
                  <option value="bca">Bachelor of Computer Applications (BCA)</option>
                  <option value="mca">Master of Computer Applications (MCA)</option>
                  <option value="phd-chem">Ph.D. Chemistry</option>
                  <option value="phd-physics">Ph.D. Physics</option>
                </select>
                <span class="apply-select-arrow">▾</span>
              </div>
            </div>

            <div class="apply-consent-wrap">
              <label class="apply-consent-checkbox">
                <input type="checkbox" id="gat-consent" checked required />
                <span class="consent-text">
                  I authorise GITAM (Deemed to be University) &amp; its representatives to contact me with updates and notifications via Email/ SMS/ WhatsApp/ Call. This will override DND/NDNC. *
                </span>
              </label>
            </div>

            <div class="apply-submit-wrap">
              <button type="submit" class="apply-submit-btn">Submit</button>
            </div>
          </form>

          <div class="apply-modal-success" id="applyModalSuccess">
            <div class="apply-modal-success-icon">✓</div>
            <h3 class="apply-modal-success-title">Application Submitted Successfully!</h3>
            <p class="apply-modal-success-text">Thank you for choosing GITAM. Our admissions team will get in touch with you shortly.</p>
          </div>

          <p class="apply-footer-note">
            If you have any queries regarding your admission, please feel free to call us at <strong>8884984000</strong> anytime between 8:00 AM and 9:00 PM.
          </p>
        </div>
      </div>
    </div>
