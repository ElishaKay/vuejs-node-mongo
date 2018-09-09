<template>
  <div class="tenants container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Tenants</h1>
    <input class="form-control" placeholder="Enter Name" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Debt</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tenant in filterBy(tenants, filterInput)">
            <td>{{tenant.name}}</td>
            <td>{{tenant.address}}</td>
            <td>{{tenant.email}}</td>
            <td>{{tenant.debt}}</td>
            <td><router-link class="btn btn-default" v-bind:to="'/tenant/'+tenant.id">View</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    name: 'tenants',
    data () {
      return {
        tenants: [],
        alert:'',
        filterInput:''
      }
    },
    methods: {
      fetchTenants(){
        this.$http.get('http://localhost:3000/api/tenants/')
          .then(function(response){
            this.tenants = response.data.tenants;
          });
      },
      filterBy(list, value){
        return list.filter(function(tenant){
          return tenant.name.indexOf(value) > -1;
        });
      }
    },
    created: function(){
      this.fetchTenants();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
