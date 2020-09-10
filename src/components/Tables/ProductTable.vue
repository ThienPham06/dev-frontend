<template>
  <div>
    <md-dialog-alert
      :md-active.sync="isOk"
      md-title=":)"
      md-content="Successfully" />
    <md-dialog-alert
      :md-active.sync="isNotOk"
      md-title=":("
      md-content="Something wrong happens please try again!" />
    <md-dialog-confirm
      :md-active.sync="deleteDialog"
      md-title="You sure?"
      md-content="Delete this item?"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onDelete(selected.id)"
      />
    <md-dialog :md-active.sync="editDialog">
      <form novalidate class="md-layout" @submit.prevent="onEdit">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-header>
            <div class="md-title">Product Info</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('product_code')">
                  <label for="code">Product code</label>
                  <md-input
                    v-model="selected.product_code"
                    name="code"
                    id="code"
                    autocomplete="given-name"
                  />
                  <span class="md-error" v-if="!$v.selected.product_code.required">Product code is required!</span>
                  <span class="md-error" v-if="!$v.selected.product_code.minLength || !$v.selected.product_code.maxLength">
                    Product code have to be more than 5 and less than 10 characters!
                  </span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('product_name')">
                  <label for="name">Product name</label>
                  <md-input
                    v-model="selected.product_name"
                    name="name"
                    id="name"
                    autocomplete="given-name"
                  />
                  <span class="md-error" v-if="!$v.selected.product_name.required">Product code is required!</span>
                  <span class="md-error" v-if="!$v.selected.product_name.minLength || !$v.selected.product_name.maxLength">
                    Product name have to be more than 5 and less than 150 characters!
                  </span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('input_price')">
                  <label for="code">Import price</label>
                  <md-input
                    type="number"
                    name="code"
                    v-model="selected.input_price"
                    id="price"
                    autocomplete="given-name"
                  />
                  <span class="md-error" v-if="!$v.selected.input_price.required">Product price is required!</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('input_quantity')">
                  <label for="name">Amount</label>
                  <md-input
                    type="number"
                    name="name"
                    v-model="selected.input_quantity"
                    id="amount"
                    autocomplete="given-name"
                  />
                  <span class="md-error" v-if="!$v.selected.input_quantity.required">Product amount is required!</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </form>
      <md-dialog-actions>
        <md-button @click="onCancel" class="md-accent">Cancel</md-button>
        <div v-if="isUpdate"><md-button @click="onEdit(selected.id)" type="submit" class="md-primary">Save</md-button></div>
        <div v-else><md-button @click="onCreate" type="submit" class="md-primary">Create</md-button></div>
      </md-dialog-actions>
    </md-dialog>
    <md-button @click="isUpdate = false; clearSelected; editDialog = true" class="md-primary">Add new</md-button>
    <md-table v-model="products" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Code">{{ item.product_code }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.product_name }}</md-table-cell>
        <md-table-cell md-label="Import date">
          {{
          item.input_date
          }}
        </md-table-cell>
        <md-table-cell md-label="Import price">
          {{
          item.input_price
          }}
        </md-table-cell>
        <md-table-cell md-label="Amount">
          {{
          item.input_quantity
          }}
        </md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button @click="setSelected(item); editDialog = true; isUpdate = true" class="md-icon-button md-raised md-primary">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button @click="setSelected(item); deleteDialog = true" class="md-icon-button md-raised md-accent">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-progress-spinner md-mode="indeterminate" v-if="sending" />
  </div>
</template>

<script>
import repo from "../../api/repositories";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
const productRepo = repo.get("products");

export default {
  name: "product-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  mixins: [validationMixin],
  validations: {
    selected: {
      product_code: {
        required, minLength: minLength(5), maxLength: maxLength(10)
      },
      product_name: {
        required, minLength: minLength(5), maxLength: maxLength(150)
      },     
      input_price: { required },
      input_quantity: { required }
    }
  },
  data() {
    return {
      selected: {
        id: "",
        product_code: "",
        product_name: "",
        input_price: 0,
        input_quantity: 0,
        input_date: Date,
        isAvailable: true
      },
      products: [],
      editDialog: false,
      deleteDialog: false,
      isUpdate: false,
      isOk: false,
      isNotOk: false,
      sending: false
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.selected[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearSelected() {
      this.selected._id = null
      this.selected.product_code = null
      this.selected.product_name = null
      this.selected.input_price = null
      this.selected.input_quantity = null
      this.selected.input_date = null
      this.selected.isAvailable = null
    },
    getProducts: async function() {
      this.sending = !this.sending;
      await productRepo.getAll().then(res => {
        this.products = res;
        this.sending = false;
      })
      .catch(err => {
        console.log(err);
      });
    },
    setSelected: function(item) {
      this.selected.id = item._id;
      this.selected.product_code = item.product_code;
      this.selected.product_name = item.product_name;
      this.selected.input_price = item.input_price;
      this.selected.input_quantity = item.input_quantity;
    },
    onCancel: function() {
      this.deleteDialog = false;
      this.editDialog = false;
    },
    onDelete: async function(_id) {
      await productRepo.deleteProduct(_id).then(res => {
        if(res == 200 || res == 204){
          this.isOk = !this.isOk;
          this.getProducts();
        }
      }).catch(err => {
        this.isNotOk = !this.isNotOk;
      })
    },
    onEdit: async function(_id) {
      this.$v.$touch();
      if(!this.$v.$invalid){
        await productRepo.updateProduct(this.selected, _id).then(res => {
          if(res.status == 200 || res.status == 204){
            this.isOk = !this.isOk;
            this.getProducts();
            this.clearSelected();
          }
        }).catch(err => {
          this.isNotOk = !this.isNotOk;
        })
        this.editDialog = false;
      }
    },
    onCreate: async function() {
      if(!this.$v.$invalid) {
        this.selected.input_date = Date().toLocaleString();

        await productRepo.createProduct(this.selected).then(res => {
          if(res.status == 200 || res.status == 204){
            this.isOk = !this.isOk;
            this.getProducts();
            this.clearSelected();
          }
        }).catch(err => {
            this.isNotOk = !this.isNotOk;
        })
        this.editDialog = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.actions {
  margin-right: 0;
}
.md-progress-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);

}
</style>>


