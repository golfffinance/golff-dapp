import Vue from 'vue'
import i18n from '../plugins/i18n'

Vue.prototype.eleMessage = 'ERROR';
setInterval(()=>{
    Vue.prototype.eleMessage = 'ERROR';
},3000);
const handler = (error) => {
    console.log(error)
    let message;
    if (error && error.code) {
        switch (error.code) {
            case 50009: 
                message = i18n.t('message.newWorkError1')
                break;
            case 4001:
                message = i18n.t('message.UserRejected')
                break;
            case -32602:
                message = i18n.t('message.InvalidParam')
                break;
            case -32603:
                message = i18n.t('message.InternalError')
                break;
            default:
                message = error.message || error;
                break;
        }
    }
    if(Vue.prototype.eleMessage != message){
        Vue.prototype.eleMessage = message;
        Vue.prototype.$message.error(message || 'ERROR');
    }
    
};
export default handler;
