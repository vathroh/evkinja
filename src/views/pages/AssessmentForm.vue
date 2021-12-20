<template>
  <div>
  <toastUi/>
    <spinner :isLoading="data.isLoading" />
    <div class="page card">
      <div class="page-card-header">
        <div class="title">
          <h3>Evaluasi Kinerja {{ data.thisUser.job_title }}</h3>
        </div>
        <h3>Triwulan Tahun</h3>
      </div>
      <div class="page-card-body">
        <table>
          <tbody>
            <tr>
              <td>Nama</td>
              <td>: {{ data.thisUser.name }}</td>
            </tr>
            <tr>
              <td>Tim</td>
              <td>: {{ data.thisUser.team }}</td>
            </tr>
            <tr>
              <td>Kabupaten</td>
              <td>: {{ data.thisUser.district }}</td>
            </tr>
          </tbody>
        </table>
        <div class="w100 text-right">
          <router-link :to="`/upload/${data.thisEvkinja.id}`">
            <button class="btn btn-sm btn-primary">Upload Bukti</button>
          </router-link>
        </div>
        <table class="assessment table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Aspek Kinerja</th>
              <th>Variabel Target</th>
              <th>Tercapai %</th>
              <th v-if="!data.isMine">Penilaian Ketercapaian %</th>
              <th>Skor</th>
              <th>Bukti</th>
            </tr>
          </thead>
          <tbody v-for="(criteria, index) in data.thisContent" :key="index">
            <tr>
              <td style="text-align: left">{{ index + 1 }}</td>
              <td colspan="5" v-if="data.isMine">{{ criteria.criteria }}</td>
              <td colspan="6" v-if="!data.isMine">{{ criteria.criteria }}</td>
            </tr>
            <tr v-for="(aspect, idx) in criteria.aspects" :key="aspect.aspect">
              <td style="text-align: right">{{ idx + 1 }}</td>
              <td>{{ aspect.aspect }}</td>
              <td class="text-center">
                <input
                  v-if="data.isMine"
                  @change="changeUserCheck(aspect, criteria)"
                  type="checkbox"
                  :checked="aspect.userVariable == 1"
                  id="user"
                />
                <br />
                <input
                  v-if="!data.isMine"
                  type="checkbox"
                  @change="changeAssessmentCheck(aspect, criteria)"
                  :checked="aspect.assessmentVariable == 1"
                  id="assessment"
                />
              </td>
              <td class="text-center">
                <span>
                  <input
                    v-if="criteria.criteria_id == 1"
                    @change="changeAchievementInput(aspect)"
                    type="number"
                    size="1"
                    v-model="aspect.achievement"
                    class="text-center"
                    style="width: 50px"
                    :disabled="aspect.userVariable != 1 || !data.isMine"
                  />

                  <select
                    v-if="criteria.criteria_id != 1"
                    @change="changeAchievementSelect(aspect)"
                    v-model="aspect.achievement"
                    style="width: 50px"
                    :disabled="aspect.userVariable != 1 || !data.isMine"
                  >
                    <option class="text-center" value="0">0</option>
                    <option class="text-center" value="1">1</option>
                  </select>
                </span>
              </td>
              <td class="text-center" v-if="!data.isMine">
                <input
                  type="number"
                  v-if="criteria.criteria_id == 1"
                  @change="changeAssessmentInput(aspect)"
                  v-model="aspect.assessment"
                  style="width: 50px"
                  class="text-center"
                  :disabled="aspect.assessmentVariable != 1"
                />
                <select
                  v-if="criteria.criteria_id != 1"
                  @change="changeAssessmentSelect(aspect)"
                  v-model="aspect.assessment"
                  style="width: 50px"
                  class="text-center"
                  :disabled="aspect.assessmentVariable != 1"
                >
                  <option class="text-center" value="0">0</option>
                  <option class="text-center" value="1">1</option>
                </select>
              </td>
              <td class="text-center">
                <input
                  v-if="data.isMine"
                  type="number"
                  size="1"
                  v-model="aspect.userScore"
                  class="text-center"
                  style="width: 50px"
                  disabled
                />
                <input
                  v-if="!data.isMine"
                  type="number"
                  size="1"
                  v-model="aspect.score"
                  class="text-center"
                  style="width: 50px"
                  disabled
                />
              </td>
              <td>
                <span v-for="(file, index) in aspect.file_id" :key="index"
                  ><a
                    :href="'https://drive.google.com/file/d/' + file + '/view'"
                    target="_blank"
                  >
                    bukti-{{ index + 1 }}</a
                  ></span
                >
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center">Jumlah</td>
              <td class="text-center">
                <input
                  v-if="data.isMine"
                  type="number"
                  size="1"
                  v-model="criteria.userSumVariable"
                  class="text-center"
                  style="width: 50px"
                  disabled
                />
                <input
                  v-if="!data.isMine"
                  type="number"
                  size="1"
                  v-model="criteria.sumVariabel"
                  class="text-center"
                  style="width: 50px"
                  disabled
                />
              </td>
              <td></td>
              <td v-if="!data.isMine"></td>
              <td class="text-center">
                <input
                  v-if="data.isMine"
                  type="number"
                  v-model="criteria.userSumScores"
                  style="width: 50px"
                  class="text-center"
                  disabled
                />
                <input
                  v-if="!data.isMine"
                  type="number"
                  v-model="criteria.sumScores"
                  style="width: 50px"
                  class="text-center"
                  disabled
                />
              </td>
              <td></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td colspan="2" class="text-center">TOTAL</td>
              <td class="text-center">
                <input
                  v-if="data.isMine"
                  type="number"
                  v-model="data.thisEvkinja.userTotalVariable"
                  class="text-center"
                  style="width: 50px"
                  disabled
                />
                <input
                  v-if="!data.isMine"
                  type="number"
                  v-model="data.thisEvkinja.totalVariable"
                  class="text-center"
                  style="width: 50px"
                  disabled
                />
              </td>
              <td></td>
              <td v-if="!data.isMine"></td>
              <td class="text-center">
                <input
                  v-if="data.isMine"
                  type="number"
                  v-model="data.thisEvkinja.userTotalScore"
                  size="1"
                  style="width: 50px"
                  class="text-center"
                  disabled
                />
                <input
                  v-if="!data.isMine"
                  type="number"
                  v-model="data.thisEvkinja.totalScore"
                  size="1"
                  style="width: 50px"
                  class="text-center"
                  disabled
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex" v-if="!data.isMine">
          <div class="bagi2 mini-card">
            <div class="mini-card-header">
              <div class="mini-card-title">REKOMENDASI PERBAIKAN</div>
            </div>
            <div class="mini-card-body">
              <textarea
                class="form-control"
                id="recommendation"
                data-value="850"
                rows="6"
              ></textarea>
            </div>
          </div>
          <div class="bagi2 mini-card">
            <div class="mini-card-header">MASALAH DAN SARAN</div>
            <div class="mini-card-body">
              <textarea
                class="form-control"
                id="recommendation"
                data-value="850"
                rows="6"
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <div class="mini-card" v-if="!data.isMine">
            <div class="mini-card-header">Status Blacklist</div>
            <div class="mini-card-body">
              <div class="card-list">
                <input
                  type="checkbox"
                  id="blacklist"
                  name="blacklists[]"
                  data-id="1"
                  value="1"
                />
                <label>Penyalahgunaan Dana Program/LKM/Masyarakat</label>
              </div>
              <div class="card-list">
                <input
                  type="checkbox"
                  id="blacklist"
                  name="blacklists[]"
                  data-id="2"
                  value="2"
                />
                <label>Manipulasi Data atau Data SIM</label>
              </div>
            </div>
          </div>

          <div class="mini-card">
            <div class="mini-card-header">Hasil Akhir/Kualifikasi Kinerja</div>
            <div class="mini-card-body">
              <input
                v-if="data.isMine"
                type="text"
                v-model="data.thisEvkinja.userFinalResult"
                class="text-center"
                style="font-size: 28px; width: 100%"
                disabled
              />
              <input
                v-if="!data.isMine"
                type="text"
                v-model="data.thisEvkinja.finalResult"
                class="text-center"
                style="font-size: 28px; width: 100%"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div class="text-center" v-if="data.isMine">
        <button class="btn btn-primary" @click="ok_by_user" v-if="data.thisEvkinja.ok_by_user == 0" >Simpan & Kirim</button>
        <button class="btn btn-primary" v-if="data.thisEvkinja.ok_by_user == 1">Ajukan Permintaan Edit</button>
      </div>

      <div class="text-center" v-if="!data.isMine">
        <button class="btn btn-primary" @click="ok_by_assessor" v-if="data.thisEvkinja.ready == 0" >Simpan & Kirim</button>
        <button class="btn btn-primary" v-if="data.thisEvkinja.ready == 1">Ajukan Permintaan Edit</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted, reactive, computed } from "vue";
