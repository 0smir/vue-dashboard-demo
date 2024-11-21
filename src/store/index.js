import { createStore } from 'vuex';
import { createWebHistory } from 'vue-router';


import tasksModule from './tasks/index.js';
import peopleModule from './people/index.js';
import projectsModule from './projects/index.js';
import boardsModule from './boards/index.js';
import usersModule from './users/index.js';

const store = createStore({
    history: createWebHistory(),
    modules: {
        tasks: tasksModule,
        people: peopleModule,
        projects: projectsModule,
        boards: boardsModule,
        users: usersModule
    }

});

export default store;
