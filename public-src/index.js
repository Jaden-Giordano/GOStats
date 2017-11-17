import Vue from 'vue/dist/vue.esm';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import routes from './routes';

Vue.use(ElementUI);

const router = new VueRouter({ routes });

new Vue({
	el: '#app',
	router
});
