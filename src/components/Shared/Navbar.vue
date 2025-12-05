<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
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
              <i class="fas fa-truck-moving"></i> Moving
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
              About
            </a>
            <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
              <li>
                <router-link class="dropdown-item" to="/aboutUs">
                  <i class="fas fa-building"></i> About Us
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/careers">
                  <i class="fas fa-briefcase"></i> Careers
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/contact">
                  <i class="fas fa-envelope"></i> Contact
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="navbar-actions">
          <router-link to="/demo" class="btn btn-primary">
            <i class="fas fa-calculator"></i> Get Quote
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import logoImage from '../../../public/assets/images/logo.png'

export default {
  name: 'Navbar',
  computed: {
    logo() {
      return logoImage
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
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--text-light) !important;
  transition: var(--transition-base);
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
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}

.nav-link:hover {
  color: var(--accent-orange) !important;
  background-color: var(--orange-10);
  transform: translateY(-2px);
}

.nav-link.active {
  color: var(--accent-orange) !important;
  background-color: var(--orange-15);
}

.dropdown-menu {
  background-color: var(--secondary-dark);
  border: 2px solid var(--accent-orange);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  margin-top: var(--gap-md);
  box-shadow: 0 10px 30px var(--black-50);
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
  background-color: var(--orange-10);
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
