<template>
  <div class="truck-load">
    <!-- Truck drawing -->
    <div class="truck">
      <!-- Cabin (slot 1) -->
      <button
        class="cabin"
        :class="{ active: cabinOn }"
        @click="toggleCabin"
        aria-pressed="cabinOn"
        title="Cabin (slot 1)"
      ></button>

      <!-- Container (slots 2-5 / 4 segments) -->
      <div class="bed" role="group" aria-label="Truck container">
        <button
          v-for="i in 4"
          :key="i"
          class="segment"
          :class="{ active: i <= bedActive }"
          @click="onSegmentClick(i)"
          :aria-pressed="i <= bedActive"
          :title="`Container slot ${i}`"
        ></button>
      </div>

      <!-- Wheels just for looks -->
      <div class="wheels">
        <div class="wheel"></div>
        <div class="wheel"></div>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <label class="control-label">Pickup Bed</label>

      <input
        class="range"
        type="range"
        min="0"
        max="4"
        step="1"
        v-model.number="bedActive"
        :aria-valuetext="`${bedActive}/4 full`"
      />

      <div class="tiers">
        <button class="tier" :class="{ selected: bedActive >= 1 }" @click="setBed(1)">1/4</button>
        <button class="tier" :class="{ selected: bedActive >= 2 }" @click="setBed(2)">1/2</button>
        <button class="tier" :class="{ selected: bedActive >= 3 }" @click="setBed(3)">3/4</button>
        <button class="tier" :class="{ selected: bedActive >= 4 }" @click="setBed(4)">Full</button>
        <button class="tier ghost" @click="setBed(0)">Clear</button>
      </div>

      <div class="readout">
        <span>Load: {{ loadPct }}%</span>
        <span>Tier: {{ tierLabel }}</span>
        <span>Cabin: {{ cabinOn ? 'On' : 'Off' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  emits: ['update:cabin', 'update:bed'],
  data() {
    return {
      cabinOn: true,
      bedActive: 0, // 0..4
    }
  },
  computed: {
    loadPct() {
      return Math.round((this.bedActive / 4) * 100)
    },
    tierLabel() {
      return this.bedActive === 0 ? 'Empty' : `${this.bedActive}/4 Load`
    },
  },
  watch: {
    cabinOn(value) {
      this.$emit('update:cabin', value)
    },
    bedActive(value) {
      this.$emit('update:bed', value)
    },
  },
  methods: {
    setBed(n) {
      this.bedActive = Math.min(4, Math.max(0, n))
    },
    onSegmentClick(i) {
      // Sequential fill: clicking slot i fills 1..i.
      // Clicking the currently highest active slot will decrease by 1 (nice toggle UX).
      if (this.bedActive === i) this.setBed(i - 1)
      else this.setBed(i)
    },
    toggleCabin() {
      this.cabinOn = !this.cabinOn
    },
  },
}
</script>

<style scoped>
:root {
  --bg: #0f1115;
  --panel: #151820;
  --stroke: #2a2f3a;
  --segment: #1a1f2b;
  --segment-active: #3b82f6;
  --glow: rgba(59, 130, 246, 0.5);
  --text: #d6d8e0;
  --muted: #9097a7;
}

/* Container styling and slot highlighting */
.truck-load {
  display: grid;
  gap: 14px;
  color: var(--text);
  background: var(--bg);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35) inset;
}

.truck {
  position: relative;
  background: var(--panel);
  border: 1px solid var(--stroke);
  border-radius: 18px;
  padding: 28px 20px 44px 20px;
}

.cabin,
.bed {
  display: inline-grid;
  vertical-align: top;
  height: 60px;
  border: 1px solid var(--stroke);
  background: linear-gradient(180deg, #151a22, #0f131a);
}

.cabin {
  width: 18%;
  border-radius: 14px 6px 6px 14px;
  margin-right: 10px;
  transition:
    box-shadow 0.2s,
    background 0.2s,
    transform 0.2s;
}

.cabin.active {
  outline: 2px solid var(--segment-active);
  box-shadow: 0 0 0 6px var(--glow);
}

.bed {
  width: calc(82% - 10px);
  border-radius: 8px 14px 14px 8px;
  padding: 6px;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.segment {
  border: 1px dashed #2b3341;
  border-radius: 10px;
  background: var(--segment);
  transition:
    background 0.2s,
    box-shadow 0.2s,
    border-color 0.2s,
    transform 0.06s;
  height: 100%;
}

.segment.active {
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.08));
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow:
    inset 0 0 0 2px rgba(59, 130, 246, 0.35),
    0 0 0 4px var(--glow);
}

.segment:active {
  transform: translateY(1px);
}

.wheels {
  position: absolute;
  left: 16%;
  right: 6%;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.wheel {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #0b0e14;
  border: 3px solid #2c3340;
  box-shadow: inset 0 0 0 2px #121722;
}

/* Control panel styling */
.controls {
  display: grid;
  gap: 10px;
}

.control-label {
  font-size: 12px;
  color: var(--muted);
}

.range {
  width: 100%;
}

.tiers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tier {
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--stroke);
  background: #0f131a;
  color: var(--text);
  transition:
    background 0.15s,
    border-color 0.15s,
    transform 0.06s;
}

.tier.selected {
  border-color: rgba(59, 130, 246, 0.7);
  background: rgba(59, 130, 246, 0.12);
  box-shadow: 0 0 0 3px var(--glow);
}

.tier.ghost {
  opacity: 0.75;
}

.tier:active {
  transform: translateY(1px);
}

.readout {
  display: flex;
  gap: 16px;
  color: var(--muted);
  font-size: 14px;
}
</style>
