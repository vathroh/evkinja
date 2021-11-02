<template>
  <!-- Card -->
  <spinner :isLoading="data.isLoading" />

  <div class="card-box" v-if="user.isAssessor || user.isHrm">
    <div class="card">
      <div>
        <div class="numbers">
          <span class="score">{{ data.summary.belumMengisi }}</span>
          /
          <span class="from">{{ data.summary.jumlahPersonil }}</span>
        </div>
        <div class="card-name">Belum Mengisi</div>
      </div>
      <div class="icon-box">
        <i class="bi bi-thermometer"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers">
          <span class="score">{{ data.summary.prosesMengisi }}</span>
          /
          <span class="from">{{ data.summary.jumlahPersonil }}</span>
        </div>
        <div class="card-name">Proses Mengisi</div>
      </div>
      <div class="icon-box">
        <i class="bi bi-thermometer-half"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers">
          <span class="score">{{ data.summary.selesaiMengisi }}</span>
          /
          <span class="from">{{ data.summary.jumlahPersonil }}</span>
        </div>
        <div class="card-name">Selesai Mengisi</div>
      </div>
      <div class="icon-box">
        <i class="bi bi-thermometer-high"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers evaluasi">
          <span class="score">{{ data.summary.siapEvaluasi }}</span>
          /
          <span class="from">{{ data.summary.jumlahPersonil }}</span>
        </div>
        <div class="card-name evaluasi">Siap Evaluasi</div>
      </div>
      <div class="icon-box">
        <i class="bi bi-thermometer-low"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers evaluasi">
          <span class="score">{{ data.summary.prosesEvaluasi }}</span>
          /
          <span class="from">{{ data.summary.jumlahPersonil }}</span>
        </div>
        <div class="card-name evaluasi">Proses Evaluasi</div>
      </div>
      <div class="icon-box">
        <i class="bi bi-thermometer-snow"></i>
      </div>
    </div>
    <div class="card">
      <div>
        <div class="numbers evaluasi">
          <span class="score">{{ data.summary.selesaiEvaluasi }}</span>
          /
          <span class="from">{{ data.summary.jumlahPersonil }}</span>
        </div>
        <div class="card-name evaluasi">Selesai Evaluasi</div>
      </div>
      <div class="icon-box">
        <i class="bi bi-thermometer-sun"></i>
      </div>
    </div>
  </div>

  <div class="box-notification success" v-if="data.myStatus.isSetting">
    <div class="danger" v-if="data.myStatus.isBelumMengisi">
      <h2>
        Evaluasi Kinerja Triwulan {{ data.mySettingNow.quarter }} Tahun {{ data.mySettingNow.year }}
        <br>Belum Diinput.
      </h2>
      <button class="btn btn-success" @click="createNewValue">Input Sekarang</button>
    </div>
    <div class="danger" v-if="data.myStatus.isProsesMengisi">
      <h2>
        Evaluasi Kinerja Triwulan {{ data.mySettingNow.quarter }} Tahun {{ data.mySettingNow.year }}
        <br>Dalam Proses Input.
      </h2>
      <router-link :to="`/assessment/${data.myValueNow[0].id}`">
        <button class="btn">Selesaikan</button>
      </router-link>
    </div>
    <div class="success" v-if="data.myStatus.isSelesaiMengisi">
      <h2>
        Evaluasi Kinerja Triwulan {{ data.mySettingNow.quarter }} Tahun {{ data.mySettingNow.year }}
        <br>Telah Selesai Diinput.
      </h2>
      <router-link :to="`/assessment/${data.myValueNow[0].id}`">
        <button class="btn btn-primary link">Lihat</button>
      </router-link>
    </div>
  </div>

  <!-- Details -->
  <div class="details" v-if="user.isHrm || user.isAssessor">
    <div class="primary-card">
      <div class="card-header">
        <h2>Summary</h2>
      </div>
      <table class="table" v-if="user.zone_level_id == 1">
        <thead>
          <tr class="text-center">
            <td rowspan="2">No.</td>
            <td rowspan="2">Posisi</td>
            <td rowspan="2" class="highlight">Jumlah<br />Personil</td>
            <td colspan="3" class="text-center">Mengisi</td>
            <td colspan="3" class="text-center highlight">Evaluasi</td>
          </tr>
          <tr>
            <td>Belum</td>
            <td>Proses</td>
            <td>Selesai</td>
            <td class="highlight">Siap</td>
            <td class="highlight">Proses</td>
            <td class="highlight">Selesai</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(jobTitle, index) in data.jobTitles" :key="jobTitle.id">
            <td>{{ index + 1 }}</td>
            <td>{{ jobTitle.job_title }}</td>
            <td class="text-center highlight">
              {{ Object.values(jobTitle.count).length }}
            </td>
            <td class="text-center">
              {{ Object.values(jobTitle.belumMengisi).length }}
            </td>
            <td class="text-center">
              {{ Object.values(jobTitle.prosesMengisi).length }}
            </td>
            <td class="text-center">
              {{ Object.values(jobTitle.selesaiMengisi).length }}
            </td>
            <td class="text-center highlight">
              {{ Object.values(jobTitle.siapEvaluasi).length }}
            </td>
            <td class="text-center highlight">
              {{ Object.values(jobTitle.prosesEvaluasi).length }}
            </td>
            <td class="text-center highlight">
              {{ Object.values(jobTitle.selesaiEvaluasi).length }}
            </td>
          </tr>
        </tbody>
      </table>
      <table v-if="user.zone_level_id == 2 || user.zone_level_id == 3">
        <thead>
          <tr class="text-center">
            <td rowspan="2">No.</td>
            <td rowspan="2">Posisi</td>
            <td rowspan="2" class="highlight">Jumlah<br />Personil</td>
            <td colspan="3" class="text-center">Mengisi</td>
            <td colspan="3" class="text-center highlight">Evaluasi</td>
          </tr>
          <tr>
            <td>Belum</td>
            <td>Proses</td>
            <td>Selesai</td>
            <td class="highlight">Siap</td>
            <td class="highlight">Proses</td>
            <td class="highlight">Selesai</td>
          </tr>
        </thead>
        <tbody v-for="district in data.districts" :key="district.id">
          <tr>
            <td colspan="9" style="background: blue">
              {{ district.nama_kab }}
            </td>
          </tr>
          <tr v-for="(jobTitle, index) in data.jobTitles" :key="jobTitle.id">
            <td>{{ index + 1 }}</td>
            <td>{{ jobTitle.job_title }}</td>
            <td class="text-center highlight">
              {{
                Object.values(jobTitle.count).filter(
                  (e) => e.district == district.nama_kab
                ).length
              }}
            </td>
            <td class="text-center">
              {{
                Object.values(jobTitle.belumMengisi).filter(
                  (e) => e.district == district.nama_kab
                ).length
              }}
            </td>
            <td class="text-center">
              {{
                Object.values(jobTitle.prosesMengisi).filter(
                  (e) => e.district == district.nama_kab
                ).length
              }}
            </td>
            <td class="text-center">
              {{
                Object.values(jobTitle.selesaiMengisi).filter(
                  (e) => e.district == district.nama_kab
                ).length
              }}
            </td>
            <td class="text-center highlight">
              {{
                Object.values(jobTitle.siapEvaluasi).filter(
                  (e) => e.district == district.nama_kab
                ).length
              }}
            </td>
            <td class="text-center highlight">
              {{
                Object.values(jobTitle.prosesEvaluasi).filter(
                  (e) => e.district == district.nama_kab
                ).length
              }}
            </td>
            <td class="text-center highlight">
              {{
                Object.values(jobTitle.selesaiEvaluasi).filter(
                  (e) => e.district == district.nama_kab
                ).length
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="secondary-card">
      <div class="card-header">
        <h2>Personil</h2>
      </div>
      <div class="list" @click="belumMengisi">
        <h4>Belum Mengisi ( {{ data.summary.belumMengisi }} )</h4>
      </div>
      <table v-show="data.isBelumMengisi">
        <tr
          v-for="personil in data.details.belumMengisi"
          :key="personil.user_id"
        >
          <td width="60px">
            <div class="img-box">
              <img src="images/profiles/user.jpg" alt="" />
            </div>
          </td>
          <td>
            <h5>
              {{ personil.name }} <br />
              <span>{{ personil.jobTitle }}</span
              ><br />
              <span>{{ personil.district }}</span>
            </h5>
          </td>
        </tr>
      </table>
      <div class="list" @click="prosesMengisi">
        <h4>Proses Mengisi ( {{ data.summary.prosesMengisi }} )</h4>
      </div>
      <table v-show="data.isProsesMengisi">
        <tr
          v-for="personil in data.details.prosesMengisi"
          :key="personil.user_id"
        >
          <td width="60px">
            <div class="img-box">
              <img src="images/profiles/user.jpg" alt="" />
            </div>
          </td>
          <td>
            <h5>
              {{ personil.name }} <br />
              <span>{{ personil.jobTitle }}</span
              ><br />
              <span>{{ personil.district }}</span>
            </h5>
          </td>
        </tr>
      </table>

      <div class="list" @click="selesaiMengisi">
        <h4>Selesai Mengisi ( {{ data.summary.selesaiMengisi }} )</h4>
      </div>
      <table v-show="data.isSelesaiMengisi">
        <tr
          v-for="personil in data.details.selesaiMengisi"
          :key="personil.user_id"
        >
          <td width="60px">
            <div class="img-box">
              <img src="images/profiles/user.jpg" alt="" />
            </div>
          </td>
          <td>
            <h5>
              {{ personil.name }} <br />
              <span>{{ personil.jobTitle }}</span
              ><br />
              <span>{{ personil.district }}</span>
            </h5>
          </td>
        </tr>
      </table>
      <div class="list" @click="siapEvaluasi">
        <h4>Siap Dievaluasi ( {{ data.summary.siapEvaluasi }} )</h4>
      </div>
      <table v-show="data.isSiapEvaluasi">
        <tr
          v-for="personil in data.details.siapEvaluasi"
          :key="personil.user_id"
        >
          <td width="60px">
            <router-link :to="`/assessment/${personil.evkinja_value_id}`">
              <div class="img-box">
                <img src="images/profiles/user.jpg" alt="" />
              </div>
            </router-link>
          </td>
          <td class="link">
            <router-link :to="`/assessment/${personil.evkinja_value_id}`">
              <h5>
                {{ personil.name }} <br />
                <span>{{ personil.jobTitle }}</span
                ><br />
                <span>{{ personil.district }}</span>
              </h5>
            </router-link>
          </td>
        </tr>
      </table>
      <div class="list" @click="prosesEvaluasi">
        <h4>Proses Dievaluasi ( {{ data.summary.prosesEvaluasi }} )</h4>
      </div>
      <table v-show="data.isProsesEvaluasi">
        <tr
          class="link"
          v-for="personil in data.details.prosesEvaluasi"
          :key="personil.user_id"
        >
          <td width="60px">
            <router-link :to="`/assessment/${personil.evkinja_value_id}`">
              <div class="img-box">
                <img src="images/profiles/user.jpg" alt="" />
              </div>
            </router-link>
          </td>
          <td>
            <router-link :to="`/assessment/${personil.evkinja_value_id}`">
              <h5>
                {{ personil.name }} <br />
                <span>{{ personil.jobTitle }}</span
                ><br />
                <span>{{ personil.district }}</span>
              </h5>
            </router-link>
          </td>
        </tr>
      </table>
      <div class="list" @click="selesaiEvaluasi">
        <h4>Selesai Dievaluasi ( {{ data.summary.selesaiEvaluasi }} )</h4>
      </div>
      <table v-show="data.isSelesaiEvaluasi">
        <tr
          class="link"
          v-for="personil in data.details.selesaiEvaluasi"
          :key="personil.user_id"
        >
          <td width="60px">
            <router-link :to="`/assessment/${personil.evkinja_value_id}`">
              <div class="img-box">
                <img src="images/profiles/user.jpg" alt="" />
              </div>
            </router-link>
          </td>
          <td>
            <router-link :to="`/assessment/${personil.evkinja_value_id}`">
              <h5>
                {{ personil.name }} <br />
                <span>{{ personil.jobTitle }}</span
                ><br />
                <span>{{ personil.district }}</span>
              </h5>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import spinner from "../../components/Spinner";
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { spinner },
  setup() {
    const store = useStore();
    const router = useRouter();
    const authenticated = computed(() => store.state.authenticated);
    const role = reactive(computed(() => store.state.user.role));
    const user = reactive(computed(() => store.state.user));

    const data = reactive({
      jobTitles: [],
      districts: [],
      summary: {
        jumlahPersonil: 0,
        belumMengisi: 0,
        prosesMengisi: 0,
        selesaiMengisi: 0,
        siapEvaluasi: 0,
        prosesEvaluasi: 0,
        selesaiEvaluasi: 0,
      },
      details: {
        belumMengisi: [],
        prosesMengisi: [],
        selesaiMengisi: [],
        siapEvaluasi: [],
        prosesEvaluasi: [],
        selesaiEvaluasi: [],
      },
      mySettingNow: [],
      myValueNow: [],
      myStatus: {
        isBelumMengisi: false,
        isProsesMengisi: false,
        isSelesaiMengisi: false,
        isSetting: false,
      },
      isBelumMengisi: false,
      isProsesMengisi: false,
      isSelesaiMengisi: false,
      isSiapEvaluasi: false,
      isProsesEvaluasi: false,
      isSelesaiEvaluasi: false,
      isLoading: false,
    });

    onMounted(async () => {
      data.isLoading = true;
      try {
        const response = await fetch(process.env.VUE_APP_ROOT_API + "/me", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const roleResponse = await fetch(
          process.env.VUE_APP_ROOT_API + "/evkinja/role",
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const myValueNow = await fetch(process.env.VUE_APP_ROOT_API + "/evkinja/myvaluenow", {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        data.myValueNow = await myValueNow.json();
        if(data.myValueNow.length > 0 ) {
          if(Object.values(data.myValueNow)[0].ok_by_user == 1 ) {
            data.myStatus.isSelesaiMengisi = true;
          }else if(Object.values(data.myValueNow)[0].ok_by_user == 0 ) {
            data.myStatus.isProsesMengisi = true;
          }
        }else{
          data.myStatus.isBelumMengisi = true;
        }

        const jobTitleResponse = await fetch(
          process.env.VUE_APP_ROOT_API + "/evkinja/current-job-title",
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const content = await response.json();
        store.commit("setAuth", true);
        store.commit("setUser", Object.values(content)[0]);

        const role = await roleResponse.json();
        if (role.assessed) {
          store.commit("setAssessed", true);
          localStorage.setItem("isAssessed", true);
        }
        if (role.assessor) {
          store.commit("setAssessor", true);
          localStorage.setItem("isAssessor", true);
        }
        if (role.hrm) {
          store.commit("setHrm", true);
          localStorage.setItem("isHrm", true);
        }

        const dataresponse = await jobTitleResponse.json();
        data.jobTitles = Object.values(dataresponse).filter(
          (j) => j.count.length > 0
        );
        store.commit("setRecapitulation", data.jobTitles);
        store.commit("setJobTitles", dataresponse);

        let jumlahPersonil = [];
        data.jobTitles.map((item) =>
          jumlahPersonil.push(Object.values(item.count).length)
        );
        data.summary.jumlahPersonil = jumlahPersonil.reduce((a, b) => {
          return a + b;
        }, 0);

        let belumMengisi = [];
        let databelumMengisi = [];
        data.jobTitles.map((item) =>
          belumMengisi.push(Object.values(item.belumMengisi).length)
        );
        data.summary.belumMengisi = belumMengisi.reduce((a, b) => {
          return a + b;
        }, 0);
        data.jobTitles.map((item) => {
          if (item.belumMengisi.length > 0) {
            databelumMengisi.push(Object.values(item.belumMengisi));
          }
        });
        databelumMengisi.map((item) => {
            item.map( (e) => data.details.belumMengisi.push(e))
        })

        let prosesMengisi = [];
        let dataprosesMengisi = [];
        data.jobTitles.map((item) =>
          prosesMengisi.push(Object.values(item.prosesMengisi).length)
        );
        data.summary.prosesMengisi = prosesMengisi.reduce((a, b) => {
          return a + b;
        }, 0);
        data.jobTitles.map((item) => {
          if (Object.values(item.prosesMengisi).length > 0) {
            dataprosesMengisi.push(Object.values(item.prosesMengisi));
          }
        });
        dataprosesMengisi.map((item) => {
            item.map( (e) => data.details.prosesMengisi.push(e))
        });

        let selesaiMengisi = [];
        let dataselesaiMengisi = [];
        data.jobTitles.map((item) =>
          selesaiMengisi.push(Object.values(item.selesaiMengisi).length)
        );
        data.summary.selesaiMengisi = selesaiMengisi.reduce((a, b) => {
          return a + b;
        }, 0);
        data.jobTitles.map((item) => {
          if (Object.values(item.selesaiMengisi).length > 0) {
            dataselesaiMengisi.push(Object.values(item.selesaiMengisi));
          }
        });
        dataselesaiMengisi.map((item) => {
            item.map( (e) => data.details.selesaiMengisi.push(e))
        });

        let siapEvaluasi = [];
        let datasiapEvaluasi = [];
        data.jobTitles.map((item) =>
          siapEvaluasi.push(Object.values(item.siapEvaluasi).length)
        );
        data.summary.siapEvaluasi = siapEvaluasi.reduce((a, b) => {
          return a + b;
        }, 0);
        data.jobTitles.map((item) => {
          if (Object.values(item.siapEvaluasi).length > 0) {
            datasiapEvaluasi.push(Object.values(item.siapEvaluasi));
          }
        });
        datasiapEvaluasi.map((item) => {
          item.map( (e) => data.details.siapEvaluasi.push(e))
        });

        let prosesEvaluasi = [];
        let dataprosesEvaluasi = [];
        data.jobTitles.map((item) =>
          prosesEvaluasi.push(Object.values(item.prosesEvaluasi).length)
        );
        data.summary.prosesEvaluasi = prosesEvaluasi.reduce((a, b) => {
          return a + b;
        }, 0);
        data.jobTitles.map((item) => {
          if (Object.values(item.prosesEvaluasi).length > 0) {
            dataprosesEvaluasi.push(Object.values(item.prosesEvaluasi));
          }
        });
        dataprosesEvaluasi.map((item) => {
          item.map( (e) => data.details.prosesEvaluasi.push(e))
        });

        let selesaiEvaluasi = [];
        let dataselesaiEvaluasi = [];
        data.jobTitles.map((item) =>
          selesaiEvaluasi.push(Object.values(item.selesaiEvaluasi).length)
        );
        data.summary.selesaiEvaluasi = selesaiEvaluasi.reduce((a, b) => {
          return a + b;
        }, 0);
        data.jobTitles.map((item) => {
          if (item.selesaiEvaluasi.length > 0) {
            dataselesaiEvaluasi.push(Object.values(item.selesaiEvaluasi));
          }
        });
        dataselesaiEvaluasi.map((item) => {
          item.map( (e) => data.details.selesaiEvaluasi.push(e))
        });

        const districtsResponse = await fetch(
          process.env.VUE_APP_ROOT_API + "/zone/districts",
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        data.districts = await districtsResponse.json();
      } catch (e) {
        store.commit("setAuth", false);
        localStorage.removeItem("authenticated");
        localStorage.removeItem("isAssessed");
        localStorage.removeItem("isAssessor");
        localStorage.removeItem("isHrm");
        router.push("/login");
      }

      try { 
        const mySettingNow = await fetch(process.env.VUE_APP_ROOT_API + "/evkinja/mysettingnow", {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        data.mySettingNow = await mySettingNow.json();
        
        if(data.mySettingNow != null){
            data.myStatus.isSetting = true;
        }
       } catch(e) {
            data.myStatus.isSetting = false;
       }
      data.isLoading = false;
    });

    const createNewValue = async () => {

      data.isLoading = true;
        const dataValue = await reactive({ 'settingId' : data.mySettingNow.id })

        const createNewValue = await fetch(process.env.VUE_APP_ROOT_API + "/evkinja/create-new-value", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dataValue),
            })

            data
           const valueResponse = await createNewValue.json()
           console.log(await createNewValue)

           if(createNewValue.status == 201){
               router.push("/assessment/" + valueResponse.id);
           }else{
      data.isLoading = false;
               console.log(await createNewValue.json())
           }
        
        
    }

    const belumMengisi = () => data.isBelumMengisi = !data.isBelumMengisi;
    const prosesMengisi = () => data.isProsesMengisi = !data.isProsesMengisi;
    const selesaiMengisi = () => data.isSelesaiMengisi = !data.isSelesaiMengisi;
    const siapEvaluasi = () => data.isSiapEvaluasi = !data.isSiapEvaluasi;
    const prosesEvaluasi = () => data.isProsesEvaluasi = !data.isProsesEvaluasi;
    const selesaiEvaluasi = () => data.isSelesaiEvaluasi = !data.isSelesaiEvaluasi;

    return {
      authenticated,
      user,
      data,
      belumMengisi,
      prosesMengisi,
      selesaiMengisi,
      siapEvaluasi,
      prosesEvaluasi,
      selesaiEvaluasi,
      role,createNewValue,
    };
  },
};
</script>

<style>

</style>
