<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel SPA Dashboard</div>

                    <div class="card-body">
                        You are logged in as {{ this.userStore.user.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapStores } from "pinia";
import useUserStore from "@/stores/user";
export default {
    name: "Dashboard",
    computed: {
        ...mapStores(useUserStore),
    },
};
</script>
