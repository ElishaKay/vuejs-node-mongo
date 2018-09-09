<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit Customer</h1>
    <form v-on:submit="updateCustomer">
        <div class="well">
            <h4>Customer Info</h4>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="customer.name">
            </div>
        </div>
        <div class="well">
            <h4>Customer Contact</h4>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="customer.email">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" placeholder="Phone" v-model="customer.phone">
            </div>
        </div>

        <div class="well">
            <h4>Customer Location</h4>
            <div class="form-group">
                <label>Address</label>
                <input type="text" class="form-control" placeholder="Address" v-model="customer.address">
            </div>
        </div>
         <div class="well">
            <h4>Customer Financials</h4>
            <div class="form-group">
                <label>Debt</label>
                <input type="number" class="form-control" placeholder="Debt" v-model.number="customer.debt">
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
        customer: {},
        alert:''
        }
    },
    methods: {
        fetchCustomer(id){
            this.$http.get('http://localhost:3000/api/tenants/'+id)
            .then(function(response){
                this.customer = response.body.tenant;
            });
        },
        updateCustomer(e){
            if(!this.customer.name || !this.customer.email){
                this.alert = 'Please fill in all required fields';
            } else {
                let updCustomer = {
                    name: this.customer.first_name,
                    phone: this.customer.phone,
                    email: this.customer.email,
                    address: this.customer.address,
                    debt: this.customer.debt
                }

                this.$http.put('http://localhost:3000/api/tenants/'+this.$route.params.id, updCustomer)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Customer Updated'}});
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchCustomer(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
