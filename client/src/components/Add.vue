<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add Tenant</h1>
    <form v-on:submit="addTenant">
        <div class="well">
            <h4>Tenant Info</h4>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="tenant.name">
            </div>
        </div>
        <div class="well">
            <h4>Tenant Contact</h4>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="tenant.email">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" placeholder="Phone" v-model="tenant.phone">
            </div>
        </div>

        <div class="well">
            <h4>Tenant Location</h4>
            <div class="form-group">
                <label>Address</label>
                <input type="text" class="form-control" placeholder="Address" v-model="tenant.address">
            </div>
        </div>
        <div class="well">
            <h4>Tenant Financials</h4>
            <div class="form-group">
                <label>Debt</label>
                <input type="number" class="form-control" placeholder="Debt" v-model="tenant.debt">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
    import Alert from './Alert'
    export default {
    name: 'add',
    data () {
        return {
        tenant: {},
        alert:''
        }
    },
    methods: {
        addTenant(e){
            if(!this.tenant.name || !this.tenant.address || !this.tenant.email){
                this.alert = 'Please fill in all Required Fields';
            } else {
                let newTenant = {
                    name: this.tenant.name,
                    phone: this.tenant.phone,
                    email: this.tenant.email,
                    address: this.tenant.address,
                    debt: this.tenant.debt
                }

                this.$http.post('http://localhost:3000/api/tenants/', newTenant)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Tenant Added'}});
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    components: {
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
