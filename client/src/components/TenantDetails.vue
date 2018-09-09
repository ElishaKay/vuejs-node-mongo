<template>
  <div class="details container">
    <router-link to="/">Back</router-link>
    <h1 class="page-header">{{tenant.name}} 
        <span class="pull-right">
            <router-link class="btn btn-primary" v-bind:to="'/edit/'+tenant.id">Edit</router-link>
            <button class="btn btn-danger" v-on:click="deleteTenant(tenant.id)">Delete</button>
            </span>
    </h1>
    <ul class="list-group">
            <li class="list-group-item"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span> {{tenant.phone}}</li>
            <li class="list-group-item"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> {{tenant.email}}</li>
        </ul>

        <ul class="list-group">
            <li class="list-group-item"><strong>Address: </strong>{{tenant.address}}</li>
            <li class="list-group-item"><strong>Debt: </strong>{{tenant.debt}}</li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'tenantdetails',
  data () {
    return {
      tenant: ''
    }
  },
  methods:{
      fetchTenant(id){
          this.$http.get('http://localhost:3000/api/tenants/'+id)
          .then(function(response){
            console.log(response.body)
            this.tenant = response.body.tenant;
          });
      },
      deleteTenant(id){
          this.$http.delete('http://localhost:3000/api/tenants/'+id)
          .then(function(response){
            this.$router.push({path: '/', query: {alert: 'Tenant Deleted'}});
          });
      }
  },
  created: function(){
      this.fetchTenant(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
