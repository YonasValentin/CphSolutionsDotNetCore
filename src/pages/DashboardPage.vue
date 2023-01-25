<script setup lang="ts">
import axios from "axios";
import Vue from "vue";
import { computed, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { useProjectsStore } from "@/store/projects";
import { storeToRefs } from "pinia";
import colorbrewer from "colorbrewer";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
const loaded = ref(false);
const projectsStore = useProjectsStore();
const { solutions, loading } = storeToRefs(projectsStore);

function countFrameworks(lst: string[], uniqueLabels: string[]) {
  let counts = new Map<string, number>();
  uniqueLabels.forEach((element) => {
    counts.set(element, lst.filter((x) => x === element).length);
  });
  return counts as Map<string, number>;
}

const labelList = computed(() => {
  let label = [];
  label = solutions.value.map((labels) => {
    return labels.frameworks.map(
      (framework) => framework.content.frameworkName
    );
  });
  label = label.flatMap((x) => x);
  const uniqueLabels = [...new Set(label)];
  return countFrameworks(label, uniqueLabels);
});
console.log(labelList);

console.log(labelList);

// chart data skal være computed
function setColors(amount: number) {
  let colors = [];

  for (const key in colorbrewer.Blues) {
    if (Object.prototype.hasOwnProperty.call(colorbrewer.Blues, key)) {
      colors.push(...colorbrewer.Blues[key]);
    }
  }
  colors = colors.flatMap((x) => x);
  return [...new Set(colors)].slice(0, amount);
}

const chartData = computed(() => {
  let colors = setColors(labelList.value.size);

  const labels = [...labelList.value.keys()];
  const data = [...labelList.value.values()];
  return {
    type: "doughnut",
    labels: labels,
    datasets: [
      {
        label: "Front-end",
        data: data,
        backgroundColor: colors,
        borderColor: "#fff",
        hoverOffset: 10,
      },
    ],
  };
});

const chartOptions = computed(() => {
  loaded.value = true;
  return {
    responsive: true,
    layout: {
      padding: {
        bottom(ctx) {
          const chart = ctx.chart;
          let paddingBottom = 0;
          chart.data.datasets.forEach(function (el) {
            const hoverOffset = el.hoverOffset || 0;
            paddingBottom = Math.max(hoverOffset / 2 + 5, paddingBottom);
          });
          return paddingBottom;
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Front-end stats",
        font: {
          size: 24,
        },
      },
    },
  };
});

const sumCustomers = computed(() => {
  let customers = [];
  customers = solutions.value.map((customers) => customers.customer);
  const uniqueCustomers = [...new Set(customers)];
  return uniqueCustomers.length;
});
</script>

<template>
  <div class="dashboard-page">
    <Doughnut
      class="dashboard-page__doughnut"
      :chart-data="chartData"
      :chart-options="chartOptions"
    />

    <div class="dashboard-page__stats">
      <div>
        <q-avatar>
          <q-icon size="lg" name="engineering "></q-icon>
        </q-avatar>
        <span>{{ solutions.length }} </span>
        <span>Total number of projects</span>
      </div>

      <div>
        <q-avatar>
          <q-icon size="lg" name="groups"></q-icon>
        </q-avatar>
        <span> {{ sumCustomers }} </span>
        <span>Total number of customers</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  background-color: $grey;

  &__stats {
    display: flex;
    padding: 24px;
    gap: 40px;
    border-radius: 8px;
    width: fit-content;
    height: fit-content;

    > div {
      display: grid;
      align-items: center;
      border-radius: 8px;
      background-color: white;
      padding: 24px;
      height: fit-content;

      :nth-child(1) {
        display: flex;
        justify-content: center;
        width: 100%;
        grid-row: 1;
        grid-column: 1 / -1;
      }

      :nth-child(2) {
        display: flex;
        justify-content: center;
        grid-column: 1 / -1;
        grid-row: 2;
        font-size: 32px;
        font-weight: bold;
        color: black;
        border-top: 2px solid $white-grey;
      }

      :nth-child(3) {
        display: flex;
        justify-content: center;
        grid-column: 1 / -1;
        grid-row: 3;
        font-size: 16px;
        color: $dark-grey;
        opacity: 0.7;
        text-align: center;
      }
    }

    :deep() {
      .q-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .q-icon {
        color: black;

        :not(:last-child) {
          color: black;
        }
      }
    }
  }
}
</style>
