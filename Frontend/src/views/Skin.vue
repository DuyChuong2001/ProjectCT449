<template>
  <div class="row">
    <div class="col-md-12">
      <router-link to="/">
        <button class="btn btn-secondary">
          <i class="fas fa-home"></i>&nbsp;Trở về
        </button>
      </router-link>
      <div class="row mt-2">
        <div v-if="champ" class="col-md-12 mb-4">
          <div class="card">
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
              <h5 class="card-text">{{ champ.biography }}</h5>
              <div class="row">
                <div class="col-md-6 mt-2">
                  <div class="media">
                    <img v-bind:src="champ.passive" class="rounded mr-3" />
                    <div class="media-body">
                      <h5 class="mt-3">{{ champ.namePassive }}</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mt-2">
                  <div class="media">
                    <img v-bind:src="champ.skillQ" class="rounded mr-3" />
                    <div class="media-body">
                      <h5 class="mt-3">{{ champ.nameQ }}</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mt-2">
                  <div class="media">
                    <img v-bind:src="champ.skillW" class="rounded mr-3" />
                    <div class="media-body">
                      <h5 class="mt-3">{{ champ.nameW }}</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mt-2">
                  <div class="media">
                    <img v-bind:src="champ.skillE" class="rounded mr-3" />
                    <div class="media-body">
                      <h5 class="mt-3">{{ champ.nameE }}</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-2">
                  <div class="media">
                    <img v-bind:src="champ.skillR" class="rounded mr-3" />
                    <div class="media-body">
                      <h5 class="mt-3">{{ champ.nameR }}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="progress mt-3" style="height: 40px">
                    <div
                      :class="[
                        champ.difficult == 'Easy'
                          ? 'progress-bar bg-success'
                          : champ.difficult == 'Medium'
                          ? 'progress-bar bg-primary'
                          : 'progress-bar bg-danger',
                      ]"
                      role="progressbar"
                      v-bind:style="{
                        width:
                          (champ.difficult == 'Easy'
                            ? 33
                            : champ.difficult == 'Medium'
                            ? 66
                            : 99) + '%',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }"
                      aria-valuenow="66"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      Độ khó: {{ champ.difficult }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-md-12 mb-4"
          v-for="(skin, index) in listSkin"
          :key="skin.id"
          @click="setActiveSkin(skin, index)"
        >
          <div class="card">
            <img v-bind:src="skin.urlSkin" class="card-img rounded" />
            <div class="card-img-overlay">
              <h2 class="card-title">
                <p class="badge badge-dark">{{ skin.nameSkin }}</p>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-12">
          <ul
            class="list-unstyled"
            v-for="(comment, index) in listComment"
            :key="comment.id"
            @click="setActiveComment(comment, index)"
          >
            <li class="media">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                width="64"
                class="mr-3 rounded"
              />
              <div class="media-body">
                <h5 class="mt-0 mb-1">{{ comment.userComment }}</h5>
                <p>
                  {{ comment.comment }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-12">
          <div class="form-group">
            <label for="commentContent"
              ><h3 style="color: green">Thêm bình luận</h3></label
            >
            <input
              type="text"
              placeholder="Nhập bình luận"
              v-model="commentContents"
              class="form-control"
              id="commentContent"
            />
          </div>
          <button
            type="button"
            class="btn btn-primary mb-4" 
            v-on:click="createComment"
          >
            Bình luận
          </button>
          <h3 style="color: red" class="mb-3">
            {{ message }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkinService from "../services/skin.service";
import InformationService from "../services/information.service";
import CommentService from "../services/comment.service";

export default {
  name: "ListSkin",
  data() {
    return {
      listSkin: [],
      champ: null,
      listComment: [],
      message: "",
      commentContents: "",
      currentChampId: -1,
      currentChamp: null,
    };
  },
  methods: {
    async retrieveListSkin(currentId) {
      const [error, response] = await this.handle(SkinService.get(currentId));
      if (error) {
        console.log(error);
      } else {
        this.listSkin = response.data;
        console.log(response.data);
      }
    },
    async retrieveChamp(currentChampId) {
      const [error, response] = await this.handle(
        InformationService.get(currentChampId)
      );
      if (error) {
        console.log(error);
      } else {
        this.champ = response.data;
        console.log(response.data);
      }
    },
    async retrieveCommentSkin(currentId) {
      const [error, response] = await this.handle(
        CommentService.get(currentId)
      );
      if (error) {
        console.log(error);
      } else {
        this.listComment = response.data;
        console.log(response.data);
      }
    },
    async createComment() {
      if (!this.$store.getters.loggedInUser) {
        this.message = "Bạn cần đăng nhập để bình luận";
        return;
      }
      if(this.commentContents == ""){
        this.message = "Bạn cần nhập nội dung bình luận"
        return;
      }
      const data = {};
      data.userComment = this.$store.getters.loggedInUser.username;
      data.comment = this.commentContents;
      data.champId = this.currentChampId;
      const [error, response] = await this.handle(CommentService.create(data));
      if (error) {
        console.log(error);
      } else {
        this.retrieveCommentSkin(this.currentChampId);
        console.log(response.data);
      }
    },
    setActiveSkin(skin, index) {
      this.currentSkinId = index;
      this.currentSkin = skin;
    },
    setActiveComment(comment, index) {
      console.log(comment, index);
    },
  },
  mounted() {
    this.currentChampId = this.$route.params.champId;
    this.retrieveChamp(this.currentChampId);
    this.retrieveListSkin(this.currentChampId);
    this.retrieveCommentSkin(this.currentChampId);
  },
};
</script>


<style>
</style>
