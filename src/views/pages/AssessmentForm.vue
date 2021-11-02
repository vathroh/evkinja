<template>
    <div>
        <spinner :isLoading="data.isLoading" />

    <div class="page card">
        <div class="card-header">
            <div class="title">
                <h3>Evaluasi Kinerja {{data.thisUser.job_title }}</h3>
            </div>
            <h3>Triwulan Tahun  </h3>
        </div> 
        <div class="card-body">
            <table>
                <tbody>
                    <tr>
                        <td>Nama </td>
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
    <table class="assessment table">
        <thead>
            <tr>
                <th>No.</th>
                <th>Aspek Kinerja</th>
                <th>Variabel Target</th>
                <th>Tercapai %</th>
                <th>Penilaian Ketercapaian %</th>
                <th>Skor</th>
                <th>Bukti</th>
            </tr>
        </thead>
        <tbody v-for="(criteria, index) in data.thisContent" :key="index">
            <tr>
                <td style="text-align: left;">{{ index + 1 }}</td>
                <td colspan="6">{{ criteria.criteria }}</td>
            </tr>
            <tr v-for="(aspect, idx) in criteria.aspects" :key="aspect.aspect">
                <td style="text-align: right;">{{ idx + 1 }}</td>
                <td>{{ aspect.aspect }}</td>
                <td class="text-center"><input type="checkbox" :checked="aspect.variable == 1" /></td>
                <td class="text-center">{{ aspect.achievement }}</td>
                <td class="text-center">{{ aspect.assessment }}</td>
                <td class="text-center">{{ aspect.score }}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2" class="text-center">Jumlah</td>
                <td class="text-center">{{ criteria.sumVariable }}</td>
                <td colspan="2"></td>
                <td class="text-center">{{ criteria.sumScores }}</td>
                <td></td>
            </tr> 
        </tbody>
        <tbody>
            <tr>
                <td colspan="2" class="text-center">TOTAL</td>
                <td class="text-center">{{ data.thisEvkinja.totalVariable }}</td>
                <td colspan="2"></td>
                <td class="text-center">{{ data.thisEvkinja.totalScore }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
    <div class="d-flex">
        <div class="bagi2 mini-card">
            <div class="mini-card-header">
                <div class="mini-card-title">
                    REKOMENDASI PERBAIKAN
                </div>
            </div>
            <div class="mini-card-body">
                <textarea class="form-control" id="recommendation" data-value="850" rows="6"></textarea>
            </div>
        </div>
        <div class="bagi2 mini-card">
            <div class="mini-card-header">
                MASALAH DAN SARAN
            </div>
            <div class="mini-card-body">
                <textarea class="form-control" id="recommendation" data-value="850" rows="6"></textarea>
            </div>
        </div>
    </div>
    <div>
        <div class="mini-card">
            <div class="mini-card-header">
                Status Blacklist
            </div>
            <div class="mini-card-body">
                <div class="card-list">
                    <input type="checkbox" id="blacklist" name="blacklists[]" data-id=1 value="1">
                    <label>Penyalahgunaan Dana Program/LKM/Masyarakat</label>
                </div>
                <div class="card-list">
                    <input type="checkbox" id="blacklist" name="blacklists[]" data-id=2 value="2"  >
                    <label>Manipulasi Data atau Data SIM</label>
                </div>
            </div>
        </div>

        <div class="mini-card">
            <div class="mini-card-header">
                Hasil Akhir/Kualifikasi Kinerja
            </div>
            <div class="mini-card-body">
                <h2 id="finalResult" class="text-center" style="vertical-align: bottom;">Sangat Baik</h2>
            </div>
        </div>
    </div>
</div>
    </div>
</div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { onMounted, reactive } from 'vue'
    import spinner from '../../components/Spinner'

    const route = useRoute();
    const id = route.params.id;
    const data = reactive({
        thisUser:  [],
        thisEvkinja: [],
        thisContent: [],
        isLoading: false
    })

    onMounted(
        async () => {
            data.isLoading = true

            const thisUser = await fetch(process.env.VUE_APP_ROOT_API + '/evkinja/personil/'+id, 
                {
                    headers:  { 'Content-Type': 'application/json'},
                    credentials:  'include'
                }
            )

            const thisContent = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/content/'+id, 
                {
                    headers:  { 'Content-Type': 'application/json'},
                    credentials:  'include'
                }
            )

            const thisEvkinja = await fetch(process.env.VUE_APP_ROOT_API +'/evkinja/data/'+id, 
                {
                    headers:  { 'Content-Type': 'application/json'},
                    credentials:  'include'
                }
            )           
 
            data.thisUser = await thisUser.json();
            data.thisContent = await thisContent.json();
            data.thisEvkinja = await thisEvkinja.json();
    
            data.isLoading = false
        }
    )

</script>

<style scoped>
</style>
