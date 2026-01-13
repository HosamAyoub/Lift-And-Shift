<template>
  <div class="truck-visualization">
    <div class="rig-wrap">
      <!-- Trailer SVG -->
      <svg class="trailer-svg" viewBox="0 0 980 270" role="img" aria-label="Trailer load fill">
        <defs>
          <linearGradient id="bgGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--primary-dark)" />
            <stop offset="1" stop-color="var(--bg-dark)" />
          </linearGradient>

          <linearGradient id="trailerBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="var(--bg-section)" />
            <stop offset="1" stop-color="var(--bg-dark)" />
          </linearGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.6" />
          </filter>

          <clipPath id="trailerClip">
            <rect x="380" y="62" width="560" height="130" rx="16" />
          </clipPath>
        </defs>

        <!-- Background panel -->
        <rect class="bg-panel" x="5" y="18" width="960" height="234" rx="22" fill="url(#bgGlow)" />

        <!-- Ground rail -->
        <rect class="ground-rail" x="48" y="206" width="884" height="8" rx="4" />

        <!-- Hitch bar -->
        <rect class="hitch-bar" x="320" y="172" width="70" height="8" rx="4" />

        <!-- Trailer body -->
        <g filter="url(#softShadow)">
          <rect
            class="trailer-body"
            x="380"
            y="62"
            width="560"
            height="130"
            rx="16"
            fill="url(#trailerBody)"
          />

          <!-- Trailer fill based on tier -->
          <g clip-path="url(#trailerClip)">
            <rect class="trailer-fill" x="380" y="62" :width="trailerFillWidth" height="130" />
          </g>

          <!-- Clickable segments (invisible, for interaction) -->
          <g class="trailer-segments">
            <rect
              v-for="(segment, index) in trailerSegments"
              :key="index"
              :x="segment.x"
              y="62"
              :width="segment.width"
              height="130"
              fill="transparent"
              class="segment-hitbox"
              @click="onSegmentClick(index + 1)"
            />
          </g>

          <!-- Trailer wheels -->
          <g class="wheels">
            <circle cx="755" cy="205" r="24" class="wheel-outer" />
            <circle cx="755" cy="205" r="9" class="wheel-inner" />
            <circle cx="820" cy="205" r="24" class="wheel-outer" />
            <circle cx="820" cy="205" r="9" class="wheel-inner" />
          </g>
        </g>

        <!-- Hitch connector -->
        <g class="hitch">
          <rect x="358" y="176" width="7" height="10" rx="5" class="hitch-base" />
          <circle cx="358" cy="181" r="6" class="hitch-ring" />
          <circle cx="358" cy="170" r="5" class="hitch-ball" />
        </g>
      </svg>

      <!-- Pickup truck with silhouette effect -->
      <div
        class="pickup-wrap"
        :class="{ 'is-highlighted': currentTierIndex === 0 }"
        @click="onSegmentClick(0)"
      >
        <!-- Truck image rendered as black silhouette with outline -->
        <img src="/assets/images/pickup-truck.png" class="pickup-img" alt="Pickup truck" />
        <!-- Logo overlay on truck door -->
        <svg class="pickup-logo" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
          <g transform="scale(0.105)">
            <!-- LIFT text -->
            <g>
              <path fill="#FFFFFF" d="M250.92,1559.29v62.73H0v-376.39h62.73v313.66H250.92z" />
              <path fill="#FFFFFF" d="M376.39,1622.03h-62.73v-376.39h62.73V1622.03z" />
              <path
                fill="#FFFFFF"
                d="M501.85,1622.03h-62.73v-376.39H815.5v62.73H501.85V1622.03z M564.58,1402.47H815.5v62.73H564.58V1402.47z"
              />
              <path
                fill="#FFFFFF"
                d="M1066.43,1308.37v313.66h-62.73v-313.66H878.24v-62.73h313.65v62.73H1066.43z"
              />
            </g>
            <!-- & symbol (orange) -->
            <path
              class="logo-ampersand"
              d="M1646.5,1663.6c-13.33-13.33-25.96-26.67-44.21-46.32c-40.7,37.89-86.31,54.03-138.24,54.03c-91.93,0-145.26-61.75-145.26-132.63c0-64.56,38.6-108.77,92.63-138.24v-2.11c-24.56-30.88-39.3-65.26-39.3-98.94c0-57.54,41.4-116.49,120-116.49c58.95,0,104.56,39.3,104.56,100.35c0,49.82-28.77,89.12-103.86,126.31v2.11c40,46.31,84.91,98.24,115.08,131.93c21.76-32.98,36.49-78.59,45.61-138.24h56.14c-12.63,74.39-32.98,133.33-68.07,174.74c25.26,26.67,49.82,53.33,77.89,83.51H1646.5z M1572.11,1582.2c-28.07-30.88-80.7-88.42-133.33-148.77c-25.26,16.14-61.05,46.32-61.05,96.14c0,54.03,40,95.44,96.84,95.44C1515.27,1625.01,1549.66,1606.76,1572.11,1582.2z M1428.26,1293.78c0,33.68,15.44,59.65,35.79,84.91c47.72-27.37,78.59-52.63,78.59-92.63c0-28.77-16.14-61.05-54.74-61.05C1448.61,1225.01,1428.26,1257.29,1428.26,1293.78z"
            />
            <!-- SHIFT text -->
            <g>
              <path
                fill="#FFFFFF"
                d="M2258.32,1245.64v62.73h-313.66v94.1h313.66v219.56h-376.39v-62.73h313.65v-94.1h-313.65v-219.56H2258.32z"
              />
              <path
                fill="#FFFFFF"
                d="M2697.44,1622.03h-62.73V1465.2h-250.92v156.83h-62.73v-376.39h62.73v156.83h250.92v-156.83h62.73V1622.03z"
              />
              <path fill="#FFFFFF" d="M2822.9,1622.03h-62.73v-376.39h62.73V1622.03z" />
              <path
                fill="#FFFFFF"
                d="M2948.36,1622.03h-62.73v-376.39h376.39v62.73h-313.66V1622.03z M3011.09,1402.47h250.93v62.73h-250.93V1402.47z"
              />
              <path
                fill="#FFFFFF"
                d="M3512.95,1308.37v313.66h-62.73v-313.66h-125.46v-62.73h313.65v62.73H3512.95z"
              />
            </g>
            <!-- Icon above text -->
            <g>
              <path
                fill="#FFFFFF"
                d="M1490.71,695.82h41.82l-28.77-87.6l0.01,0c11.92-5.09,20.28-16.9,20.28-30.67c0-18.41-14.93-33.33-33.33-33.33c-18.41,0-33.33,14.92-33.33,33.33c0,13.77,8.36,25.59,20.28,30.67l0,0l-28.77,87.6H1490.71"
              />
              <path
                fill="#FFFFFF"
                d="M2531.5,100.18l-102.61,96.43l26.77,28.45l95.39-89.62l66.11-88.95L2531.5,100.18z"
              />
              <path
                fill="#FFFFFF"
                d="M2531.5,100.18l85.65-53.68l-66.11,88.95l46.57-43.76v870.23H1256.24l-215.44-90.93V152.18l238.99-113.06h429.32l250.56,484.94l198.41,63.9l-79.03-63.9l79.03,20.18l40.36,65.59l352.61-474.39l-95.39,89.62l-26.77-28.45L2531.5,100.18L2265.7,266.77l16.81-92.5l-126.12,92.5l-102.57-94.19L2234.11,0h-963.11l-269.28,127.39v769.49l246.63,104.15h1388.35V1.31L2531.5,100.18z M2090.76,280.58l-58.89,23.55v-52.11L2090.76,280.58z"
              />
              <polygon
                fill="#FFFFFF"
                points="2041.99,797.09 1649.74,251.63 1968.06,883.94 1340.81,19.56 1601.46,19.56"
              />
              <polygon
                fill="#FFFFFF"
                points="2617.15,46.5 2551.04,135.44 2455.65,225.06 2428.88,196.61 2531.5,100.18"
              />
              <polygon
                fill="#FFFFFF"
                points="1243.51,199.91 1067.4,241.2 1067.4,180.48 1243.51,118.53"
              />
              <polygon
                fill="#FFFFFF"
                points="1243.51,340.49 1067.4,370.25 1067.4,301.32 1243.51,253.36"
              />
              <polygon
                fill="#FFFFFF"
                points="1243.51,490.33 1067.4,493.9 1067.4,424.98 1243.51,403.2"
              />
              <polygon
                fill="#FFFFFF"
                points="1243.51,620.02 1067.4,610.88 1067.4,541.95 1243.51,532.89"
              />
              <polygon
                fill="#FFFFFF"
                points="1067.4,746.14 1243.51,756.7 1243.51,680.87 1067.4,664.47"
              />
              <polygon
                fill="#FFFFFF"
                points="1067.4,846.05 1243.51,897.67 1243.51,816.29 1067.4,782.66"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TruckVisualization',
  props: {
    currentTierIndex: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  emits: ['segment-click'],
  computed: {
    // Calculate trailer fill width based on tier (0 = no fill, 4 = full)
    trailerFillWidth() {
      if (this.currentTierIndex === 0) return 0
      // Trailer is 560px wide, divide into 4 segments for tiers 1-4
      return (this.currentTierIndex / 4) * 560
    },
    // Define the 4 clickable segments on the trailer
    trailerSegments() {
      const trailerStart = 380
      const trailerWidth = 560
      const segmentWidth = trailerWidth / 4

      return [
        { x: trailerStart, width: segmentWidth },
        { x: trailerStart + segmentWidth, width: segmentWidth },
        { x: trailerStart + segmentWidth * 2, width: segmentWidth },
        { x: trailerStart + segmentWidth * 3, width: segmentWidth },
      ]
    },
  },
  methods: {
    onSegmentClick(tierIndex) {
      this.$emit('segment-click', tierIndex)
    },
  },
}
</script>

