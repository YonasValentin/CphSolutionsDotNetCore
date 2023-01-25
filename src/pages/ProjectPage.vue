<script setup lang="ts">
import { computed, ref } from "vue";
import { Solution, EnvironmentContent } from "@/types/base";
import axios from "axios";
import { useProjectsStore } from "@/store/projects";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import ThePersonCard from "@/components/ThePersonCard.vue";
import TheFrameworks from "@/components/TheFrameworks.vue";
import TheAsset from "@/components/TheAsset.vue";

const projectsStore = useProjectsStore();
const { solutions, loading } = storeToRefs(projectsStore);
const route = useRoute();

let id = route.params.id;
const solution = computed<Solution>(() => {
  const ret = solutions.value.find((solution) => solution.solutionID === id);
  return ret;
});

const strip = (html) => {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const environmentUrls = computed(() =>
  solution.value.environments.flatMap((env) => env.content.environmentUrls)
);

const environments = computed<EnvironmentContent[]>(() =>
  solution.value.environments.map((env) => env.content)
);

const tabRef = ref<string | null>(null);

const tab = computed<string | null>({
  get() {
    if (tabRef.value || environments.value.length === 0) {
      return tabRef.value;
    }
    return environments.value.at(0).environmentName;
  },
  set(value) {
    tabRef.value = value;
  },
});

const configs = [
  {
    name: "debug",
    status: true,
  },
  {
    name: "https",
    status: false,
  },
  {
    name: ".net",
    status: ".NETCoreApp,Version=v6.0",
  },
];

const detailsProgressValue = 60;
const detailsProgressColor = "warning";

// https://solutions.novicell-cph.dk/umbraco#/content/content/edit/1250
</script>

<template>
  <div v-if="solution">
    <div
      class="flex justify-between items-center bg-white q-pa-lg rounded-borders"
    >
      <div class="flex items-center q-gutter-md">
        <a :href="`/projects`">
          <q-btn
            padding="md"
            color="black"
            unelevated
            outline
            icon="arrow_back"
          ></q-btn>
        </a>
        <div class="text-h4 text-weight-bold">{{ solution.name }}</div>
        <!-- <div class="self-start">
          <div class="text-weight-medium">Details Progress</div>
          <div class="flex items-center q-mt-xs">
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
            <div class="q-ml-sm flex items-center">
              <q-icon size="16px" name="more_vert"></q-icon>
              <div>Continue to fill-in details</div>
            </div>
          </div>
        </div> -->
        <!-- <div class="self-start">
          <div class="text-weight-medium">Pingdom</div>
          <q-chip color="green-1 q-mt-xs" text-color="green-8">
            Site is up
          </q-chip>
        </div> -->
      </div>

      <div class="flex items-center">
        <div class="q-mr-xl text-grey-7">Edited last on Thu 09:04</div>
        <q-btn
          outline
          :unelevated="true"
          label="Edit solution"
          icon="edit"
          padding="md"
          color="red"
          target="_blank"
          :href="`https://solutions.novicell-cph.dk/umbraco#/content/content/edit/${solution.solutionID}`"
        ></q-btn>
      </div>
    </div>

    <div class="row q-mt-lg q-col-gutter-x-md">
      <div class="col-4">
        <q-card flat class="column">
          <q-card-section class="flex column">
            <div class="text-h5 text-weight-medium">Customer</div>
            <div class="flex items-center q-gutter-md q-mt-xs">
              <q-avatar
                color="red"
                class="text-white text-weight-medium"
                size="lg"
              >
                {{ solution.customer.view.name[0] }}
              </q-avatar>
              <div class="text-h6 text-weight-medium">
                {{ solution.customer.view.name }}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5 text-weight-medium">Project description</div>
            <div>
              {{ strip(solution.projectDescription) }}
            </div>
          </q-card-section>
        </q-card>

        <q-card flat class="q-my-lg">
          <q-card-section>
            <div class="text-h5 text-weight-medium">Novicell assets</div>
            <div class="flex q-gutter-md items-center">
              <div class="text-h6">Project</div>
              <div v-for="project in solution.projects" :key="project">
                {{ project.novicellAssets.view.name }}
              </div>
            </div>
            <div class="flex">
              <template v-for="project in solution.projects" :key="project">
                <TheAsset
                  :url="project.novicellAssets.view.hqprojectId"
                  name="HQ Project"
                />
                <TheAsset
                  :url="project.novicellAssets.view.jiraId"
                  name="Jira Project"
                />
                <TheAsset
                  :url="project.novicellAssets.view.confluenceId"
                  name="Confluence Project"
                />
              </template>
              <TheAsset
                v-for="asset in solution.solutionUrls"
                :key="asset.url"
                v-bind="asset"
              />
              <TheAsset
                v-for="enviromentUrl in environmentUrls"
                :key="enviromentUrl"
                v-bind="enviromentUrl"
              />
            </div>
            <div>
              <div class="text-h6">Code Repo</div>
              <TheAsset :url="solution.repositoryUrl" name="Code Repo" />
            </div>
          </q-card-section>
        </q-card>

        <q-card flat class="q-my-lg" v-if="solution.frameworks.length">
          <q-card-section>
            <div class="text-h5 text-weight-medium">Frameworks</div>
            <q-card-section class="framework__wrapper no-padding q-mt-md">
              <TheFrameworks
                class="framework__card"
                :frameworks="solution.frameworks"
              />
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-card flat>
          <q-card-section class="flex column">
            <div class="text-h5 text-weight-medium">Persons</div>
            <ThePersonCard
              v-if="solution.projectManager?.view"
              title="Project Manager"
              v-bind="solution.projectManager?.view"
            />
            <ThePersonCard
              v-if="solution.techcontact?.view"
              title="Tech Contact"
              v-bind="solution.techcontact?.view"
            />
            <ThePersonCard
              v-if="solution.customerContact?.view"
              title="Customer Contact"
              v-bind="solution.customerContact?.view"
            />
          </q-card-section>
        </q-card>

        <q-card flat v-if="solution.configValues.length" class="q-my-lg">
          <q-card-section>
            <div class="text-h5">Config values</div>
            <q-list class="q-py-md" separator>
              <q-item v-for="config in configs" v-ripple :key="config.name">
                <q-item-section>
                  <q-item-label caption> {{ config.name }}</q-item-label>
                  <q-item-label> {{ config.status }} </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat>
          <q-tabs
            v-model="tab"
            active-color="white"
            active-bg-color="black"
            class="text-red flex items-start justify-start"
            indicator-color="transparent"
            no-caps
            align="left"
          >
            <q-tab
              v-for="tabOption in environments"
              :key="tabOption"
              :name="tabOption.environmentName"
              :label="tabOption.environmentName"
              v-bind="tabOption"
            ></q-tab>
            <q-btn
              class="content-end"
              outline
              color="black absolute-right"
              icon="add"
              label="Add Enviroment"
              no-caps
              target="_blank"
              :href="`https://solutions.novicell-cph.dk/umbraco#/content/content/edit/${solution.solutionID}`"
            ></q-btn>
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel
              :name="tabPanel.environmentName"
              v-for="tabPanel in environments"
              :key="tabPanel"
            >
              <div class="q-py-xl">
                <div class="text-h5">{{ tabPanel.environmentName }}</div>
                <div
                  class="text-subtitle1"
                  :innerHTML="tabPanel.environmentDescription"
                />
                <template v-for="project in solution.projects" :key="project">
                  <q-btn
                    icon="open_in_new"
                    color="dark-grey"
                    :label="project.name"
                    :href="project.url"
                    outline
                    rounded
                  ></q-btn
                ></template>
              </div>

              <q-separator></q-separator>

              <div class="q-py-xl">
                <div class="text-h5">Dev environment</div>
                <template
                  v-for="localhost in solution.projects"
                  :key="localhost"
                >
                  <q-btn
                    color="dark-grey"
                    icon="open_in_new"
                    :label="localhost.name"
                    :href="localhost.url"
                    outline
                    rounded
                  ></q-btn
                ></template>
              </div>

              <q-separator></q-separator>

              <div class="q-py-xl">
                <div class="text-h5">Hosting setup</div>
                <div
                  class="text-subtitle1"
                  :innerHTML="tabPanel.hostingSetup"
                />
              </div>

              <q-separator></q-separator>

              <div class="q-py-xl">
                <div class="text-h5">Hosting access</div>
                <div
                  class="text-subtitle1"
                  :innerHTML="tabPanel.hostingAccess"
                />
              </div>

              <q-separator></q-separator>

              <div class="q-py-xl">
                <div class="text-h5">Build setup</div>
                <div class="text-subtitle1" :innerHTML="tabPanel.buildSetup" />
                <template
                  v-for="buildSetup in tabPanel.buildSetupLink"
                  :key="buildSetup"
                >
                  <q-btn
                    icon="open_in_new"
                    color="dark-grey"
                    :label="buildSetup.name"
                    :href="buildSetup.url"
                    outline
                    rounded
                  ></q-btn>
                </template>
              </div>

              <q-separator></q-separator>

              <div class="q-py-xl">
                <div class="text-h5">Deploy setup</div>
                <div class="text-subtitle1" :innerHTML="tabPanel.deploysetup" />
                <template
                  v-for="deploySetup in tabPanel.deploySetupLink"
                  :key="deploySetup"
                >
                  <q-btn
                    icon="open_in_new"
                    color="dark-grey"
                    :label="deploySetup.name"
                    :href="deploySetup.url"
                    outline
                    rounded
                  ></q-btn>
                </template>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
