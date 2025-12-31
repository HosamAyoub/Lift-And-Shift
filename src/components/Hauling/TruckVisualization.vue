<template>
  <div class="truck-container">
    <div class="truck-area">
      <!-- Pickup Truck -->
      <div
        class="pickup-truck"
        :class="{ active: currentTierIndex === 0 }"
        @click="handleSegmentClick(0)"
      >
        <!-- Hood -->
        <div class="truck-hood"></div>
        <!-- Cab -->
        <div class="truck-cab">
          <div class="truck-windshield"></div>
          <div class="cab-doors">
            <div class="cab-door">
              <div class="door-window"></div>
              <div class="door-handle"></div>
            </div>
            <div class="cab-door">
              <div class="door-window"></div>
              <div class="door-handle"></div>
            </div>
          </div>
        </div>
        <!-- Bed -->
        <div class="truck-bed"></div>
      </div>

      <!-- Container Trailer with interactive segments -->
      <div class="container-trailer">
        <div class="hitch-connector"></div>
        <div class="container-body">
          <div
            v-for="i in 4"
            :key="i"
            class="container-segment"
            :class="{ active: i <= currentTierIndex && currentTierIndex > 0 }"
            @click="handleSegmentClick(i)"
          ></div>
        </div>
      </div>

      <!-- Wheels -->
      <div class="wheels">
        <div class="wheel front"></div>
        <div class="wheel rear"></div>
        <div class="wheel trailer-front"></div>
        <div class="wheel trailer-rear"></div>
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
      validator: (value) => value >= 0 && value <= 4,
    },
  },
  emits: ['segment-click'],
  methods: {
    handleSegmentClick(segmentIndex) {
      this.$emit('segment-click', segmentIndex)
    },
  },
}
</script>

<style>
/* Truck Container */
.truck-container {
  background: var(--primary-dark);
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 2px solid var(--orange-10);
}

.truck-area {
  position: relative;
  height: 230px;
  width: 100%;
}

/* Pickup Truck - Clean design based on HTML */
.pickup-truck {
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 42%;
  height: 80px;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  transition: filter 0.25s;
}

.pickup-truck:hover {
  filter: brightness(1.08);
}

/* Hood */
.truck-hood {
  position: relative;
  right: -2px;
  width:25%;
  height: 68px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-right: none;
  border-radius: 30px 0 0 10px;
  transition: all 0.25s;
}

.pickup-truck.active .truck-hood {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 18px var(--orange-20);
}

/* Cab */
.truck-cab {
  position: relative;
  width: 38%;
  height: 80px;
  padding-top: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0 0 4px 4px;
  transition: all 0.25s;
  z-index: 2;
  background-clip: content-box;
}

.pickup-truck.active .truck-cab {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 18px var(--orange-20);
}

/* Windshield */
.truck-windshield {
  position: absolute;
  top: -30px;
  left: 0;
  width: 102%;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  /* background: linear-gradient(
    168deg,
    rgba(80, 130, 170, 0.3) 0%,
    rgba(60, 110, 150, 0.24) 30%,
    rgba(40, 90, 130, 0.18) 70%,
    rgba(20, 70, 110, 0.14) 100%
  ); */
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: none;
  border-radius: 20px 16px 0 0;
  transition: all 0.25s;
  overflow: hidden;
  z-index: 3;
}

.truck-windshield::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 6%;
  width: 42%;
  height: calc(100% - 8px);
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.22) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  border-radius: 16px 12px 0 0;
}

.truck-windshield::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 49%;
  width: 1.2px;
  height: calc(100% - 8px);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.18) 70%,
    transparent 100%
  );
  transform: translateX(-50%);
}

.pickup-truck.active .truck-windshield {
  background: linear-gradient(
    168deg,
    rgba(255, 130, 50, 0.4) 0%,
    rgba(255, 110, 40, 0.32) 30%,
    rgba(255, 90, 30, 0.24) 70%,
    var(--orange-20) 100%
  );
  border-color: var(--accent-orange);
  box-shadow: 0 0 15px var(--orange-20);
}

/* Cab doors container */
.cab-doors {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
}

/* Individual door */
.cab-door {
  position: relative;
  flex: 1;
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}

.cab-door:last-child {
  border-right: none;
}

/* Door window (glass) */
.door-window {
  position: absolute;
  top: -26px;
  left: 10%;
  width: 80%;
  height: 26px;
  background: linear-gradient(
    172deg,
    rgba(70, 120, 160, 0.28) 0%,
    rgba(50, 100, 140, 0.22) 40%,
    rgba(30, 80, 120, 0.16) 100%
  );
  border-radius: 10px 8px 0 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: none;
}

.door-window::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 10%;
  width: 35%;
  height: calc(100% - 6px);
  background: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.16) 0%,
    rgba(255, 255, 255, 0.06) 60%,
    transparent 100%
  );
  border-radius: 8px 6px 0 0;
}

.door-window::after {
  content: '';
  position: absolute;
  top: 4px;
  right: 12%;
  width: 28%;
  height: calc(100% - 8px);
  background: linear-gradient(175deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%);
  border-radius: 6px 5px 0 0;
}

