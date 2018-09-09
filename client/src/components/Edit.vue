<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Tenant</h1>
    <form v-on:submit="updateTenant">
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
                <input type="number" class="form-control" placeholder="Debt" v-model.number="tenant.debt">
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
        fetchTenant(id){
            this.$http.get('http://localhost:3000/api/tenants/'+id)
            .then(function(response){
                this.tenant = response.body.tenant;
            });
        },
        updateTenant(e){
            if(!this.tenant.name || !this.tenant.email){
                this.alert = 'Please fill in all required fields';
            } else {
                let updTenant = {
                    name: this.tenant.name,
                    phone: this.tenant.phone,
                    email: this.tenant.email,
                    address: this.tenant.address,
                    debt: this.tenant.debt
                }

                this.$http.put('http://localhost:3000/api/tenants/'+this.$route.params.id, updTenant)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Tenant Updated'}});
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchTenant(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
