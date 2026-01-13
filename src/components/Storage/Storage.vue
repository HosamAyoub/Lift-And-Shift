<template>
  <!-- 3 Steps Section -->
  <HowItWorksSection />

  <!-- Storage Form Section -->
  <section id="form" class="section section-dark py-5 storage-form-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card-dark shadow-xl">
            <!-- Tab Navigation -->
            <TabNavigation
              :currentTab="currentTab"
              :tabs="tabs"
              :completedTabs="completedTabs"
              @update:tab="handleTabChange"
            />

            <form @submit.prevent="handleSubmit" class="mt-4">
              <!-- Tab 1: Personal Info -->
              <PersonalInfoTab
                v-show="currentTab === 1"
                :formData="formData"
                :fieldErrors="fieldErrors"
                :fieldTouched="fieldTouched"
                :services="storageServices"
                @update:formData="formData = $event"
                @update:fieldErrors="fieldErrors = $event"
                @update:fieldTouched="fieldTouched = $event"
              />

              <!-- Tab 2: Storage Duration & Unit Details -->
              <StorageLocationTab
                v-show="currentTab === 2"
                :formData="formData"
                :fieldErrors="fieldErrors"
                :fieldTouched="fieldTouched"
                :citiesByState="citiesByState"
                @update:formData="formData = $event"
                @update:fieldErrors="fieldErrors = $event"
                @update:fieldTouched="fieldTouched = $event"
              />

              <!-- Tab 3: Additional Information -->
              <StorageAdditionalTab
                v-show="currentTab === 3"
                :formData="formData"
                :uploadedFiles="uploadedFiles"
                :fieldErrors="fieldErrors"
                :fieldTouched="fieldTouched"
                @update:formData="formData = $event"
                @update:uploadedFiles="uploadedFiles = $event"
                @update:fieldErrors="fieldErrors = $event"
                @update:fieldTouched="fieldTouched = $event"
              />

              <!-- Navigation Buttons -->
              <div
                class="d-flex justify-content-between mt-4 pt-4"
                style="border-top: 1px solid var(--orange-10)"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="previousTab"
                  :disabled="currentTab === 1"
                  v-show="currentTab > 1"
                >
                  <i class="fas fa-arrow-left me-2"></i>Previous
                </button>
                <div v-show="currentTab === 1" style="width: 1px"></div>

                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nextTab"
                  v-show="currentTab < 3"
                >
                  Next<i class="fas fa-arrow-right ms-2"></i>
                </button>

                <button
                  type="submit"
                  class="btn btn-primary"
                  v-show="currentTab === 3"
                  :disabled="isSubmitting"
                >
                  <span v-show="!isSubmitting">
                    <i class="fas fa-paper-plane me-2"></i>Reserve Storage Unit
                  </span>
                  <span v-show="isSubmitting">
                    <i class="fas fa-spinner fa-spin me-2"></i>Sending...
                  </span>
                </button>
              </div>

              <!-- Success/Error Message -->
              <div
                v-if="submitMessage"
                class="mt-3 p-3 rounded"
                :class="
                  submitSuccess
                    ? 'bg-success bg-opacity-10 border border-success'
                    : 'bg-danger bg-opacity-10 border border-danger'
                "
              >
                <p class="mb-0" :class="submitSuccess ? 'text-success' : 'text-danger'">
                  <i
                    :class="submitSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"
                  ></i>
                  {{ submitMessage }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Tiers Section -->
  <section class="section section-dark py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">Moving <span class="text-orange">Pricing</span></h2>
        <p class="section-subtitle">No measuring, No hassle.</p>
      </div>

      <div class="row g-4 justify-content-center">
        <!-- 1-Mover Items -->
        <div class="col-lg-12">
          <div
            class="pricing-card"
            :class="{ active: expandedPricing.includes('1-mover') }"
            @click="togglePricing('1-mover')"
          >
            <div class="pricing-header">
              <div class="pricing-icon">
                <i class="fas fa-user"></i>
              </div>
              <div class="pricing-info">
                <h3 class="pricing-title">One Mover Item</h3>
                <p class="pricing-description">
                  Items that can be safely and efficiently handled by one trained mover.
                </p>
              </div>
              <div class="pricing-price">
                <span class="price">$22</span>
                <span class="price-label">Monthly per item</span>
              </div>
              <i class="fas fa-chevron-down pricing-toggle"></i>
            </div>
            <div class="pricing-body" v-show="expandedPricing.includes('1-mover')">
              <div class="pricing-items">
                <div class="item-category">
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Art portfolio, poster tube, picture frame, whiteboard, basket, pillow
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Shoe rack, folding chair, step stool, drying rack, ironing board, broom/Swiffer
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Desk lamp, desk fan, standing fan, small stereo, printer, microwave
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Lacrosse/hockey stick, skateboard, snowboard, violin, guitar
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Dorm/small mirror, small rug, trash can/garbage can
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Laundry basket (empty or full), supply kit box, plastic bin &lt;4 cu ft, box
                    &lt;4 cu ft
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Carry-on suitcase, duffle, camp/IKEA bag
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Nightstand/end table, ottoman, floor lamp, kitchen chair
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Keyboard (music), cooler, golf bag, step ladder
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Mattress pad, desk/task chair, trunk (light), cart, TV (small), computer monitor
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Bicycle, large suitcase, trash bag
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2-Mover Items -->
        <div class="col-lg-12">
          <div
            class="pricing-card"
            :class="{ active: expandedPricing.includes('2-mover') }"
            @click="togglePricing('2-mover')"
          >
            <div class="pricing-header">
              <div class="pricing-icon">
                <i class="fas fa-user-group"></i>
              </div>
              <div class="pricing-info">
                <h3 class="pricing-title">Two Mover Items</h3>
                <p class="pricing-description">
                  Items that require two trained movers for proper handling and control.
                </p>
              </div>
              <div class="pricing-price">
                <span class="price">$44</span>
                <span class="price-label">Monthly per item</span>
              </div>
              <i class="fas fa-chevron-down pricing-toggle"></i>
            </div>
            <div class="pricing-body" v-show="expandedPricing.includes('2-mover')">
              <div class="pricing-items">
                <div class="item-category">
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Mini fridge, water cooler
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Student desk, desk hutch, chest, file cabinet (empty), bookcase, cabinet
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Bed frame (disassembled), queen/full/twin headboard & footboard, box spring (any
                    size), mattress (any size), futon
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Coffee table, end table (heavy), TV stand, large mirror
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Box 4-6 cu ft, box &gt;6 cu ft, large plastic bin &gt;4 cu ft, shelf &gt;4 cu ft
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Kitchen table, non-folding table, reclining chair, armchair
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Couch/sofa, sectional piece (each)
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Dresser (empty)
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Surfboard
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Guitar amp (large/heavy), clothing rack (wide), large rug
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 3-Mover Items -->
        <div class="col-lg-12">
          <div
            class="pricing-card"
            :class="{ active: expandedPricing.includes('3-mover') }"
            @click="togglePricing('3-mover')"
          >
            <div class="pricing-header">
              <div class="pricing-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="pricing-info">
                <h3 class="pricing-title">Three Mover Items</h3>
                <p class="pricing-description">
                  Items that require three trained movers to move safely and smoothly.
                </p>
              </div>
              <div class="pricing-price">
                <span class="price">$55</span>
                <span class="price-label">Monthly per item</span>
              </div>
              <i class="fas fa-chevron-down pricing-toggle"></i>
            </div>
            <div class="pricing-body" v-show="expandedPricing.includes('3-mover')">
              <div class="pricing-items">
                <div class="item-category">
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Sectional pieces that are wide/deep, chaise modules, or any sleeper-sofa section
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Couch/sofa with recliners, sleeper mechanism, or solid wood frame
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Large armoire/wardrobe, tall solid-wood bookcase/cabinet (72"+ or very dense)
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Stone/glass tops (dining table, coffee table, desk) when top stays on or is
                    oversized
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    L-shaped / executive desks, solid-wood student desk with hutch attached
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Dresser that's long/tall solid wood (even empty)
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Large mirror with heavy frame (oversized, fragile)
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Television ~65"+ (especially with narrow stairs or long carry)
                  </p>
                  <p>
                    <i class="fas fa-check text-orange me-2"></i>
                    Kitchen table non-folding, solid wood (6-8 person)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 section-subtitle mt-5 text-center text-white">
          <span class="text-orange">Disclaimer:</span> Mover requirements are subject to change
          based on item weight, stair access, site conditions, and safety factors. A maximum of 50
          lbs per mover applies per item.
        </div>
      </div>
    </div>
  </section>

  <!-- Storage Features with Images -->
  <!-- <section class="section section-darker"> -->
  <!-- <div class="container">
      <div class="row align-items-center g-5 mb-5">
        <div class="col-lg-6">
          <div class="feature-image-wrapper">
            <div class="feature-image-decoration"></div>
            <i class="fas fa-thermometer-half feature-image-icon"></i>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-content">
            <span class="feature-badge">
              <i class="fas fa-snowflake"></i>
              Climate Control
            </span>
            <h2 class="feature-title">
              Temperature & Humidity <span class="text-orange">Controlled</span>
            </h2>
            <p class="feature-description">
              Our climate-controlled units maintain optimal temperature and humidity levels
              year-round, protecting your belongings from extreme weather conditions, moisture
              damage, and mold growth. Perfect for storing furniture, electronics, documents, and
              sensitive items.
            </p>
            <ul class="feature-list">
              <li><i class="fas fa-check"></i> Temperature maintained 55°-85°F</li>
              <li><i class="fas fa-check"></i> Humidity controlled 30%-50%</li>
              <li><i class="fas fa-check"></i> Protection from extreme weather</li>
              <li><i class="fas fa-check"></i> Ideal for valuables & electronics</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row align-items-center g-5 mb-5 flex-lg-row-reverse">
        <div class="col-lg-6">
          <div class="feature-image-wrapper">
            <div class="feature-image-decoration"></div>
            <i class="fas fa-video feature-image-icon"></i>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-content">
            <span class="feature-badge">
              <i class="fas fa-shield-alt"></i>
              Advanced Security
            </span>
            <h2 class="feature-title"><span class="text-orange">24/7</span> Monitored Security</h2>
            <p class="feature-description">
              Your belongings are protected by state-of-the-art security systems including 24/7
              video surveillance, individual unit alarms, electronic gate access, and on-site
              management. Rest easy knowing your items are safe and secure at all times.
            </p>
            <ul class="feature-list">
              <li><i class="fas fa-check"></i> 24/7 HD video surveillance</li>
              <li><i class="fas fa-check"></i> Electronic gate access codes</li>
              <li><i class="fas fa-check"></i> Individual unit alarms</li>
              <li><i class="fas fa-check"></i> Well-lit facilities</li>
            </ul>
          </div>
        </div>
      </div> -->

  <!-- <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <div class="feature-image-wrapper">
            <div class="feature-image-decoration"></div>
            <i class="fas fa-truck-loading feature-image-icon"></i>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-content">
            <span class="feature-badge">
              <i class="fas fa-dolly"></i>
              Easy Access
            </span>
            <h2 class="feature-title">
              Convenient <span class="text-orange">Move-In & Access</span>
            </h2>
            <p class="feature-description">
              Wide driveways, ground-level units, loading docks, and complimentary carts make moving
              in and accessing your storage unit effortless. Choose from 24/7 access or business
              hours based on your needs. We provide everything you need for a smooth storage
              experience.
            </p>
            <ul class="feature-list">
              <li><i class="fas fa-check"></i> Ground-level units available</li>
              <li><i class="fas fa-check"></i> Wide drive-up access</li>
              <li><i class="fas fa-check"></i> Free moving carts & dollies</li>
              <li><i class="fas fa-check"></i> Extended access hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
  <!-- </section> -->

  <div class="container">
    <div class="py-5">
      <!-- <h2 class="text-white mb-4 text-center">Our <span class="text-orange">Services</span></h2> -->
      <div class="row g-4 justify-content-center">
        <div class="col-md-6 col-lg-4" v-for="benefit in benefits" :key="benefit.title">
          <InfoCard :title="benefit.title" :description="benefit.description" />
        </div>
      </div>
    </div>
  </div>

  <!-- FAQ Section -->
  <section class="section section-darker">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">Frequently Asked <span class="text-orange">Questions</span></h2>
        <p class="section-subtitle">Everything you need to know about our storage services</p>
      </div>

      <div class="row g-4">
        <div v-for="(faq, index) in faqs" :key="index" class="col-lg-6">
          <div class="faq-item" :class="{ active: activeFaq === index }">
            <div class="faq-question" @click="toggleFaq(index)">
              <h5>{{ faq.question }}</h5>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer" v-show="activeFaq === index">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PricingTiers from './PricingTiers.vue'
import InfoCard from '../Shared/InfoCard.vue'
import { validators } from '../../utils/validators.js'
import TabNavigation from '../Moving/TabNavigation.vue'
import StorageLocationTab from './StorageLocationTab.vue'
import SharedPageHero from '../Shared/SharedPageHero.vue'
import PersonalInfoTab from '../Moving/PersonalInfoTab.vue'
import HowItWorksSection from './HowItWorksSection.vue'
import StorageAdditionalTab from './StorageAdditionalTab.vue'
import BackgroundSection from '../Shared/BackgroundSection.vue'
import citiesByStateData from '../../../public/assets/JSON/US_CitiesByState.json'

export default {
  name: 'Storage',
  components: {
    InfoCard,
    PricingTiers,
    TabNavigation,
    SharedPageHero,
    PersonalInfoTab,
    BackgroundSection,
    StorageLocationTab,
    HowItWorksSection,
    StorageAdditionalTab,
  },
  data() {
    return {
      citiesByState: citiesByStateData,
      storageServices: [
        { value: 'storage', label: 'Storage Only', icon: 'fas fa-warehouse' },
        { value: 'packing', label: 'Packing Only', icon: 'fas fa-box' },
        { value: 'packing-storage', label: 'Packing & Storage', icon: 'fas fa-boxes' },
      ],
      storageBenefits: [
        {
          icon: 'fas fa-lock',
          title: 'Secure Facilities',
          description:
            '24/7 video surveillance, electronic gate access, and individual unit alarms keep your belongings safe.',
        },
        {
          icon: 'fas fa-temperature-high',
          title: 'Climate Controlled',
          description:
            'Temperature and humidity controlled units protect your items from extreme weather and moisture.',
        },
        {
          icon: 'fas fa-calendar-alt',
          title: 'Flexible Terms',
          description:
            'Month-to-month leases with no long-term commitment. Move in and out on your schedule.',
        },
        {
          icon: 'fas fa-hand-holding-usd',
          title: 'Affordable Rates',
          description:
            'Competitive pricing with various unit sizes to fit your budget and storage needs perfectly.',
        },
      ],
      pricingTiers: [
        {
          title: '5x10',
          icon: 'fas fa-box',
          price: 100,
          size: '5x10 ft',
          description: 'Perfect for seasonal items, sports equipment, or small apartment storage',
          features: [
            'Climate controlled option',
            'Ground floor access',
            '24/7 video surveillance',
            '4 month minimum',
            'Free lock included',
          ],
          featured: false,
        },
        {
          title: '10x10',
          icon: 'fas fa-boxes',
          price: 150,
          size: '10x10 ft',
          description: 'Ideal for 1 bedroom apartment furniture and boxes',
          features: [
            'Climate controlled option',
            'Drive-up access available',
            '24/7 video surveillance',
            '4 month minimum',
            'Free moving cart access',
          ],
          featured: true,
        },
        {
          title: '10x15',
          icon: 'fas fa-warehouse',
          price: 200,
          size: '10x15 ft',
          description: 'Great for 2 bedroom homes with moderate furniture',
          features: [
            'Climate controlled option',
            'Drive-up access',
            'Advanced security system',
            '4 month minimum',
            'Loading dock access',
          ],
          featured: false,
        },
        {
          title: '10x20',
          icon: 'fas fa-warehouse',
          price: 250,
          size: '10x20 ft',
          description: 'Perfect for 3-4 bedroom homes or commercial inventory',
          features: [
            'Climate controlled option',
            'Drive-up access',
            'Advanced security system',
            '4 month minimum',
            'Premium support',
          ],
          featured: false,
        },
      ],
      currentTab: 1,
      completedTabs: [],
      tabs: [
        { id: 1, label: 'Personal Info', icon: 'fas fa-user' },
        { id: 2, label: 'Storage Details', icon: 'fas fa-warehouse' },
        { id: 3, label: 'Additional Info', icon: 'fas fa-clipboard-list' },
      ],
      formData: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        pickupStreet: '',
        pickupState: '',
        pickupCity: '',
        pickupZip: '',
        pickupBuilding: '',
        pickupFloor: '',
        dropoffStreet: '',
        dropoffState: '',
        dropoffCity: '',
        dropoffZip: '',
        moveInDate: '',
        moveInTime: '',
        storageDuration: '',
        numberOfBoxes: '',
        notes: '',
        agreeToPolicy: false,
      },
      uploadedFiles: [],
      fieldErrors: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        pickupStreet: '',
        pickupState: '',
        pickupCity: '',
        pickupZip: '',
        dropoffStreet: '',
        dropoffState: '',
        dropoffCity: '',
        dropoffZip: '',
        moveInDate: '',
        moveInTime: '',
        storageDuration: '',
        agreeToPolicy: '',
      },
      fieldTouched: {
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        pickupStreet: false,
        pickupState: false,
        pickupCity: false,
        pickupZip: false,
        dropoffStreet: false,
        dropoffState: false,
        dropoffCity: false,
        dropoffZip: false,
        moveInDate: false,
        moveInTime: false,
        storageDuration: false,
        agreeToPolicy: false,
      },
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false,
      expandedPricing: [],
      activeFaq: null,
      faqs: [
        {
          question: 'How much does it cost?',
          answer:
            'Pricing is calculated per item, per month and is based on the number of movers required to safely lift and transport each item. Items that can be handled by one mover are priced accordingly, while heavier items that require two or more movers are priced at higher tiers to ensure safe handling for both your belongings and our crews. All items are subject to a minimum four-month storage term. For an estimate of your total cost, please contact our customer service team for assistance.',
        },
        {
          question: 'Can I use Lift & Shift if I am transferring schools?',
          answer:
            'Yes. We can pick up your boxes, store them securely over the summer, and deliver them to your new institution within Texas or Oklahoma when you transfer. Please note that this service is available for boxed items only.',
        },
        {
          question:
            'Will the crew take additional items for storage that were not listed in my order?',
          answer:
            'Yes. Additional items may be accepted for storage if space and crew capacity allow. If you have last-minute items you would like stored, please contact our customer service team with your reference number so your order can be updated. Items not included in the original order are subject to a twenty dollar per item intake fee and must be communicated before the arrival of your moving crew. This allows us to properly plan labor, inventory tracking, and storage allocation.',
        },
        {
          question: 'What should I do if an item is damaged during my move or storage?',
          answer:
            'If you believe an item was damaged, please submit a claim form through the Message Us section on our Contact Us page. A claim must be submitted before calling so our team can review the details and assist you efficiently. Once your claim has been submitted, you may contact Lift and Shift at 1-800-889-9788 for further assistance. Our customer success team will follow up with you to review your claim and discuss next steps. We also reach out after every move to check on your experience and address any additional concerns.',
        },
        {
          question: 'What items cannot be stored?',
          answer:
            'For safety reasons, we cannot store hazardous materials, perishable goods, firearms, ammunition, or illegal items. Please contact us if you are unsure whether an item is eligible for storage.',
        },
        {
          question: 'How far in advance do I need to schedule pickup or delivery?',
          answer:
            'We recommend scheduling pickup and delivery as early as possible to ensure availability. While we do our best to accommodate short-notice requests, scheduling is subject to crew and capacity availability.',
        },
      ],
      benefits: [
        // {
        //   icon: 'fas fa-bolt',
        //   title: 'Emergency Storage',
        //   description:
        //     "Need to store your items for a few days or for 2 weeks, we're here for you.",
        // },
        {
          // icon: 'fas fa-hand-holding-heart',
          title: 'Short Term Storage',
          description:
            'Our short-term storage option is designed for temporary needs and requires a minimum 4 months storage term.',
        },
        {
          // icon: 'fas fa-tag',
          title: 'Long Term Storage',
          description:
            'Store your items for as long as needed, from six months to multiple years, in our secure climate-controlled facility.',
        },
      ],
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
  },
  methods: {
    callNow() {
      window.location.href = 'tel:+18008899788'
    },
    handleTierSelect(tier) {
      // Scroll to form and pre-select unit size
      const formSection = document.querySelector('.storage-form-section')
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      // Pre-fill unit size based on selected tier
      const sizeMap = {
        '5x10': 'small',
        '10x10': 'medium',
        '10x15': 'large',
        '10x20': 'extra-large',
      }
      this.formData.unitSize = sizeMap[tier.title] || ''
    },
    handleTabChange(tabId) {
      if (tabId < this.currentTab || this.completedTabs.includes(this.currentTab)) {
        this.currentTab = tabId
      }
    },
    validateTab1() {
      let isValid = true
      const errors = { ...this.fieldErrors }
      const touched = { ...this.fieldTouched }

      // Validate first name
      touched.firstName = true
      const firstNameResult = validators.name.validate(this.formData.firstName)
      errors.firstName = firstNameResult.error
      if (!firstNameResult.valid) isValid = false

      // Validate last name
      touched.lastName = true
      const lastNameResult = validators.name.validate(this.formData.lastName)
      errors.lastName = lastNameResult.error
      if (!lastNameResult.valid) isValid = false

      // Validate phone
      touched.phone = true
      const phoneResult = validators.phone.validate(this.formData.phone)
      errors.phone = phoneResult.error
      if (!phoneResult.valid) isValid = false

      // Validate email (required)
      touched.email = true
      const emailResult = validators.email.validate(this.formData.email, true)
      errors.email = emailResult.error
      if (!emailResult.valid) isValid = false

      this.fieldErrors = errors
      this.fieldTouched = touched
      return isValid
    },
    validateTab2() {
      let isValid = true
      const errors = { ...this.fieldErrors }
      const touched = { ...this.fieldTouched }

      // Validate pickup location
      touched.pickupStreet = true
      if (!this.formData.pickupStreet) {
        errors.pickupStreet = 'Pickup street address is required'
        isValid = false
      } else {
        errors.pickupStreet = ''
      }

      touched.pickupState = true
      if (!this.formData.pickupState) {
        errors.pickupState = 'Pickup state is required'
        isValid = false
      } else {
        errors.pickupState = ''
      }

      touched.pickupCity = true
      if (!this.formData.pickupCity) {
        errors.pickupCity = 'Pickup city is required'
        isValid = false
      } else {
        errors.pickupCity = ''
      }

      touched.pickupZip = true
      if (!this.formData.pickupZip) {
        errors.pickupZip = 'Pickup ZIP code is required'
        isValid = false
      } else if (!/^\d{5}$/.test(this.formData.pickupZip)) {
        errors.pickupZip = 'ZIP code must be 5 digits'
        isValid = false
      } else {
        errors.pickupZip = ''
      }

      // Validate dropoff location
      touched.dropoffStreet = true
      if (!this.formData.dropoffStreet) {
        errors.dropoffStreet = 'Dropoff street address is required'
        isValid = false
      } else {
        errors.dropoffStreet = ''
      }

      touched.dropoffState = true
      if (!this.formData.dropoffState) {
        errors.dropoffState = 'Dropoff state is required'
        isValid = false
      } else {
        errors.dropoffState = ''
      }

      touched.dropoffCity = true
      if (!this.formData.dropoffCity) {
        errors.dropoffCity = 'Dropoff city is required'
        isValid = false
      } else {
        errors.dropoffCity = ''
      }

      touched.dropoffZip = true
      if (!this.formData.dropoffZip) {
        errors.dropoffZip = 'Dropoff ZIP code is required'
        isValid = false
      } else if (!/^\d{5}$/.test(this.formData.dropoffZip)) {
        errors.dropoffZip = 'ZIP code must be 5 digits'
        isValid = false
      } else {
        errors.dropoffZip = ''
      }

      // Validate storage duration (custom validation with minimum 4 months)
      touched.storageDuration = true
      if (!this.formData.storageDuration) {
        errors.storageDuration = 'Storage duration is required'
        isValid = false
      } else if (
        typeof this.formData.storageDuration !== 'number' ||
        this.formData.storageDuration < 4
      ) {
        errors.storageDuration = 'Minimum 4 months required'
        isValid = false
      } else {
        errors.storageDuration = ''
      }

      // Validate move-in date (required field)
      touched.moveInDate = true
      if (!this.formData.moveInDate) {
        errors.moveInDate = 'Move-in date is required'
        isValid = false
      } else {
        // Validate date is not in the past
        const selectedDate = new Date(this.formData.moveInDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          errors.moveInDate = 'Move-in date cannot be in the past'
          isValid = false
        } else {
          errors.moveInDate = ''
        }
      }

      // Validate move-in time (required field)
      touched.moveInTime = true
      if (!this.formData.moveInTime) {
        errors.moveInTime = 'Preferred time is required'
        isValid = false
      } else {
        errors.moveInTime = ''
      }

      this.fieldErrors = errors
      this.fieldTouched = touched
      return isValid
    },
    nextTab() {
      let isValid = false

      if (this.currentTab === 1) {
        isValid = this.validateTab1()
      } else if (this.currentTab === 2) {
        isValid = this.validateTab2()
      } else {
        isValid = true
      }

      if (isValid) {
        if (!this.completedTabs.includes(this.currentTab)) {
          this.completedTabs.push(this.currentTab)
        }
        this.currentTab++
        this.submitMessage = ''
      } else {
        this.submitSuccess = false
        this.submitMessage = 'Please fill in all required fields correctly'
        setTimeout(() => {
          this.submitMessage = ''
        }, 3000)
      }
    },
    previousTab() {
      if (this.currentTab > 1) {
        this.currentTab--
      }
    },
    togglePricing(tier) {
      const index = this.expandedPricing.indexOf(tier)
      if (index > -1) {
        this.expandedPricing.splice(index, 1)
      } else {
        this.expandedPricing.push(tier)
      }
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    },
    validateField(fieldName) {
      this.fieldTouched[fieldName] = true

      // Email validation (optional)
      if (fieldName === 'email') {
        const result = validators.email.validate(this.formData.email, false)
        this.fieldErrors.email = result.error
        return result.valid
      }

      // Storage duration validation (custom - minimum 4 months)
      if (fieldName === 'storageDuration') {
        if (!this.formData.storageDuration) {
          this.fieldErrors.storageDuration = 'Storage duration is required'
          return false
        } else if (
          typeof this.formData.storageDuration !== 'number' ||
          this.formData.storageDuration < 4
        ) {
          this.fieldErrors.storageDuration = 'Minimum 4 months required'
          return false
        }
        this.fieldErrors.storageDuration = ''
        return true
      }

      // Move-in date validation
      if (fieldName === 'moveInDate') {
        if (!this.formData.moveInDate) {
          this.fieldErrors.moveInDate = 'Move-in date is required'
          return false
        }
        const selectedDate = new Date(this.formData.moveInDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          this.fieldErrors.moveInDate = 'Move-in date cannot be in the past'
          return false
        }
        this.fieldErrors.moveInDate = ''
        return true
      }

      // Use validators for name and phone fields
      if (validators[fieldName]) {
        const result = validators[fieldName].validate(this.formData[fieldName])
        this.fieldErrors[fieldName] = result.error
        return result.valid
      }

      return true
    },
    clearFieldError(fieldName) {
      this.fieldErrors[fieldName] = ''
    },
    handlePhoneInput() {
      this.formData.phone = validators.phone.format(this.formData.phone)
      this.clearFieldError('phone')
    },
    validateAllFields() {
      const tab1Valid = this.validateTab1()
      const tab2Valid = this.validateTab2()

      if (!tab1Valid) {
        this.currentTab = 1
        return false
      }
      if (!tab2Valid) {
        this.currentTab = 2
        return false
      }

      return true
    },
    async handleSubmit() {
      // Validate policy agreement first
      if (!this.formData.agreeToPolicy) {
        this.submitSuccess = false
        this.submitMessage = 'You must agree to the Privacy Policy and Terms of Service'
        this.fieldTouched.agreeToPolicy = true
        this.fieldErrors.agreeToPolicy = 'You must agree to the Privacy Policy and Terms of Service'
        this.currentTab = 3
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      if (!this.validateAllFields()) {
        this.submitSuccess = false
        this.submitMessage = 'Please fix the errors before submitting'
        return
      }

      this.isSubmitting = true
      this.submitMessage = ''

      try {
        const formData = new FormData()
        formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
        formData.append('form', 'Storage')
        formData.append('first_name', this.formData.firstName)
        formData.append('last_name', this.formData.lastName)
        formData.append('phone', this.formData.phone)
        formData.append('email', this.formData.email)
        formData.append('pickup_street', this.formData.pickupStreet)
        formData.append('pickup_city', this.formData.pickupCity)
        formData.append('pickup_state', this.formData.pickupState)
        formData.append('pickup_zip', this.formData.pickupZip)
        formData.append('pickup_building', this.formData.pickupBuilding || 'N/A')
        formData.append('pickup_floor', this.formData.pickupFloor || 'N/A')
        formData.append('dropoff_street', this.formData.dropoffStreet)
        formData.append('dropoff_city', this.formData.dropoffCity)
        formData.append('dropoff_state', this.formData.dropoffState)
        formData.append('dropoff_zip', this.formData.dropoffZip)
        formData.append('move_in_date', this.formData.moveInDate)
        formData.append('move_in_time', this.formData.moveInTime || 'Not specified')
        formData.append('number_of_boxes', this.formData.numberOfBoxes || 'Not specified')
        formData.append('storage_duration_months', this.formData.storageDuration)
        formData.append('notes', this.formData.notes || 'N/A')

        // Append uploaded files
        this.uploadedFiles.forEach((file, index) => {
          formData.append(`file_${index}`, file)
        })

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          this.submitSuccess = true
          this.submitMessage =
            "Thank you! Your storage reservation has been submitted. We'll contact you within 24 hours."

          setTimeout(() => {
            this.currentTab = 1
            this.completedTabs = []
            this.uploadedFiles = []
            this.formData = {
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              pickupStreet: '',
              pickupState: '',
              pickupCity: '',
              pickupZip: '',
              pickupBuilding: '',
              pickupFloor: '',
              dropoffStreet: '',
              dropoffState: '',
              dropoffCity: '',
              dropoffZip: '',
              moveInDate: '',
              moveInTime: '',
              storageDuration: '',
              numberOfBoxes: '',
              notes: '',
              agreeToPolicy: false,
            }
            this.fieldErrors = {
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              pickupStreet: '',
              pickupState: '',
              pickupCity: '',
              pickupZip: '',
              dropoffStreet: '',
              dropoffState: '',
              dropoffCity: '',
              dropoffZip: '',
              moveInDate: '',
              moveInTime: '',
              storageDuration: '',
              agreeToPolicy: '',
            }
            this.fieldTouched = {
              firstName: false,
              lastName: false,
              phone: false,
              email: false,
              pickupStreet: false,
              pickupState: false,
              pickupCity: false,
              pickupZip: false,
              dropoffStreet: false,
              dropoffState: false,
              dropoffCity: false,
              dropoffZip: false,
              moveInDate: false,
              moveInTime: false,
              storageDuration: false,
              agreeToPolicy: false,
            }
            this.submitMessage = ''
            this.submitSuccess = false
          }, 5000)
        } else {
          this.submitSuccess = false
          this.submitMessage =
            'Something went wrong. Please try again or call us at (800) 889-9788.'
        }
      } catch (error) {
        this.submitSuccess = false
        this.submitMessage = 'Network error. Please check your connection and try again.'
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style scoped>
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 700px;
  margin: 0 auto;
}

/* Feature Image Sections */
.feature-image-wrapper {
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, var(--secondary-dark), var(--primary-dark));
  border-radius: var(--radius-xl);
  border: 2px solid var(--orange-10);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.4s ease;
}

.feature-image-wrapper:hover {
  border-color: var(--accent-orange);
  box-shadow: 0 20px 60px var(--orange-20);
  transform: scale(1.02);
}

.feature-image-decoration {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--orange-10), transparent 70%);
  opacity: 0.3;
  transition: opacity 0.4s ease;
}

.feature-image-wrapper:hover .feature-image-decoration {
  opacity: 0.5;
}

.feature-image-icon {
  font-size: 10rem;
  color: var(--orange-20);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.feature-image-wrapper:hover .feature-image-icon {
  color: var(--accent-orange);
  transform: scale(1.1) rotate(5deg);
}

.feature-content {
  padding: 2rem 0;
}

.feature-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--orange-10);
  color: var(--accent-orange);
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.feature-description {
  font-size: 1.1rem;
  color: var(--text-gray);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: var(--text-light);
  font-size: 1rem;
  border-bottom: 1px solid var(--orange-10);
}

.feature-list li:last-child {
  border-bottom: none;
}

.feature-list li i {
  color: var(--accent-orange);
}
/*Pricing Cards */
.pricing-card {
  background: var(--secondary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.pricing-card:hover,
.pricing-card.active {
  border-color: var(--accent-orange);
  box-shadow: 0 10px 30px var(--orange-20);
}

.pricing-header {
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1.5rem;
  align-items: center;
}

.pricing-icon {
  width: 60px;
  height: 60px;
  background: var(--orange-10);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--accent-orange);
}

.pricing-info {
  flex: 1;
}

.pricing-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin: 0 0 0.5rem 0;
}

.pricing-description {
  color: var(--text-gray);
  margin: 0;
  font-size: 0.95rem;
}

.pricing-price {
  text-align: right;
}

.pricing-price .price {
  display: block;
  font-size: 2.5rem;
  font-weight: 900;
  /* color: var(--accent-orange); */
  line-height: 1;
}

.pricing-price .price-label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-gray);
  margin-top: 0.25rem;
}

