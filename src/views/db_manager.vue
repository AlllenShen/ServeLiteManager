<template>
    <div class="db-manager">
        <Row>
            <Col span="20" offset="2">
                <div v-for="table in tables" class="depart">
                    <tableDisplay :displayInfo="displayInfo" :data="table"></tableDisplay>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import tableDisplay from '../components/table_display.vue'

export default {
    name: 'dbManager',
    props: {
        options: Array,
    },
    components: {
        tableDisplay,
    },
    data () {
        return {
            displayInfo: { // 展示信息 key:name value:显示内容
                tableInfo: {
                    id: 'id',
                    owner_id: 'owner_id',
                    sensitivity: 'sensitivity',
                    description: 'description',
                    status: 'status',
                    note: 'note',
                },
                fields: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'Description',
                        key: 'description'
                    },
                    {
                        title: 'Sensitivity',
                        key: 'sensitivity'
                    },
                    {
                        title: 'Note',
                        key: 'note'
                    },
                    {
                        title: 'ForeignKey',
                        key: 'foreignkey'
                    },
                ],
            }, // 顺序决定排序
            tables: [
                {
                    info: {
                        id: 'id',
                        name: 'name',
                        owner_id: 'owner_id',
                        sensitivity: 'sensitivity',
                        description: 'description',
                        status: 'status',
                        note: 'note',
                    },
                    fields: [
                        {
                            id: '1',
                            name: 'name',
                            description: 'description',
                            note: 'note',
                            sensitivity: 'sensitivity'
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.db-manager {
    margin-top: 2rem;
}
</style>