<style scoped>
.truck-visualization {
  width: 100%;
  max-width: 100%;
}

.rig-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 980 / 270;
}

.trailer-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* SVG Element Styles using CSS variables */
.bg-panel {
  stroke: var(--secondary-dark);
  stroke-width: 2;
}

.ground-rail {
  fill: var(--bg-dark);
}

.hitch-bar {
  fill: var(--primary-dark);
}

.trailer-body {
  stroke: var(--secondary-dark);
  stroke-width: 2.5;
}

.trailer-fill {
  fill: var(--accent-orange);
  opacity: 0.7;
}

.wheel-outer {
  fill: var(--bg-dark);
  stroke: var(--secondary-dark);
  stroke-width: 3;
}

.wheel-inner {
  fill: var(--text-light-gray);
  opacity: 0.9;
}

.hitch-base {
  fill: var(--bg-dark);
  stroke: var(--secondary-dark);
  stroke-width: 1.5;
}

.hitch-ring {
  fill: var(--primary-dark);
  stroke: var(--secondary-dark);
  stroke-width: 1.5;
}

.hitch-ball {
  fill: var(--text-light-gray);
  stroke: var(--secondary-dark);
  stroke-width: 1.5;
}

.logo-ampersand {
  fill: var(--accent-orange);
}

