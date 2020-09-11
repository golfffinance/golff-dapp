import Vue from 'vue'
Vue.mixin({
    data () {
        return {
            
        }
    },
    methods: {
        routerReload () {
            this.$store.commit('updateIsRouterAlive', false)
            this.$nextTick(()=> {
                this.$store.commit('updateIsRouterAlive', true)
            })
        }
    },
})
