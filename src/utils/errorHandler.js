import Vue from 'vue'
const handler = (error) => {
    console.log(error)
    let message = error.message || 'ERROR';
    Vue.prototype.$message.error(message);
};
export default handler;