.pricing-toggle {
  color: var(--accent-orange);
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.pricing-card.active .pricing-toggle {
  transform: rotate(180deg);
}

.pricing-body {
  padding: 0 2rem 2rem;
  animation: slideDown 0.3s ease;
  border-top: 1px solid var(--orange-10);
  margin: 0 2rem;
  padding-top: 1.5rem;
}

.pricing-items p {
  color: var(--text-gray);
  margin-bottom: 1rem;
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
}

.pricing-items p:last-child {
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .pricing-header {
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }


  .pricing-toggle {
    grid-column: 2 / 3;
    grid-row: 1;
    justify-self: end;
  }
}

@media (max-width: 768px) {
  .pricing-header {
    padding: 1.5rem;
  }

  .pricing-body {
    padding: 0 1.5rem 1.5rem;
    margin: 0 1.5rem;
  }

  .pricing-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .pricing-title {
    font-size: 1.25rem;
  }

  .pricing-price .price {
    font-size: 2rem;
  }
}

/* ont-size: 1.2rem;
}

/* FAQ Accordion */
.faq-item {
  background: var(--secondary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover,
.faq-item.active {
  border-color: var(--accent-orange);
  box-shadow: 0 10px 30px var(--orange-20);
}

.faq-question {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: var(--orange-10);
}

.faq-question h5 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-light);
}

.faq-question i {
  color: var(--accent-orange);
  transition: transform 0.3s ease;
  font-size: 1.2rem;
}

.faq-item.active .faq-question i {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 2rem 1.5rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-answer p {
  margin: 0;
  color: var(--text-gray);
  line-height: 1.8;
  font-size: 1rem;
}

/* Form Styles */
.form-label {
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-check-input:checked {
  background-color: var(--accent-orange);
  border-color: var(--accent-orange);
}

.form-check-label {
  color: var(--text-light);
  margin-left: 0.5rem;
}

@media (max-width: 992px) {
  .feature-title {
    font-size: 2rem;
  }

  .feature-image-wrapper {
    height: 300px;
    margin-bottom: 2rem;
  }

  .feature-image-icon {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .feature-title {
    font-size: 1.75rem;
  }
}

/* 3 Steps Section */
.step-card {
  background: var(--secondary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-xl);
  padding: 2rem;
  transition: all 0.3s ease;
  height: 100%;
}

.step-card:hover {
  border-color: var(--accent-orange);
  box-shadow: 0 10px 30px var(--orange-20);
  transform: translateY(-5px);
}

.step-label {
  color: var(--accent-orange);
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.step-description {
  color: var(--text-gray);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .step-card {
    padding: 1.5rem;
  }

  .step-title {
    font-size: 1.25rem;
  }
}
</style>
