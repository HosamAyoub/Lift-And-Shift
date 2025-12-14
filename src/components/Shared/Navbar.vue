<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid px-4">
      <router-link class="navbar-brand" to="/">
        <img :src="logo" alt="Lift & Shift" class="navbar-logo" />
        <!-- <span class="brand-text">Lift & Shift</span> -->
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active">
              <i class="fas fa-home"></i> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/moving" active-class="active">
              <i class="fas fa-truck-fast"></i> Moving
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/storage" active-class="active">
              <i class="fas fa-warehouse"></i> Storage
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/hauling" active-class="active">
              <i class="fas fa-trailer"></i> Hauling
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/demolition" active-class="active">
              <i class="fas fa-person-digging"></i> Demolition
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="aboutDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-chevron-down"></i>
              About
            </a>
            <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
              <li>
                <router-link class="dropdown-item" to="/contact">
                  <i class="fas fa-envelope"></i> Contact
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/careers">
                  <i class="fas fa-briefcase"></i> Careers
                </router-link>
              </li>
              <li>
                <a
                class="dropdown-item"
                href="https://square.link/u/zjA6nWu9"
                target="_blank"
                rel="noopener noreferrer"
                >
                <i class="fas fa-credit-card"></i> Payment
              </a>
              <li>
                <router-link class="dropdown-item" to="/aboutUs">
                  <i class="fas fa-building"></i> About Us
                </router-link>
              </li>
              </li>
            </ul>
          </li>
        </ul>

        <div class="navbar-actions">
          <a class="btn btn-primary btn me-3" href="tel:+18008899788"
            ><i class="fas fa-phone"></i> +1 (800) 889-9788</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    logo() {
      return '/assets/images/logo.png'
    },
  },
}
</script>

<style scoped>
.navbar {
  background: var(--primary-dark);
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--gap-lg) 0;
  transition: var(--transition-base);
  box-shadow: 0 2px 10px var(--black-30);
  animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--text-light) !important;
  transition: var(--transition-base);
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

@keyframes fadeInUp {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.navbar-brand:hover {
  transform: translateY(-2px);
}

.navbar-logo {
  height: 50px;
  width: auto;
}

.brand-text {
  background: var(--accent-orange);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-nav {
  gap: var(--gap-md);
}

.nav-link {
  color: var(--text-light) !important;
  font-weight: 600;
  padding: 10px var(--gap-xl) !important;
  border-radius: var(--radius-md);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--accent-orange);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:nth-child(1) .nav-link {
  animation-delay: 0.3s;
}
.nav-item:nth-child(2) .nav-link {
  animation-delay: 0.4s;
}
.nav-item:nth-child(3) .nav-link {
  animation-delay: 0.5s;
}
.nav-item:nth-child(4) .nav-link {
  animation-delay: 0.6s;
}
.nav-item:nth-child(5) .nav-link {
  animation-delay: 0.7s;
}
.nav-item:nth-child(6) .nav-link {
  animation-delay: 0.8s;
}

.nav-link:hover {
  color: var(--accent-orange) !important;
}

.nav-link:hover::after {
  width: 80%;
}

.nav-link:hover i {
  transform: scale(1.2);
  color: var(--accent-orange);
}

.nav-link i {
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.nav-link.active {
  color: var(--accent-orange) !important;
}

.nav-link.active::after {
  width: 80%;
}

.nav-link.dropdown-toggle::after {
  display: none;
}

.dropdown-menu {
  background-color: var(--secondary-dark);
  /* border: 2px solid var(--accent-orange); */
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  margin-top: var(--gap-md);
  box-shadow: 0 10px 30px var(--black-50);
  animation: dropdownSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  color: var(--text-light);
  padding: var(--gap-md) var(--gap-lg);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.dropdown-item:hover {
  background-color: transparent;
  color: var(--accent-orange);
  transform: translateX(5px);
}

.dropdown-item i {
  width: 20px;
}

.navbar-actions .btn {
  padding: 10px var(--gap-xxl);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  white-space: nowrap;
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
}

.navbar-toggler {
  border-color: var(--accent-orange);
  padding: var(--gap-sm) var(--gap-md);
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.25rem var(--orange-25);
}

.nav-link:focus-visible {
  box-shadow: 0 0 0 0.25rem var(--orange-10);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 107, 53, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Scrolled state */
.navbar.scrolled {
  padding: 10px 0;
  background: var(--black-95);
}

/* Responsive */
@media (max-width: 991px) {
  .navbar-collapse {
    background: var(--secondary-dark);
    padding: var(--gap-xl);
    border-radius: var(--radius-lg);
    margin-top: var(--gap-lg);
  }

  .navbar-nav {
    gap: 5px;
  }

  .nav-link {
    padding: var(--gap-md) var(--gap-lg) !important;
  }

  .dropdown-menu {
    background-color: var(--primary-dark);
    border: none;
    margin-top: 5px;
    margin-left: var(--gap-lg);
  }

  .navbar-actions {
    margin-top: var(--gap-lg);
  }

  .navbar-actions .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .brand-text {
    font-size: 1.2rem;
  }

  .navbar-logo {
    height: 35px;
  }
}
</style>
