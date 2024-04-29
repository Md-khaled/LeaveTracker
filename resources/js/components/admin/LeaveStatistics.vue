<template>
    <div class="container mt-5">
        <h1>Leave Request Dashboard</h1>
        <div class="row mt-4">
            <div class="col-md-3" v-for="(stat, index) in stats" :key="index">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ stat.title }}</h5>
                        <p class="card-text">{{ stat.value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stats: [
                { title: 'Total Requests', value: 'Loading...' },
                { title: 'Pending Requests', value: 'Loading...' },
                { title: 'Approved Requests', value: 'Loading...' },
                { title: 'Rejected Requests', value: 'Loading...' }
            ]
        };
    },
    methods: {
        // Function to fetch data and update dashboard
        fetchData() {
            // Simulated API call
            setTimeout(() => {
                // Replace with actual data fetching logic
                const dummyData = {
                    totalRequests: 100,
                    pendingRequests: 30,
                    approvedRequests: 50,
                    rejectedRequests: 20
                };

                // Update dashboard with fetched data
                this.stats[0].value = dummyData.totalRequests;
                this.stats[1].value = dummyData.pendingRequests;
                this.stats[2].value = dummyData.approvedRequests;
                this.stats[3].value = dummyData.rejectedRequests;
            }, 1000); // Adjust the delay as needed
        }
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style>
/* Add your custom styles here */
</style>
