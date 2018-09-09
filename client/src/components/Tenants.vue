<template>
  <div class="tenants container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Tenants</h1>

    <section>
      <h3>Filter by debt</h3>
      <input type="radio" v-model="search" value="allTenants"> All Tenants
      <input type="radio" v-model="search" value="withDebt"> Tenants with Debt
      <input type="radio" v-model="search" value="withNoDebt"> Tenants with No Debt
      <br />
      <br />
    </section>

    <input class="form-control" placeholder="Enter Name" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Debt</th>
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
        filterInput:'',
        search: 'allTenants'
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
        switch(this.search) {
          case 'allTenants':
              return list.filter(function(tenant){
                return tenant.name.indexOf(value) > -1;
              });
              break;
          case 'withDebt':
              return list.filter(function(tenant){
                return tenant.name.indexOf(value) > -1 && tenant.debt != 0; 
              });
          case 'withNoDebt':
              return list.filter(function(tenant){
                return tenant.name.indexOf(value) > -1 && tenant.debt === 0; 
              });
          default:
              break;
        }
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
