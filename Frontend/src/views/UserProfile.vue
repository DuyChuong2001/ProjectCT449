<template>
  <div v-if="currentUser">
    <header class="jumbotron">
      <img
        width="128"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="Cannot load the image"
        class="rounded mb-3"
      />
      <h3>
        <strong>{{ currentUser.username }}</strong>
      </h3>
      <div v-show="!isAdmin" class="alert alert-info mt-3" role="alert">
        Chào mừng {{ currentUser.username }} đã đến với trang thông tin tướng LOL!
      </div>
      <div class="mt-3">
        <button
          v-show="isAdmin"
          class="btn btn-success mr-3"
          v-on:click="showInsertChampion"
        >
          Thêm tướng
        </button>
        <button
          v-show="isAdmin"
          class="btn btn-primary"
          v-on:click="showInsertSkins"
        >
          Thêm trang phục
        </button>
      </div>
    </header>
    <div class="row mb-4">
      <div v-show="isAdmin && showInsertChamp" class="col-md-6">
        <h2>Tướng</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="form-group">
                  <label for="name">Tên tướng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="currentChamps.name"
                  />
                </div>
                <div class="form-group">
                  <label for="urlname">Link ảnh tướng</label>
                  <input
                    type="text"
                    class="form-control"
                    id="urlname"
                    v-model="currentChamps.url"
                  />
                </div>
                <div class="form-group">
                  <label for="urlPassive">Link ảnh nội tại</label>
                  <input
                    type="text"
                    class="form-control"
                    id="urlPassive"
                    v-model="currentChamps.passive"
                  />
                </div>
                <div class="form-group">
                  <label for="namePassive">Tên nội tại</label>
                  <input
                    type="text"
                    class="form-control"
                    id="namePassive"
                    v-model="currentChamps.namePassive"
                  />
                </div>
                <div class="form-group">
                  <label for="urlQ">Link ảnh skill Q</label>
                  <input
                    type="text"
                    class="form-control"
                    id="urlQ"
                    v-model="currentChamps.skillQ"
                  />
                </div>
                <div class="form-group">
                  <label for="nameQ">Tên skill Q</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nameQ"
                    v-model="currentChamps.nameQ"
                  />
                </div>
                <div class="form-group">
                  <label for="urlQ">Link ảnh skill W</label>
                  <input
                    type="text"
                    class="form-control"
                    id="urlQ"
                    v-model="currentChamps.skillW"
                  />
                </div>
                <div class="form-group">
                  <label for="nameW">Tên skill W</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nameW"
                    v-model="currentChamps.nameW"
                  />
                </div>
                <div class="form-group">
                  <label for="urlE">Link ảnh skill E</label>
                  <input
                    type="text"
                    class="form-control"
                    id="urlE"
                    v-model="currentChamps.skillE"
                  />
                </div>
                <div class="form-group">
                  <label for="nameE">Tên skill E</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nameE"
                    v-model="currentChamps.nameE"
                  />
                </div>
                <div class="form-group">
                  <label for="urlR">Link ảnh skill R</label>
                  <input
                    type="text"
                    class="form-control"
                    id="urlR"
                    v-model="currentChamps.skillR"
                  />
                </div>
                <div class="form-group">
                  <label for="nameR">Tên skill R</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nameR"
                    v-model="currentChamps.nameR"
                  />
                </div>
                <div class="form-group">
                  <label for="biography">Tiểu sử</label>
                  <input
                    type="text"
                    class="form-control"
                    id="biography"
                    v-model="currentChamps.biography"
                  />
                </div>
                <div class="form-group">
                  <label for="Lane">Lane</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Lane"
                    v-model="currentChamps.lane"
                  />
                </div>
                <div class="form-group">
                  <label for="difficult">Difficult</label>
                  <input
                    type="text"
                    class="form-control"
                    id="difficult"
                    v-model="currentChamps.difficult"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button v-on:click="insertCurrrentChamp" class="btn btn-danger mt-3">
          Thêm tướng
        </button>
        <br/>
        {{ messageChamp }}
      </div>
      <div v-show="isAdmin && showInsertSkin" class="col-md-6">
        <h2>Trang phục</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="form-group">
                  <label for="nameSkin">Tên trang phục</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nameSkin"
                    v-model="currentSkins.nameSkin"
                  />
                </div>
                <div class="form-group">
                  <label for="urlSkin">Link ảnh trang phục</label>
                  <input
                    type="text"
                    class="form-control"
                    id="urlSkin"
                    v-model="currentSkins.urlSkin"
                  />
                </div>
                <div class="form-group">
                  <label for="champId">champId</label>
                  <input
                    type="text"
                    class="form-control"
                    id="champId"
                    v-model="currentSkins.champId"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button v-on:click="insertCurrrentSkin" class="btn btn-danger mt-3 mb-3">
          Thêm trang phục
        </button>
        <br/>
        {{ messageSkin }}
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InformationService from "../services/information.service";
import SkinService from "../services/skin.service";

export default {
  name: "Profile",
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  data() {
    return {
      isAdmin: false,
      showInsertChamp: false,
      showInsertSkin: false,
      currentChamps: {
        name: "",
        url: "",
        passive: "",
        namePassive: "",
        skillQ: "",
        nameQ: "",
        skillW: "",
        nameW: "",
        skillE: "",
        nameE: "",
        skillR: "",
        nameR: "",
        biography: "",
        lane: "",
        favorite: false,
        difficult: "",
      },
      currentSkins: {
        nameSkin: "",
        urlSkin: "",
        champId: "",
      },
      messageChamp: "",
      messageSkin: "",
    };
  },
  methods: {
    showInsertChampion() {
      this.showInsertChamp = !this.showInsertChamp;
    },
    showInsertSkins() {
      this.showInsertSkin = !this.showInsertSkin;
    },
    async insertCurrrentChamp() {
      const [error, response] = await this.handle(
        InformationService.create(this.currentChamps)
      );
      if (error) {
        console.log(error);
      } else {
        this.messageChamp = "Thêm tướng thành công";
        console.log(response.data);
      }
    },
    async insertCurrrentSkin() {
      const [error, response] = await this.handle(
        SkinService.create(this.currentSkins)
      );
      if (error) {
        console.log(error);
      } else {
        this.messageSkin = "Thêm trang phục thành công";
        console.log(response.data);
      }
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.isAdmin = this.currentUser.username == "admin";
  },
};
</script>