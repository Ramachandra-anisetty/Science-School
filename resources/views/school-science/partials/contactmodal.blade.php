<div
      class="gs-modal-backdrop"
      id="contactModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmodalTitle"
    >
      <div class="gs-modal">
        <div class="gs-modal-head">
          <div class="cmodal-head-tag">
            <span></span>Admissions &amp; Enquiry
          </div>
          <div class="cmodal-title" id="cmodalTitle">Talk to Our Team</div>
          <div class="cmodal-sub">
            We'll get back to you within 24 hours — no spam, ever.
          </div>
          <button
            class="gs-modal-close"
            id="cmodalClose"
            aria-label="Close contact form"
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
        <div class="cmodal-body">
          <form id="cmodalForm" novalidate>
            <div class="cmodal-row">
              <div class="cmodal-field">
                <label for="cm-name">Full Name *</label>
                <input
                  type="text"
                  id="cm-name"
                  placeholder="Your full name"
                  required
                  autocomplete="name"
                />
              </div>
              <div class="cmodal-field">
                <label for="cm-phone">Mobile Number *</label>
                <input
                  type="tel"
                  id="cm-phone"
                  placeholder="+91 00000 00000"
                  required
                  autocomplete="tel"
                />
              </div>
            </div>
            <div class="cmodal-field">
              <label for="cm-email">Email Address *</label>
              <input
                type="email"
                id="cm-email"
                placeholder="you@email.com"
                required
                autocomplete="email"
              />
            </div>
            <div class="cmodal-row">
              <div class="cmodal-field">
                <label for="cm-campus">Preferred Campus</label>
                <select id="cm-campus">
                  <option value="">Any campus</option>
                  <option>Visakhapatnam</option>
                  <option>Hyderabad</option>
                  <option>Bengaluru</option>
                </select>
              </div>
              <div class="cmodal-field">
                <label for="cm-level">Level of Study</label>
                <select id="cm-level">
                  <option value="">Select level</option>
                  <option>Undergraduate (UG)</option>
                  <option>Postgraduate (PG)</option>
                  <option>Ph.D / Research</option>
                </select>
              </div>
            </div>
            <div class="cmodal-field">
              <label for="cm-msg">Your Question (optional)</label>
              <textarea
                id="cm-msg"
                rows="3"
                placeholder="Tell us what you'd like to know…"
              ></textarea>
            </div>
            <button type="submit" class="cmodal-submit">
              Send Enquiry
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
            <p class="cmodal-footer-note">
              Or call us directly:
              <a href="tel:18004252428">1800-425-2428</a> (Toll-free)
              &nbsp;|&nbsp;
              <a href="mailto:admissions@gitam.edu">admissions@gitam.edu</a>
            </p>
          </form>
          <div class="cmodal-success" id="cmodalSuccess">
            <div class="cmodal-success-icon">✅</div>
            <h3>We've got your message!</h3>
            <p>
              Our admissions team will reach out within 24 hours.<br />Check
              your inbox for a confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
