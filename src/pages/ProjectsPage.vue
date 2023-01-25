<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useProjectsStore } from "@/store/projects";

const projectsStore = useProjectsStore();
const { solutions, loading } = storeToRefs(projectsStore);
projectsStore.fetchProjects();
const filterResults = ref("");

function toLink(row) {
  router.push(`/project/${row.solutionID}`);
}

const alertExpanded = ref(false);
const warningExpanded = ref(false);

const columns = [
  // {
  //   name: "status",
  //   label: "Status",
  //   field: "status",
  //   align: "left",
  //   sortable: true,
  // },
  {
    name: "name",
    label: "Project Name",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "customer",
    label: "Customer",
    field: "customer",
    align: "left",
    sortable: true,
  },
  {
    name: "framework",
    label: "Framework",
    field: "framework",
    align: "left",
  },
  {
    name: "version",
    label: "Version",
    field: "version",
    align: "left",
  },
  // {
  //   name: "detailsProgress",
  //   label: "Details Progress",
  //   field: "detailsProgress",
  //   align: "left",
  //   sortable: true,
  // },
  {
    name: "lastEdit",
    label: "Last Edit",
    field: "lastEdit",
    align: "left",
    sortable: true,
  },
  {
    name: "editSolution",
    field: "editSolution",
  },
];

const rows = [
  {
    test: "Complete",
  },
];

const detailsProgressValue = 60;
const detailsProgressColor = "warning";

const avatarColors = ["#55C2EB", "#EB5555", "#55EBB3", "#FFFFFF", "#6455EB"];
const randomColor =
  avatarColors[Math.trunc(Math.random() * avatarColors.length)];

console.log(randomColor);
</script>

