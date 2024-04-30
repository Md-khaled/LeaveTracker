<template>
    <div class="container mt-5">
        <h1>Leave Request Dashboard </h1>
        <div class="row mt-4">
            <div class="col-md-3" v-for="(statistic, index) in statistics" :key="index">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ statistic.title }}</h5>
                        <p class="card-text">{{ statistic.value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, onMounted, watch, ref} from 'vue';
import {useLeaveStore} from '@/stores/leaves';
import {storeToRefs} from "pinia";

export default {
    setup() {
        const statisticsData = ref([]);
        const statistics = reactive([
            {title: 'Total Requests', value: 'Loading...'},
            {title: 'Pending Requests', value: 'Loading...'},
            {title: 'Approved Requests', value: 'Loading...'},
            {title: 'Rejected Requests', value: 'Loading...'}
        ]);

        const leaveStore = useLeaveStore();

        const fetchData = async () => {
            try {
                await leaveStore.fetchLeaveStatistics();
                statisticsData.value = leaveStore.statistics;

                statistics[0].value = statisticsData.value.total_request ?? 'N/A';
                statistics[1].value = statisticsData.value.pending ?? 'N/A';
                statistics[2].value = statisticsData.value.approved ?? 'N/A';
                statistics[3].value = statisticsData.value.rejected ?? 'N/A';
            } catch (error) {
                console.error('Error fetching leave data:', error);
            }
        };

        onMounted(() => {
            fetchData();
        });

        // watch(leaveStore, () => {
        //     fetchData();
        // });

        return {statistics};
    }
};
</script>

<style>
/* Add your custom styles here */
</style>
