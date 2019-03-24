<template>
<div class="home">
    <Row>
        <Col span="4">
            <Menu :theme="theme" accordion width="auto" @on-select="onSelect">
                <div class="user">
                    User: {{username}} <br>
                    <Button type="error" @click="logoff()">注销</Button>
                </div>

                <div v-for="item in opts">
                    <MenuItem v-if=" !item.sub " :name="item.key">{{item.title}}</MenuItem>
                    <Submenu v-else :name="item.key">
                        <template slot="title">
                            {{item.title}}
                        </template>
                        <MenuItem v-for="subItem in item.sub" :name="subItem.key">{{subItem.title}}</MenuItem>
                    </Submenu>
                </div>
            </Menu>
        </Col>
        <Col span="20">
            <div>
                <router-view></router-view>
            </div>
        </Col>
    </Row> 
</div>
</template>

<script>
import utils from '../assets/utils.js'
import opts from '../assets/option.js'

export default {
    name: 'home',
    props: {
        userInfo: Object,
        username: String,
        options: Array,
    },
    data () {
        return {
            theme: 'light',
            opts: opts
        }
    },
    methods: {
        logoff () {
            this.$emit('logoff')
        },
        onSelect (name) {
            this.$router.push({
                name: name,
                params: { 
                    options: this.options,
                    userInfo: this.userInfo 
                }
            })
        }
    },
}
</script>

<style scoped>
.side {
  position: fixed;
  left: 0;
  width: 25%; /* 1/4宽度 使用offset-6右移即可 */
  height: 100%;
}
</style>
