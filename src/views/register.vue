<template>
    <div class="register">
        <Row>
            <Col class="register-panel" :xs="24" :md="{ span: 8, offset: 8 }">
                <div class="title">注册</div>
                
                <Form class="depart" ref="regData" :rules="rule" :model="regData" label-position="left">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="regData.username"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="pw">
                        <Input v-model="regData.pw" type="password"></Input>
                    </FormItem>
                    <FormItem label="email" prop="email">
                        <Input v-model="regData.email"></Input>
                    </FormItem>
                    <FormItem label="Phone" prop="phone">
                        <Input v-model="regData.phone"></Input>
                    </FormItem>
                    <FormItem>
                        <Button class="depart" type="primary" @click="submmit()">提交</Button>
                        <Button class="btn-right depart" @click="back()">返回登录</Button>
                    </FormItem>
                </Form>
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
export default {
    data() {
        return {
            regData: {
                username: 'test',
                pw: 'test',
                email: 'test@test.com', 
                phone: null
            },
            rule: {
                username: [
                    { required: true, pattern: /^[a-zA-Z]\w{3,15}$/ig, message: 'username cannot be empty', trigger: 'blur' }
                ],
                pw: [
                    { required: true, message: 'password cannot be empty', trigger: 'blur'}
                ],
                email: [
                    { required: true, type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],
                phone: [
                    { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: 'Incorrect Phone number format', trigger: 'blur' }
                ]
            },
            failMsg: '',
            successMsg: '',
            url: 'http://127.0.0.1:8888/auth/register_user',
        }
    },
    methods: {
        back: function () {
            this.$router.push('/login')
        },
        submmit: function () {
            this.$refs['regData'].validate((valid) => {
                if (valid) {
                    this.$http.post(
                        this.url,
                        {
                            //key: 1, // 动态加密传输使用
                            regData: JSON.stringify(this.regData) // json编码后方便flask获取
                        },
                        {emulateJSON:true}
                    ).then(function(res) {
                        if (res.data.status === 200) {
                            this.$Message.success({
                               content: res.data.msg,
                               duration: 5
                            } );
                            this.successMsg = '5s后跳转至登录...'
                        } else {
                            this.$Message.error({
                               content: res.data.msg,
                               duration: 5
                            } );
                        }
                            
                    })
                    
                } else {
                    this.$Message.error('Fail!');
                }
            })
            
        }
    }
}
</script>


<style scoped>
.register-panel {
    margin-top: 8rem;    
}

.props {
    font-size: 14px;
    color: #24292e;
    text-align: left;
    font-weight: 600;
}
</style>

