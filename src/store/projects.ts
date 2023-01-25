import { ProjectsResponse, Solution } from '@/types/base';
import axios from 'axios';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
export const useProjectsStore = defineStore('ProjectsStore', function () {
  const solutions = ref<Solution[]>([] as Solution[]);
  const loading = ref(false);

  async function fetchProjects() {
    loading.value = true;
    try {
      const response = await axios.get<ProjectsResponse>(
        'https://delivery.enterspeed.com/v1?url=%2Fsolutions%2F',
        {
          headers: {},
        }
      );
      const finalSolutions = response.data.route.Solutions.map((solution) => {
        solution.solutionID = solution.solutionID.replace('-en-us', '');
        return solution;
      });
      solutions.value = finalSolutions;
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  }
  fetchProjects();
  return { solutions, loading, fetchProjects };
});
