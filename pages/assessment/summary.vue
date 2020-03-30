<template>
  <section class="container mx-auto">
<div class="card">
    <div class="header">
      <div class="title font-bold text-xl text-blue mb-2 uppercase">
        Summary
      </div>
      <div class="dots">🌭 🌭 🌭</div>
    </div>
  <div class="contents">
    <div class="summary">
      <div class="summary-item-container key">
        <div class="question">Question</div>
        <div class="answer">Answer</div>
      </div>
      <div class="summary-item-container" v-for="(question, index) in questions" :key="index">
        <div class="question">
        {{question.text}} 
        </div>

        <div class="answer">
          {{ question.answer}}
        </div>

        <div class="edit">edit</div>
      </div>
    </div>
  </div>
</div>
  </section>
</template>

<script>
import questions from '../../lib/index';
export default {
  data() {
    return {
      questions: questions,
      questionsArray: [],
      assessmentData: {}
    }
  },
  created() {

  },
  mounted() {
    this.assessmentData = this.$store.getters.getAssessmentData;

    if(sessionStorage.getItem('current') !== 'summary') {
      this.$router.replace(`/assessment/${sessionStorage.getItem('current')}`)
    }

    for (var propName in this.questions) {
      this.questions[propName].answer = this.assessmentData[propName];
    }

    // for (var propName in this.questions) {
    //   if(this.questions[propName].answer === null || this.questions[propName].answer === undefined) {
    //     delete this.questions[propName]
    //   }
    // }

    console.log(this.questions)

  },
  methods: {

  }
}
</script>

<style scoped>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card {
  min-height: 450px;
  width: 650px;
  background-color: white;
  border-radius: 0.25rem;
  padding: 0.8rem 2rem 2rem;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
}

.card .contents {
  height: 100%;
  font-size: 22px;
  display: flex;
}

.summary {
  width: 100%;
}

.summary-item-container {

  font-size: 16px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  padding: 1rem;
  grid-gap: 1rem;
  text-align: left;
  align-items: center;
}

.summary-item-container.key {
  font-weight: bold;
}

.summary-item-container .answer {
  font-weight: bold;
}

.summary-item-container .edit {
  font-weight: bold;
  color: dodgerblue;
  text-decoration: underline;
  cursor: pointer;
  font-weight: normal;
}

.summary-item-container:nth-child(even) {
  background-color: #eee;
}
</style>