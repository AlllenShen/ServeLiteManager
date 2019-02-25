<template>
    <div class="table-reg">
        <Button type="primary" @click="test()">test</Button>
    </div>
</template>

<script>
import utils from '../assets/utils.js'
export default {
    data () {
        return {
            mod: null,
            url: 'http://127.0.0.1:8888/auth/info/module_info',
            fields: []
        }
    },
    methods: {
        test () {
            this.$http.post(
                this.url,
                {
                    token: utils.getCookie('token'),
                    username: 'test'
                },
                {emulateJSON:true}
            ).then(function (res) {
                console.log(res.data);
            })
        }
    }
}
</script>