.pickup-truck.active .door-window {
  background: linear-gradient(
    172deg,
    rgba(255, 110, 40, 0.4) 0%,
    rgba(255, 90, 30, 0.32) 40%,
    rgba(255, 70, 20, 0.24) 100%
  );
  border-color: var(--accent-orange);
}

/* Door panel detail */
.cab-door::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10%;
  width: 80%;
  height: calc(100% - 20px);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 7px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.18) 100%);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);
}

/* Door panel inner detail */
.cab-door::after {
  content: '';
  position: absolute;
  top: 14px;
  left: 14%;
  width: 72%;
  height: calc(100% - 28px);
  border-radius: 5px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.14) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.14) 100%
  );
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.16) 100%);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
}

/* Door panel inner shadow */
.cab-door::after {
  content: '';
  position: absolute;
  top: 14px;
  left: 14%;
  width: 72%;
  height: calc(100% - 28px);
  border-radius: 5px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.12) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.12) 100%
  );
}

/* Door handle */
.door-handle {
  position: absolute;
  bottom: 38%;
  right: 16%;
  width: 18px;
  height: 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.32) 100%);
  border-radius: 3px;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.35),
    inset 0 -1px 1px rgba(0, 0, 0, 0.45),
    0 2px 4px rgba(0, 0, 0, 0.28);
  z-index: 3;
}

.door-handle::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 2px;
  width: calc(100% - 4px);
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.25) 100%);
  border-radius: 2px;
}

.door-handle::after {
  content: '';
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 3px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
}

/* Bed */
.truck-bed {
  position: relative;
  width: 42%;
  height: 68px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 10px 4px 0;
  transition: all 0.25s;
}

.truck-bed::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0 8px 0 0;
}

.pickup-truck.active .truck-bed {
  background: var(--orange-20);
  border-color: var(--accent-orange);
  box-shadow: 0 0 18px var(--orange-20);
}

/* Container Trailer */
.container-trailer {
  position: absolute;
  left: 42%;
  bottom: 30px;
  width: 60%;
  height: 130px;
  display: flex;
  align-items: flex-end;
}

.hitch-connector {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2.5%;
  height: 14px;
  background: var(--text-gray);
  border-radius: 2px;
  z-index: 2;
}

.container-body {
  position: absolute;
  left: 2.5%;
  width: 97.5%;
  height: 130px;
  background: linear-gradient(to bottom, var(--secondary-dark), var(--primary-dark));
  border: 2px solid var(--text-gray);
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  position: relative;
}

.container-body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      transparent 24.5%,
      var(--orange-10) 24.5%,
      var(--orange-10) 25.5%,
      transparent 25.5%
    ),
    linear-gradient(
      90deg,
      transparent 49.5%,
      var(--orange-10) 49.5%,
      var(--orange-10) 50.5%,
      transparent 50.5%
    ),
    linear-gradient(
      90deg,
      transparent 74.5%,
      var(--orange-10) 74.5%,
      var(--orange-10) 75.5%,
      transparent 75.5%
    );
  pointer-events: none;
  z-index: 0;
}

.container-body::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 16px;
  height: 4px;
  background: var(--danger, #ef4444);
  opacity: 0.6;
  box-shadow: calc(100% - 16px - 8px) 0 0 0 var(--danger, #ef4444);
}

.container-segment {
  flex: 1;
  background: transparent;
  transition:
    background 0.25s,
    box-shadow 0.25s;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.container-segment:last-child {
  border-right: none;
}

.container-segment.active {
  background: var(--orange-20);
  box-shadow:
    inset 0 0 0 0.1px var(--accent-orange),
    0 0 10px var(--orange-20);
}

.container-segment:hover {
  background: var(--orange-10);
}

/* Wheels */
.wheels {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
}

.wheel {
  position: absolute;
  bottom: 0;
  width: 32px;
  height: 32px;
  background: #0a0a0a;
  border: 6px solid rgba(255, 255, 255, 0.22);
  border-radius: 50%;
}

.wheel::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
}

.wheel.front {
  left: 5%;
}

.wheel.rear {
  left: 27%;
}

.wheel.trailer-front {
  left: 68%;
}

.wheel.trailer-rear {
  left: 76%;
}

/* Axle connecting trailer wheels */
.wheels::before {
  content: '';
  position: absolute;
  bottom: 16px;
  left: 66%;
  width: 12%;
  height: 8px;
  background: var(--text-gray);
  border-radius: 4px;
  z-index: -1;
}

/* Responsive */
@media (max-width: 768px) {
  .truck-area {
    height: 180px;
  }

  .pickup-truck {
    width: 42%;
    height: 68px;
  }

  .hood {
    height: 50px;
  }

  .cab-body {
    height: 68px;
  }

  .cab-roof {
    top: -24px;
    height: 36px;
  }

  .cab-roof::before {
    top: 4px;
    height: 26px;
  }

  .cab-roof::after {
    height: 23px;
  }

  .door:first-of-type::after {
    top: -23px;
    height: 23px;
  }

  .door-window {
    margin-top: 8px;
    height: 26px;
  }

  .pickup-bed {
    height: 52px;
  }

  .container-trailer {
    left: 42%;
    width: 60%;
    height: 68px;
  }

  .container-body {
    height: 68px;
  }

  .wheel {
    width: 24px;
    height: 24px;
  }
}
</style>
