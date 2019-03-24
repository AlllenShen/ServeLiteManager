<template>
    <div id="app">
        <router-view @login="login_success" @logoff="logoff"></router-view>
    </div>
</template>

<script>
import utils from './assets/utils.js'

export default {
    data() {
        return {
            username: '',
            options: null,
            userInfo: null,
            url: 'http://127.0.0.1:8888/auth/login',
        }
    },
    created: function() {
        var token = utils.getCookie('token')
        if (token === null) {
            this.$router.push('/login')
        }
        this.username = utils.getCookie('username')
        this.$http.post(
            this.url,
            {
                username: this.username,
                token: token
            },
            {emulateJSON:true}
        ).then(function(res){
            console.log(res);
            if (res.data.status != 200) {
                this.$router.push('/login')
            } else {
                utils.setCookie('token', res.data.token, res.data.expires)
                utils.setCookie('username', this.username)
                utils.setCookie('userInfo', res.data.user_info)
                this.userInfo = res.data.user_info
                console.log(res.data.options);
                /* Bug:
                    直接访问/home/username不会出现边侧导航
                 */
                this.$router.push({ 
                    name: 'home', 
                    params: { 
                        username: this.username,
                        options: res.data.options,
                        userInfo: res.data.user_info
                    }
                })
            }
        })
    },
    methods: {
        login_success (login_state) {
            this.username = login_state.username
            this.options = login_state.options
            console.log(login_state);
            this.$router.push({ 
                name: 'home', 
                params: { 
                    username: this.username,
                    options: login_state.options,   
                }
            })
        },
        logoff () {
            utils.delCookie(this.username)
            utils.delCookie('token')
            this.$router.push('/login')
        }
    }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
