<template>
    <div class="login">
        <Row>
            <Col class="login-panel" :xs="24" :md="{ span: 8, offset: 8 }">
                <div class="title">管理后台</div>
                <div class="username depart">
                    <Input  v-model="username" clearable>
                        <span slot="prepend">用户名</span>
                    </Input>
                </div>
                <div class="password depart">
                    <Input  v-model="pw" clearable type="password">
                        <span slot="prepend">密码</span>
                    </Input>
                </div>
                <Button class="depart" type="primary" @click="login()">登录</Button>
                <Button class="btn-right depart" @click="reg()">注册</Button>
                <div id="fail" class="depart">
                    <span v-html="failMsg"></span>
                </div>
                <div id="success" class="depart">
                    <span v-html="successMsg"></span>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import utils from "../assets/utils.js"

export default {

    data () {
        return {
            username: '',
            pw: '',
            url: 'http://127.0.0.1:8888/auth/login',
            failMsg: null,
            successMsg: null,
        }
    },
    methods: {
        login: function() {
            if (this.username === '' || this.pw === '') {
                this.failMsg = 'Username and Password can not be empty'
                return
            }
            this.$http.post(
                this.url,
                {
                    username: this.username,
                    pw: this.pw
                },
                {emulateJSON:true}
            ).then(function(res){
                console.log(res);
                if (res.data.status != 200) {
                    this.failMsg = res.data.msg
                } else {
                    this.successMsg = 'Login success. Loading...'
                    utils.setCookie('token', res.data.token, res.data.expires)
                    utils.setCookie('username', this.username)
                    // console.log(utils.getCookie('token'));
                    this.$emit('login', {
                        username: this.username,
                        options: res.data.options
                    })
                }
            })
        },
        reg: function() {
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped>
.login-panel {
    margin-top: 10rem;    
}

</style>

<style>
.depart {
    margin-top: 1rem;
}
.title {
    font-size: 2rem;
    color: #464c5b;
    font-family: 'PingFang SC'
}
.btn-right {
    margin-left: 1rem;
}
#fail {
    text-align: left;
    color: red;
}
#success {
    text-align: left;
    color: green;
}
</style>

