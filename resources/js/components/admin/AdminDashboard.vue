<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel SPA Admin Dashboard</div>

                    <div class="card-body">
                        You are logged in as {{ this.adminStore.user.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapStores } from "pinia";
import useAdminStore from "@/stores/admin/adminAuth";
export default {
    name: "Admin Dashboard",
    computed: {
        ...mapStores(useAdminStore),
    },
};
</script>
