<template>
  <div class="container text-center">
    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex flex-col gap-4"
    >
      <h2>Complete Form</h2>
      <div class="row">
        <div class="col">
          <div class="card grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText v-model="text1" placeholder="Username" />
            </InputGroup>

            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <InputNumber v-model="number" placeholder="Price" />
              <InputGroupAddon>.00</InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <InputGroupAddon>www</InputGroupAddon>
              <InputText v-model="text2" placeholder="Website" />
            </InputGroup>

            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-map"></i>
              </InputGroupAddon>
              <Select
                v-model="selectedCity"
                :options="cities"
                optionLabel="name"
                placeholder="City"
              ></Select>
            </InputGroup>
          </div>
        </div>
        <div class="col">
          <div class="card flex flex-wrap gap-4">
            <div class="flex-auto">
              <label for="ssn" class="font-bold block mb-2">SSN</label>
              <InputMask
                id="ssn"
                v-model="value1"
                mask="999-99-9999"
                placeholder="999-99-9999"
                fluid
              />
            </div>

            <div class="flex-auto">
              <label for="phone" class="font-bold block mb-2">Phone</label>
              <InputMask
                id="phone"
                v-model="value2"
                mask="(999) 999-9999"
                placeholder="(999) 999-9999"
                fluid
              />
            </div>

            <div class="flex-auto">
              <label for="serial" class="font-bold block mb-2">Serial</label>
              <InputMask
                id="serial"
                v-model="value3"
                mask="a*-999-a999"
                placeholder="a*-999-a999"
                fluid
              />
            </div>
          </div>
        </div>
        <div class="col">
          <DatePicker name="date" fluid />
          <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">{{
            $form.date.error?.message
          }}</Message>
        </div>
      </div>
      <Button type="submit" severity="secondary" label="Submit"></Button>
    </Form>
  </div>
</template>

<script>
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

export default {
  name: 'Test',
  components: {
    InputGroup,
    InputGroupAddon,
    zodResolver,
    z,
  },
  data() {
    return {
      text1: null,
      text2: null,
      number: null,
      selectedCity: null,
      cities: [
        { name: 'Alabama', code: 'AL' },
        { name: 'Alaska', code: 'AK' },
        { name: 'Arizona', code: 'AZ' },
        { name: 'Arkansas', code: 'AR' },
        { name: 'California', code: 'CA' },
        { name: 'Colorado', code: 'CO' },
        { name: 'Connecticut', code: 'CT' },
        { name: 'Delaware', code: 'DE' },
        { name: 'Florida', code: 'FL' },
        { name: 'Georgia', code: 'GA' },
        { name: 'Hawaii', code: 'HI' },
        { name: 'Idaho', code: 'ID' },
        { name: 'Illinois', code: 'IL' },
        { name: 'Indiana', code: 'IN' },
        { name: 'Iowa', code: 'IA' },
        { name: 'Kansas', code: 'KS' },
        { name: 'Kentucky', code: 'KY' },
        { name: 'Louisiana', code: 'LA' },
        { name: 'Maine', code: 'ME' },
        { name: 'Maryland', code: 'MD' },
        { name: 'Massachusetts', code: 'MA' },
        { name: 'Michigan', code: 'MI' },
        { name: 'Minnesota', code: 'MN' },
        { name: 'Mississippi', code: 'MS' },
        { name: 'Missouri', code: 'MO' },
        { name: 'Montana', code: 'MT' },
        { name: 'Nebraska', code: 'NE' },
        { name: 'Nevada', code: 'NV' },
        { name: 'New Hampshire', code: 'NH' },
        { name: 'New Jersey', code: 'NJ' },
        { name: 'New Mexico', code: 'NM' },
        { name: 'New York', code: 'NY' },
        { name: 'North Carolina', code: 'NC' },
        { name: 'North Dakota', code: 'ND' },
        { name: 'Ohio', code: 'OH' },
        { name: 'Oklahoma', code: 'OK' },
        { name: 'Oregon', code: 'OR' },
        { name: 'Pennsylvania', code: 'PA' },
        { name: 'Rhode Island', code: 'RI' },
        { name: 'South Carolina', code: 'SC' },
        { name: 'South Dakota', code: 'SD' },
        { name: 'Tennessee', code: 'TN' },
        { name: 'Texas', code: 'TX' },
        { name: 'Utah', code: 'UT' },
        { name: 'Vermont', code: 'VT' },
        { name: 'Virginia', code: 'VA' },
        { name: 'Washington', code: 'WA' },
        { name: 'West Virginia', code: 'WV' },
        { name: 'Wisconsin', code: 'WI' },
        { name: 'Wyoming', code: 'WY' },
      ],

      value1: '',
      value2: '',
      value3: '',

      initialValues: {
        date: '',
      },
      resolver: zodResolver(
        z.object({
          date: z.preprocess(
            (val) => {
              if (val === '' || val === null) {
                return null
              }

              return new Date(val)
            },
            z.union([
              z.date(),
              z.null().refine((val) => val !== null, { message: 'Date is required.' }),
            ]),
          ),
        }),
      ),
    }
  },
  methods: {
    onFormSubmit({ valid }) {
      if (valid) {
        this.$toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
      }
    },
  },
}
</script>
