<template>
    <div class="card">
        <div class="card-header">
            <h2>Add Leave Request</h2>
            <button type="button" class="close" @click="$emit('close')">&times;</button> </div>
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="type" class="form-label">Leave Type</label>
                    <select v-model="form.type" id="status" class="form-select">
                        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="start_date" class="form-label">Start Date</label>
                    <input
                        type="date"
                        v-model="form.start_date"
                        id="start_date"
                        class="form-control"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="end_date" class="form-label">End Date</label>
                    <input
                        type="date"
                        v-model="form.end_date"
                        id="end_date"
                        class="form-control"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="reason" class="form-label">Reason (Optional)</label>
                    <textarea v-model="form.reason" id="reason" class="form-control" rows="3"></textarea>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
<!--                <div v-if="errors" class="alert alert-danger mt-3" role="alert">-->
<!--                    <ul>-->
<!--                        <li v-for="error in errors" :key="error">{{ error }}</li>-->
<!--                    </ul>-->
<!--                </div>-->
            </form>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLeaveStore } from '@/stores/leaves';

export default {
    props: [],
    setup(props, context) {
        const leaveStore = useLeaveStore();
        const {statuses, types} = storeToRefs(leaveStore)
        leaveStore.fetchStatuses();
        leaveStore.fetchLeaveTypes();

        const form = ref({
            user_id: null,
            type: '',
            start_date: null,
            end_date: null,
            reason: null,
            status: null,
        });


        console.log('here',leaveStore.statuses)
        const handleSubmit = async () => {
            // await leaveStore.createLeave(form.value);
            context.emit('submitted', form.value);
            form.value = {
                user_id: null,
                type: '',
                start_date: null,
                end_date: null,
                reason: null,
                status: null,
            };
        };

        return {
            form,
            leaveStore,
            statuses, types,
            handleSubmit,
        };
    },
};
</script>