import getUser from "../../components/functions/getUser";
import spinner from "../../components/Spinner";
import toast from "../../components/toast";
import toastUi from "../../components/toast/ToastUi.vue";
import OkByUser from "../../components/assessment/OkByUser";
import OkByAssessor from "../../components/assessment/OkByAssessor";

const store = useStore();
const { setUser } = getUser();
const { setOkByUser } = OkByUser(id);
const { setOkByAssessor } = OkByAssessor(id);

const route = useRoute();
const id = route.params.id;
const user = reactive(computed(() => store.state.user));

const data = reactive({
  thisUser: [],
  thisEvkinja: [],
  thisContent: [],
  newContent: [],
  attachment: [],
  isLoading: false,
  isMine: false,
});

onMounted(async () => {
  data.isLoading = true;
  setUser();

  const thisUser = await fetch(
    process.env.VUE_APP_ROOT_API + "/evkinja/personil/" + id,
    {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const content = await fetch(
    process.env.VUE_APP_ROOT_API + "/evkinja/content/" + id,
    {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const thisEvkinja = await fetch(
    process.env.VUE_APP_ROOT_API + "/evkinja/data/" + id,
    {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const attachment = await fetch(
    process.env.VUE_APP_ROOT_API + "/evkinja/attachment/" + id,
    {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  let thisContent = await content.json();
  let dataAttachment = await attachment.json();
  attachmentArray(dataAttachment, thisContent);

  data.thisUser = await thisUser.json();
  data.thisEvkinja = await thisEvkinja.json();

  if (data.thisUser.user_id == user.value.user_id) {
    data.isMine = true;
  } else {
    data.isMine = false;
  }

  data.isLoading = false;
});

function attachmentArray(dataAttachment, thisContent) {
  let dt = [];
  thisContent.map((item) => {
    let array = [];
    item.aspects.map((u) => {
      let arr = [];
      dataAttachment.map((i) => {
        if (i.personnel_evaluation_aspect_id == u.aspect_id) {
          arr.push(i.file_id);
        }
      });
      u.file_id = arr;
      array.push(u);
    });
    item.aspects = array;
    dt.push(item);
  });
  data.thisContent = dt;
}

function changeAchievementInput(aspect) {
  if (aspect.userVariable == "1") {
    aspect.userScore = (aspect.achievement / 100).toFixed(2);
  }
  newContent();
  saveContent();
}

function changeAchievementSelect(aspect) {
  if (aspect.userVariable == "1") {
    aspect.userScore = aspect.achievement;
  }
  newContent();
  saveContent();
}

function changeAssessmentInput(aspect) {
  if (aspect.userVariable == "1") {
    aspect.score = (aspect.assessment / 100).toFixed(2);
  }
  newContent();
  saveContent();
}

function changeAssessmentSelect(aspect) {
  if (aspect.userVariable == "1") {
    aspect.score = aspect.assessment;
  }
  newContent();
  saveContent();
}

function changeUserCheck(aspect, criteria) {
  if (aspect.userVariable == "1") {
    aspect.userVariable = "0";
    aspect.userScore = 0;
  } else {
    aspect.userVariable = "1";
    if (criteria.criteria_id == 1) {
      aspect.userScore = (aspect.achievement / 100).toFixed(2);
    } else {
      aspect.userScore = aspect.achievement;
    }
  }
  zero();
  countVariable();
  newContent();
  saveContent();
}

function changeAssessmentCheck(aspect, criteria) {
  if (aspect.assessmentVariable == "1") {
    aspect.assessmentVariable = "0";
    aspect.score = 0;
  } else {
    aspect.assessmentVariable = "1";
    if (criteria.criteria_id == 1) {
      aspect.score = (aspect.assessment / 100).toFixed(2);
    } else {
      aspect.score = aspect.assessment;
    }
  }
  zero();
  countVariable();
  newContent();
  saveContent();
}

function countVariable() {
  let array = [];
  data.thisContent.map((item) => {
    let arr = [];
    let assAr = [];
    item.aspects.map((i) => {
      arr.push(parseInt(i.userVariable));
      assAr.push(parseInt(i.assessmentVariable));
    });
    item.userSumVariable = arr.reduce((total, amount) => total + amount);
    item.sumVariabel = assAr.reduce((total, amount) => total + amount);
    array.push(item);
  });
  data.thisContent = array;

  let arrVar = [];
  let assArrVar = [];
  array.map((item) => {
    arrVar.push(item.userSumVariable);
    assArrVar.push(item.sumVariabel);
  });
  data.thisEvkinja.userTotalVariable = arrVar.reduce(
    (total, amount) => total + amount
  );
  data.thisEvkinja.totalVariable = assArrVar.reduce(
    (total, amount) => total + amount
  );
}

function newContent() {
  let array = [];
  data.thisContent.map((item) => {
    let jum = [];
    let scoreAr = [];
    item.aspects.map((i) => {
      jum.push(parseFloat(i.userScore));
      scoreAr.push(parseFloat(i.score));
    });
    item.userSumScores = jum
      .reduce((total, amount) => total + amount)
      .toFixed(2);
    item.sumScores = scoreAr
      .reduce((total, amount) => total + amount)
      .toFixed(2);
    array.push(item);
  });
  data.thisContent = array;

  let arr = [];
  let assAr = [];
  array.map((item) => {
    if (item.userSumVariable > 0) {
      arr.push(
        (parseFloat(item.userSumScores) * parseFloat(item.proportion)) /
          item.userSumVariable
      );
    } else {
      arr.push(0);
    }

    if (item.sumVariabel > 0) {
      assAr.push(
        (parseFloat(item.sumScores) * parseFloat(item.proportion)) /
          item.sumVariabel
      );
    } else {
      assAr.push(0);
    }
  });

  data.thisEvkinja.userTotalScore = arr
    .reduce((total, amount) => total + amount)
    .toFixed(2);
  data.thisEvkinja.totalScore = assAr
    .reduce((total, amount) => total + amount)
    .toFixed(2);

  grade();
}

function grade() {
  let totalScore = data.thisEvkinja.totalScore;
  if (totalScore < 50) {
    data.thisEvkinja.finalResult = "Tidak Tercapai";
  } else if (totalScore >= 50 && totalScore < 75) {
    data.thisEvkinja.finalResult = "Tercapai";
  } else if (totalScore >= 75) {
    data.thisEvkinja.finalResult = "Sangat Baik";
  }

  let userTotalScore = data.thisEvkinja.userTotalScore;
  if (userTotalScore < 50) {
    data.thisEvkinja.userFinalResult = "Tidak Tercapai";
  } else if (userTotalScore >= 50 && userTotalScore < 75) {
    data.thisEvkinja.userFinalResult = "Tercapai";
  } else if (userTotalScore >= 75) {
    data.thisEvkinja.userFinalResult = "Sangat Baik";
  }
}

function zero() {
  let array = [];
  data.thisContent.map((item) => {
    let arr = [];
    item.aspects.map((i) => {
      if (i.userVariable == 0) {
        i.userScore = 0;
      }
      arr.push(i);
    });
    array.push(arr);
  });
}

function saveContent() {
  let obj = dataContent();
  let request = {
    content: obj,
    finalResult: data.thisEvkinja.finalResult,
    totalScores: data.thisEvkinja.totalScore,
    totalVariabel: data.thisEvkinja.totalVariable,
    userFinalResult: data.thisEvkinja.userFinalResult,
    userTotalScores: data.thisEvkinja.userTotalScore,
    userTotalVariabel: data.thisEvkinja.userTotalVariable,
  };

  fetch(process.env.VUE_APP_ROOT_API + "/evkinja/update-content/" + id, {
    method: "post",
    headers: { "Content-Type": "applicaction/json" },
    credentials: "include",
    body: JSON.stringify(request),
  })
  .then((response) => { 
    if(response.ok){
      toast.info('Data berhasil disimpan.');
    }
  })
  .catch( () => {
    toast.error('Data gagal disimpan.');
  });
}

function dataContent() {
  let obj = {};
  data.thisContent.map((item) => {
    Object.values(item).map((i) => {
      obj[item.criteria_id] = {};
      Object.values(i).map((u) => {
        obj[item.criteria_id][u.aspect_id] = {};
        obj[item.criteria_id][u.aspect_id].capaian = u.achievement;
        obj[item.criteria_id][u.aspect_id].assessment = u.assessment;
        obj[item.criteria_id][u.aspect_id].userScore = u.userScore;
        obj[item.criteria_id][u.aspect_id].userVariable = u.userVariable;
        obj[item.criteria_id][u.aspect_id].assessmentVariable =
          u.assessmentVariable;
        obj[item.criteria_id][u.aspect_id].score = u.score;
        obj[item.criteria_id].sumScores = item.sumScores;
        obj[item.criteria_id].userSumScores = item.userSumScores;
        obj[item.criteria_id].sumVariabel = item.sumVariabel;
        obj[item.criteria_id].userSumVariabel = item.userSumVariable;
        obj.userTotalVariabel = data.thisEvkinja.userTotalVariable;
        obj.totalVariabel = data.thisEvkinja.totalVariable;
      });
    });
  });
  return obj;
}

function ok_by_user(){
  saveContent();
  setOkByUser(id)
}

function ok_by_assessor(){
  saveContent();
  setOkByAssessor(id)
}
</script>

<style scoped>
</style>
