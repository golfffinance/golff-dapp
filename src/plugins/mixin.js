import Vue from 'vue'
Vue.mixin({
    data () {
        return {
            isRouterAlive: true
        }
    },
    methods: {
        routerReload () {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        }
    },
})
