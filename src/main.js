import { createApp } from 'vue';

import router from './router';
import store from '@/store/index.js';

import './assets/styles/main.scss';


import BaseButton from '@/components/UI/base-components/BaseButton.vue';
import BaseDialog from '@/components/UI/base-components/BaseDialog.vue';
import BaseSpinner from '@/components/UI/base-components/BaseSpinner.vue';
import SvgIcon from './components/UI/base-components/SvgIcon.vue';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(store);


app.component('BaseButton', BaseButton);
app.component('BaseDialog', BaseDialog);
app.component('BaseSpinner', BaseSpinner);
app.component('SvgIcon', SvgIcon);

app.mount('#app');