<template>
  <div>
    <div class="q-mt-lg">
      <q-header
        reveal
        :unelevated="true"
        class="bg-white text-black q-mt-lg q-mx-lg q-px-md q-py-md"
        height-hint="98"
        style="max-width: 1400px; border-radius: 20px; margin: 0 auto"
      >
        <q-toolbar>
          <q-toolbar-title style="flex: 0.5" class="flex column">
            <img style="width: 100px" src="@/assets/novicell_logo.svg" />
            <div class="text-h6 q-mt-xs text-grey-7">Cph Solutions</div>
          </q-toolbar-title>
          <div class="flex" style="flex: 1; gap: 24px">
            <q-input
              style="min-width: 400px"
              label="Search"
              v-model="filterResults"
              filled
              text
              autofocus
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
            <q-btn unelevated outline icon="tune"></q-btn>
          </div>

          <q-btn
            outline
            icon="add"
            label="Add a New Project"
            color="red"
            class="q-pa-"
            text-color="red"
            no-caps
            style="padding: 10px 8px"
            target="_blank"
            href="https://solutions.novicell-cph.dk/umbraco#/content/content/edit/1095?doctype=solution&create=true"
          ></q-btn>
        </q-toolbar>
      </q-header>
    </div>

    <!-- <q-expansion-item
      style="border-radius: 30px"
      v-model="alertExpanded"
      icon="error"
      label="Critical Status"
      class="bg-red q-my-lg overflow-hidden"
      header-class="text-white text-bold"
      expand-icon-class="text-white"
    >
      <q-card>
        <q-card-section>
          <q-table
            color="white"
            :rows="solutions"
            :columns="columns"
            :filter="filterResults"
            row-key="status"
            :rows-per-page-options="[0]"
            hide-bottom
            flat
            :table-style="{ borderRadius: '20px', overflow: 'hidden' }"
          >
            <template #header="props">
              <q-tr :props="props">
                <q-th
                  class="text-grey-6"
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  style="font-size: 14px; font-weight: bold"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template #body="props">
              <q-tr
                class="cursor-pointer"
                :props="props"
                @click="toLink(props.row)"
              >
                <q-td key="status" :props="props">
                  <q-chip
                    label="Risk Detected"
                    color="red"
                    text-color="white"
                    size="md"
                    square
                  ></q-chip>
                  <div>Version conatins security breaches</div>
                  <div>
                    See more details <q-icon name="open_in_new"></q-icon>
                  </div>
                </q-td>
                <q-td class="text-weight-medium" key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="customer" :props="props">
                  <div class="flex items-center">
                    <q-avatar color="red" size="lg" text-color="white">
                      {{ props.row.customer.view.name[0] }}
                    </q-avatar>
                    <div class="q-ml-sm text-weight-medium">
                      {{ props.row.customer.view.name }}
                    </div>
                  </div>
                </q-td>
                <q-td key="framework" :props="props">
                  <div
                    v-for="framework in props.row.frameworks"
                    :key="framework"
                  >
                    <div class="text-weight-medium">
                      {{ framework.content.frameworkName }}
                    </div>
                  </div>
                </q-td>
                <q-td key="version" :props="props">
                  <div
                    class="text-weight-medium"
                    v-for="version in props.row.frameworks"
                    :key="version"
                  >
                    {{ version.content.frameworkVersion }}
                  </div>
                </q-td>
                <q-td key="detailsProgress" :props="props">
                  <q-circular-progress
                    :value="detailsProgressValue"
                    show-value
                    font-size="12px"
                    size="50px"
                    :color="detailsProgressColor"
                    track-color="grey"
                    :thickness="0.1"
                  >
                    {{ detailsProgressValue }}%
                  </q-circular-progress>
                  <div class="flex items-center q-mt-xs">
                    <q-icon size="16px" name="more_vert"></q-icon>
                    <div>Continue to fill-in details</div>
                  </div>
                </q-td>
                <q-td key="lastEdit" :props="props">
                  <div>Nov 11, 2022</div>
                  <div>12:20</div>
                </q-td>
                <q-td key="editSolution" :props="props">
                  <q-btn
                    round
                    color="red"
                    outline
                    icon="edit"
                    target="_blank"
                    :href="`https://solutions.novicell-cph.dk/umbraco#/content/content/edit/${props.row.solutionID}`"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-expansion-item> -->

    <!-- <q-expansion-item
      style="border-radius: 30px"
      v-model="warningExpanded"
      icon="error"
      label="Warning Status"
      class="bg-warning q-my-lg overflow-hidden"
      rounded
      header-class="text-white text-bold"
      expand-icon-class="text-white"
    >
      <q-card>
        <q-card-section>
          <q-table
            color="white"
            :rows="solutions"
            :columns="columns"
            :filter="filterResults"
            row-key="status"
            :rows-per-page-options="[0]"
            hide-bottom
            flat
            :table-style="{ borderRadius: '20px', overflow: 'hidden' }"
          >
            <template #header="props">
              <q-tr :props="props">
                <q-th
                  class="text-grey-6"
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  style="font-size: 14px; font-weight: bold"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template #body="props">
              <q-tr
                class="cursor-pointer"
                :props="props"
                @click="toLink(props.row)"
              >
                <q-td key="status" :props="props">
                  <q-chip
                    label="Warning"
                    color="orange-1"
                    text-color="yellow-9"
                    size="md"
                    square
                  ></q-chip>
                  <div>Test after build in 2nd round</div>
                  <div>
                    See more details <q-icon name="open_in_new"></q-icon>
                  </div>
                </q-td>
                <q-td class="text-weight-medium" key="name" :props="props">
                  {{ props.row.name }}
                </q-td>
                <q-td key="customer" :props="props">
                  <div class="flex items-center">
                    <q-avatar color="red" size="lg" text-color="white">
                      {{ props.row.customer.view.name[0] }}
                    </q-avatar>
                    <div class="q-ml-sm text-weight-medium">
                      {{ props.row.customer.view.name }}
                    </div>
                  </div>
                </q-td>
                <q-td key="framework" :props="props">
                  <div
                    v-for="framework in props.row.frameworks"
                    :key="framework"
                    class="text-weight-medium"
                  >
                    {{ framework.content.frameworkName }}
                  </div>
                </q-td>
                <q-td key="version" :props="props">
                  <div
                    class="text-weight-medium"
                    v-for="version in props.row.frameworks"
                    :key="version"
                  >
                    {{ version.content.frameworkVersion }}
                  </div>
                </q-td>
                <q-td key="detailsProgress" :props="props">
                  <q-circular-progress
                    :value="detailsProgressValue"
                    show-value
                    font-size="12px"
                    size="50px"
                    :color="detailsProgressColor"
                    track-color="grey"
                    :thickness="0.1"
                  >
                    {{ detailsProgressValue }}%
                  </q-circular-progress>
                  <div class="flex items-center q-mt-xs">
                    <q-icon size="16px" name="more_vert"></q-icon>
                    <div>Continue to fill-in details</div>
                  </div>
                </q-td>
                <q-td key="lastEdit" :props="props">
                  <div>Nov 11, 2022</div>
                  <div>12:20</div>
                </q-td>
                <q-td key="editSolution" :props="props">
                  <q-btn
                    round
                    color="red"
                    outline
                    icon="edit"
                    target="_blank"
                    :href="`https://solutions.novicell-cph.dk/umbraco#/content/content/edit/${props.row.solutionID}`"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-expansion-item> -->
    <q-table
      color="white"
      :rows="solutions"
      :columns="columns"
      :filter="filterResults"
      row-key="status"
      :rows-per-page-options="[0]"
      hide-bottom
      flat
      :table-style="{ borderRadius: '20px', overflow: 'hidden' }"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            class="text-grey-6"
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            style="font-size: 14px; font-weight: bold"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template #body="props">
        <q-tr class="cursor-pointer" :props="props" @click="toLink(props.row)">
          <!-- <q-td key="status" :props="props">
            <q-chip
              label="Complete"
              color="green-1"
              text-color="green-8"
              size="md"
              square
            ></q-chip>
          </q-td> -->
          <q-td class="text-weight-medium" key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="customer" :props="props">
            <div class="flex items-center">
              <q-avatar color="red" size="lg" text-color="white">
                {{ props.row.customer.view.name[0] }}
              </q-avatar>
              <div class="q-ml-sm text-weight-medium">
                {{ props.row.customer.view.name }}
              </div>
            </div>
          </q-td>
          <q-td key="framework" :props="props">
            <div
              v-for="framework in props.row.frameworks"
              :key="framework"
              class="text-weight-medium"
            >
              {{ framework.content.frameworkName }}
            </div>
          </q-td>
          <q-td key="version" :props="props">
            <div
              class="text-weight-medium"
              v-for="version in props.row.frameworks"
              :key="version"
            >
              {{ version.content.frameworkVersion }}
            </div>
          </q-td>
          <!-- <q-td key="detailsProgress" :props="props">
            <q-circular-progress
              :value="detailsProgressValue"
              show-value
              font-size="12px"
              size="50px"
              :color="detailsProgressColor"
              track-color="grey"
              :thickness="0.1"
            >
              {{ detailsProgressValue }}%
            </q-circular-progress>
            <div class="flex items-center q-mt-xs">
              <q-icon size="16px" name="more_vert"></q-icon>
              <div>Continue to fill-in details</div>
            </div>
          </q-td> -->
          <q-td key="lastEdit" :props="props">
            <div>Nov 11, 2022</div>
            <div>12:20</div>
          </q-td>
          <q-td key="editSolution" :props="props">
            <q-btn
              round
              color="red"
              outline
              icon="edit"
              target="_blank"
              :href="`https://solutions.novicell-cph.dk/umbraco#/content/content/edit/${props.row.solutionID}`"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style scoped lang="scss"></style>
