<template>
  <div class="privacy-page">
    <section class="hero-section">
      <div class="container">
        <div class="text-center">
          <h1 class="page-title">Privacy Policy</h1>
          <p class="page-subtitle">Last Updated: January 1, 2026</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="content-card">
              <!-- What information do we collect? -->
              <div class="section-block">
                <h2>What information do we collect?</h2>
                <p>
                  We collect information from you when you request a quote, book a move, contact us,
                  fill out a form, or visit our website.
                </p>
                <p>
                  When booking or interacting with our site, you may be asked to provide your name,
                  email address, phone number, pickup and delivery addresses, and payment
                  information. You may, however, visit our website anonymously.
                </p>
                <p>
                  We may also collect non-personal information such as browser type, IP address,
                  device information, and site usage data through cookies and analytics tools.
                </p>
                <p>
                  Third-party services, including Google, may use cookies to display advertisements
                  based on your visit to our website or other websites. Users may opt out of
                  Google's advertising cookies through Google's ad settings.
                </p>
              </div>

              <!-- What do we use your information for? -->
              <div class="section-block">
                <h2>What do we use your information for?</h2>
                <p>
                  Any of the information we collect from you may be used in one or more of the
                  following ways:
                </p>
                <ul>
                  <li>To personalize your experience</li>
                  <li>To improve our website and services</li>
                  <li>To improve customer service</li>
                  <li>To process transactions and bookings</li>
                  <li>To communicate important updates related to your move</li>
                </ul>
                <p>
                  The email address and phone number you provide may be used to send booking
                  confirmations, service updates, and occasional company information. You may
                  unsubscribe from marketing emails at any time using the link provided in each
                  email or by replying "STOP" to text messages.
                </p>
              </div>

              <!-- How do we protect your information? -->
              <div class="section-block">
                <h2>How do we protect your information?</h2>
                <p>
                  We implement a variety of security measures to maintain the safety of your
                  personal information when you submit or access your data.
                </p>
                <p>
                  All sensitive payment information is transmitted via secure servers and processed
                  through trusted third-party payment providers such as Stripe. Lift & Shift does
                  not store credit card details after a transaction is completed.
                </p>
                <p>Access to personal information is limited to authorized personnel only.</p>
              </div>

              <!-- Do we use cookies? -->
              <div class="section-block">
                <h2>Do we use cookies?</h2>
                <p>
                  Yes. Cookies are small files transferred to your device through your web browser
                  that allow our systems to recognize your browser and remember certain information.
                </p>
                <p><strong>We use cookies to:</strong></p>
                <ul>
                  <li>Understand and save user preferences for future visits</li>
                  <li>Track website traffic and interaction</li>
                  <li>Improve site functionality and performance</li>
                </ul>
                <p>
                  You may disable cookies through your browser settings. Please note that disabling
                  cookies may affect certain features of the website, though you may still contact
                  us directly to book services.
                </p>
              </div>

              <!-- Do we disclose any information to outside parties? -->
              <div class="section-block">
                <h2>Do we disclose any information to outside parties?</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personally identifiable
                  information to outside parties.
                </p>
                <p>
                  This does not include trusted third parties who assist us in operating our
                  website, processing payments, or providing services, provided those parties agree
                  to keep this information confidential.
                </p>
                <p>
                  We may also release information when required by law or to enforce our policies,
                  protect our rights, or ensure safety. Non-personally identifiable information may
                  be shared for marketing, analytics, or advertising purposes.
                </p>
              </div>

              <!-- Third-party links -->
              <div class="section-block">
                <h2>Third-party links</h2>
                <p>
                  Occasionally, we may include links to third-party websites or services. These
                  sites have independent privacy policies, and Lift & Shift is not responsible for
                  the content or practices of these external sites.
                </p>
              </div>

              <!-- California Online Privacy Protection Act Compliance -->
              <div class="section-block">
                <h2>California Online Privacy Protection Act Compliance</h2>
                <p>
                  We value your privacy and comply with the California Online Privacy Protection Act
                  (CalOPPA). We do not distribute your personal information to outside parties
                  without your consent.
                </p>
                <p>
                  Users may request to review, update, or delete their personal information by
                  contacting us directly.
                </p>
              </div>

              <!-- Children's Online Privacy Protection Act Compliance -->
              <div class="section-block">
                <h2>Children's Online Privacy Protection Act Compliance</h2>
                <p>
                  We comply with the requirements of COPPA (Children's Online Privacy Protection
                  Act). We do not knowingly collect information from anyone under the age of 13. Our
                  services are intended for individuals aged 13 or older.
                </p>
              </div>

              <!-- Terms and Conditions -->
              <div class="section-block">
                <h2>Terms and Conditions</h2>
                <p>
                  Please also review our
                  <router-link to="/terms" class="text-orange">Terms of Service</router-link>, which
                  govern the use of our website and services.
                </p>
              </div>

              <!-- Your Consent -->
              <div class="section-block">
                <h2>Your Consent</h2>
                <p>By using our website, you consent to this Privacy Policy.</p>
              </div>

              <!-- Contact Information -->
              <div class="section-block contact-info">
                <h2>CONTACT INFORMATION</h2>
                <p><strong>Lift & Shift LLC</strong></p>
                <ul class="contact-list">
                  <li>
                    <i class="fas fa-phone text-orange"></i>
                    <a href="tel:+18008899788">+1 (800) 889-9788</a>
                  </li>
                  <li>
                    <i class="fas fa-envelope text-orange"></i>
                    <a href="mailto:Contact@liftshiftservices.com">Contact@liftshiftservices.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PrivacyView',
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>

<style scoped>
.privacy-page {
  background: var(--bg-dark);
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, var(--bg-dark) 0%, var(--secondary-dark) 100%);
  padding: 100px 0 60px;
  text-align: center;
}

.page-title {
  color: white;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.page-subtitle {
  color: var(--text-gray);
  font-size: 1.1rem;
}

.content-section {
  padding: 60px 0;
}

.content-card {
  background: var(--secondary-dark);
  border-radius: var(--radius-xl);
  padding: 3rem;
  color: var(--text-light);
  line-height: 1.8;
}

.section-block {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.section-block:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.section-block h2 {
  color: var(--accent-orange);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}

.section-block p {
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

.section-block ul {
  margin: 1rem 0 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.85);
}

.section-block ul li {
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 0.5rem;
}

.text-orange {
  color: var(--accent-orange);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.text-orange:hover {
  opacity: 0.8;
}

.contact-info {
  background: var(--orange-10);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: none;
}

.contact-list {
  list-style: none;
  margin: 1.5rem 0 0 0;
  padding: 0;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.1rem;
  padding-left: 0;
}

.contact-list a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-list a:hover {
  color: var(--accent-orange);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .content-card {
    padding: 2rem 1.5rem;
  }

  .section-block h2 {
    font-size: 1.3rem;
  }
}
</style>
