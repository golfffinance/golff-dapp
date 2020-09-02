import Vue from 'vue'
import { Notification, Message, Carousel, CarouselItem, Dialog, Tooltip } from 'element-ui';

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