/* Pickup positioning */
.pickup-wrap {
  position: absolute;
  left: -0.5%;
  top: 12%;
  width: 40%;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
  border-radius: var(--radius-xxl);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap-md);
  box-sizing: border-box;
}

/* Truck image as black silhouette with orange border outline */
.pickup-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  filter: brightness(0) drop-shadow(0 0 0.5px var(--white-25)) drop-shadow(0 0 1px var(--white-50))
    drop-shadow(0 0 2px var(--white-70));
}

/* Logo overlay positioned on truck door */
.pickup-logo {
  position: absolute;
  left: 36%;
  top: 37%;
  width: 27%;
  pointer-events: none;
  transition: filter 0.3s ease;
}

/* White glow highlight on logo when pickup tier is selected */
.pickup-wrap.is-highlighted .pickup-logo {
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))
    drop-shadow(0 0 6px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))
    drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
}

/* Orange glow highlight when pickup tier is selected */
.pickup-wrap.is-highlighted .pickup-img {
  filter: brightness(0) drop-shadow(0 0 3px var(--accent-orange))
    drop-shadow(0 0 6px var(--orange-40)) drop-shadow(0 0 12px var(--orange-25))
    drop-shadow(0 0 20px var(--orange-15));
}

/* Ground shadow under pickup tires */
.pickup-wrap::after {
  content: '';
  position: absolute;
  left: 10%;
  right: 5%;
  bottom: 5%;
  height: 10%;
  background: radial-gradient(closest-side, var(--black-50), transparent);
  filter: blur(4px);
  opacity: 0.6;
  z-index: -1;
}

.segment-hitbox {
  cursor: pointer;
  transition: var(--transition-fast);
}

.segment-hitbox:hover {
  fill: var(--orange-15);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .pickup-wrap {
    left: -1%;
    top: 10%;
    width: 40%;
    padding: var(--gap-sm);
  }

  .pickup-logo {
    left: 35%;
    top: 35%;
    width: 28%;
  }
}

@media (max-width: 480px) {
  .pickup-wrap {
    left: 2.5%;
    top: 20%;
    width: 35%;
    padding: var(--gap-xs);
  }

  .pickup-logo {
    left: 36%;
    top: 36%;
    width: 26%;
  }
}
</style>
