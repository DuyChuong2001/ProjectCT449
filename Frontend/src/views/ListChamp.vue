<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="mb-3 input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Nhập tên tướng"
            v-model="nameToSearch"
          />
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button" @click="searchName">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div class="row mb-4 col-md-12">
          <div
            class="col-md-3 mt-2"
            v-for="(champ, index) in listChamp"
            :key="champ.id"
            @click="setActiveChamp(champ, index)"
          >
            <div class="card">
              <img v-bind:src="champ.url" class="card-img-top" />
              <div class="card-body">
                <h2 class="card-title">{{ champ.name }}</h2>
                <h5 class="card-text" style="font-weight: bold; color: green">
                  <span
                    :class="[
                      champ.lane == 'Top'
                        ? 'badge badge-info'
                        : champ.lane == 'Jungle'
                        ? 'badge badge-danger'
                        : champ.lane == 'Middle'
                        ? 'badge badge-primary'
                        : champ.lane == 'Bottom'
                        ? 'badge badge-success'
                        : 'badge badge-dark',
                    ]"
                    >{{ champ.lane }}</span
                  >
                </h5>
                <h5 class="card-text">
                  <p class="text-justify">
                    {{ champ.biography.substring(0, 50) }}...
                  </p>
                </h5>
                <router-link :to="{ path: '/skin/' + champ.id }">
                  <button class="btn btn-info btn-block mt-3">
                    Xem chi tiết
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InformationService from "../services/information.service";

export default {
  name: "ListChamp",
  data() {
    return {
      listChamp: [],
      currentChampId: -1,
      currentChamp: null,
    };
  },
  methods: {
    async retrieveListChamp() {
      const [error, response] = await this.handle(InformationService.getAll());
      if (error) {
        console.log(error);
      } else {
        this.listChamp = response.data;
        console.log(response.data);
      }
    },
    setActiveChamp(champ, index) {
      this.currentChampId = index;
      this.currentChamp = champ;
    },
    async searchName() {
      const [error, response] = await this.handle(
        InformationService.findByName(this.nameToSearch)
      );
      if (error) {
        console.log(error);
      } else {
        this.listChamp = response.data;
        this.setActiveChamp(null);
        console.log(response.data);
      }
    },
  },
  mounted() {
    this.retrieveListChamp();
  },
};
</script>


<style></style>
