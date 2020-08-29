<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Product">{{ item.product_name }}</md-table-cell>
        <md-table-cell md-label="Import Price">{{ item.import_price }}</md-table-cell>
        <md-table-cell md-label="Sell Price">{{ item.sell_price }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <div>
          <md-button class="md-raised md-primary">Edit</md-button>
          <md-button class="md-raised md-accent">Delete</md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axiosInstance from '../../configs/http-commons';
import axios from "axios";
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
      users: []  
    };
  },
  mounted() {
    axios.get("https://5f43d67f75bded001695e586.mockapi.io/api/products")
      .then(resp => {
          this.users = resp.data
      })
      .catch(err => {
          console.log(err)
      })
  }
};
</script>
