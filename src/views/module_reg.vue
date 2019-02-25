<template>
    <div class="module_reg">
        <Row>
            <Col span="16" offset="4">
                <Form :model="regForm" :rules="rules">
                    <FormItem label="模块名称" prop="name">
                        <Input v-model="regForm.name"></Input>
                    </FormItem>
                    <FormItem label="模块描述" prop="description">
                        <Input v-model="regForm.description"></Input>
                    </FormItem>
                    <FormItem label="服务入口" prop="server_entry">
                        <Input v-model="regForm.server_entry"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="submit()">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            url: 'http://127.0.0.1:8888/auth/register_module',
            regForm: {
                auth_id: this.userInfo.id,
                name: null,
                description: null,
                serve_entry: null,
            },
            rules: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: 'The description cannot be empty', trigger: 'blur' }
                ],
                server_entry: [
                    { required: true, message: 'The server_entry cannot be empty', trigger: 'blur' }
                ],
            }
        }
    },
    props: {
        userInfo: Object,
    },
    methods: {
        submit () {
            this.$http.post(
                this.url,
                this.regForm,
                {emulateJSON:true}
            ).then(function (res) {
                console.log(res);
            })
        }
    }
}
</script>

