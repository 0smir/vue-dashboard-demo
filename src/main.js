import { createApp } from 'vue';

import router from './router';
import store from '@/store/index.js';
import clickOutsideEvent from '@/click-outside-directives';

import './assets/styles/main.scss';


import BaseButton from '@/components/UI/base-components/BaseButton.vue';
import BaseDialog from '@/components/UI/base-components/BaseDialog.vue';
import BaseSpinner from '@/components/UI/base-components/BaseSpinner.vue';
import SvgIcon from '@/components/UI/base-components/SvgIcon.vue';
import BaseDetails from '@/components/UI/base-components/BaseDetails.vue';
import BaseDropdown from '@/components/UI/base-components/BaseDropdown.vue';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.directive('click-outside', clickOutsideEvent);


app.component('BaseButton', BaseButton);
app.component('BaseDialog', BaseDialog);
app.component('BaseSpinner', BaseSpinner);
app.component('SvgIcon', SvgIcon);
app.component('BaseDetails', BaseDetails);
app.component('BaseDropdown', BaseDropdown);

app.mount('#app');
