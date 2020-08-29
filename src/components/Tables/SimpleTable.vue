<template>
  <div>
    <md-table v-model="products" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Code">{{ item.product_code }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.product_name }}</md-table-cell>
        <md-table-cell md-label="Import date">{{ item.input_date }}</md-table-cell>
        <md-table-cell md-label="Import price">{{ item.input_price }}</md-table-cell>
        <md-table-cell md-label="Amount">{{ item.input_quantity }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button class="md-icon-button md-raised md-primary"><md-icon>edit</md-icon></md-button>
          <md-button class="md-icon-button md-raised md-accent"><md-icon>delete</md-icon></md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axiosInstance from '../../configs/http-commons';
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      products: []  
    };
  },
  mounted() {
    axiosInstance.get("/products/getAll")
      .then(resp => {
          this.products = resp.data.products
      })
      .catch(err => {
          console.log(err)
      })
  }
};
</script>
<style>

</style>
