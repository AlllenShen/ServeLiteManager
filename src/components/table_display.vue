<template>
    <div class="table-display">
        <Card style="text-align: left;" :title="data.info.name">
            <div slot="extra">
                <Button @click="showData('tablename')" type="primary">show data</Button>
                <ButtonGroup v-if="changed">
                    <Button type="primary">提交修改</Button>
                    <Button>取消修改</Button>
                    <Button type="info">修改内容</Button>
                </ButtonGroup>
            </div>
            <div class="table-info-item" v-for="(title, key) in displayInfo.tableInfo">
                <span class="table-info-key">{{title}}:</span>
                <span v-if="key == editKey">
                    <Input :value="editValue" class="edit" size="small"></Input>
                    <ButtonGroup>
                        <Button type="primary" size="small" @click="comfirm()">确定</Button>
                        <Button type="error" size="small" @click="cancel()">取消</Button>
                    </ButtonGroup>
                </span>
                <span v-else>
                    {{data.info[key]}}
                    <a><Icon @click="edit(key)" type="ios-create-outline" style="margin-left=5px" /></a>
                </span>
            </div>
            <Table class="depart" :columns="displayInfo.fields" :data="data.fields"></Table>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'tableDisplay',
    props:{
        displayInfo: Object,
        data: Object,
    },
    data () {
        return {
            editHoverColor: '#0099ee',
            editKey: '',
            editValue: '',
            changed: false,
            editLog: {
                tableInfo: {},
                fields: {},
                data: {},
            }
        }
    },
    methods: {
        edit (key) {
            // console.log(key);
            this.editKey = key
            this.editValue = key
        },
        cancel () {
            this.editKey = ''
            this.editValue = ''
        },
        comfirm () {
            this.changed = true
            this.editLog.tableInfo[this.editKey] = {
                before: this.displayInfo.tableInfo[this.editKey],
                after: this.editValue
            }
            console.log(this.editLog.tableInfo);
        },
        showData (table) {
            window.open("/home/test/db_manager/show/" + table);
        }
    }
}
</script>

<style scoped>
.table-info-key {
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
}

.edit {
    width: 10%;
    margin-left: 5px;
    margin-right: 5px;
}

</style>
