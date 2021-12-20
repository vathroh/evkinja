import { reactive } from 'vue';

export default function(){
const data = reactive({
  thisContent: []
});

const dataContent = () => {
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

return { dataContent }

}

