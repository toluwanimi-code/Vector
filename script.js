const landingSection = document.getElementById('landing');
const assessmentSection = document.getElementById('assessment');
const resultsSection = document.getElementById('results');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const submitBtn = document.getElementById('submit-btn');
const retakeBtn = document.getElementById('retake-btn');



const progressEl = document.getElementById('progress');
const questionContainer = document.getElementById('question-container');

const questions = [
    {
        id: 'q1',
        type: 'multiple-choice',
        question: 'How do you primarily spend your learning time?',
        options: [
            'Tutorial watching',
            'Reading docs & books',
            'Building projects',
            'A mix of everything'
        ]
    },
    {
    id: 'q2',
    type: 'multiple-choice',
    question: 'When you finish a tutorial or course, what do you usually do next?',
    options: [
      'Start another one',
      'Try to build something from it',
      'Nothing, I move on'
    ]
  },
   {
    id: 'q3',
    type: 'multiple-choice',
    question: 'How many projects have you built from scratch — without following a tutorial?',
    options: ['0', '1–2', '3–5', 'More than 5']
  },
  {
    id: 'q3b',
    type: 'text',
    question: 'Briefly describe one project you built. What did it do?'
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    question: 'Are any of your projects publicly accessible?',
    options: [
      'No',
      'Yes, on GitHub only',
      'Yes, deployed and live'
    ]
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    question: 'How often do you write or ship code in a typical week?',
    options: ['Rarely', '1–2 days', '3–4 days', 'Almost every day']
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    question: 'Do you have a portfolio or any public presence showing your work?',
    options: ['No', 'In progress', 'Yes, live']
  },
  {
    id: 'q7',
    type: 'multiple-choice',
    question: 'Have you applied for internships, freelance work, or shared your work with potential employers?',
    options: [
      'No',
      'I\'ve thought about it',
      'Yes, with no response',
      'Yes, with some response'
    ]
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    question: 'Has anyone outside your personal circle used, reviewed, or paid for anything you built?',
    options: [
      'No',
      'Someone reviewed my work',
      'Yes, people have used it',
      'Yes, someone paid me'
    ]
  },
  {
    id: 'q8b',
    type: 'text',
    question: 'Is there anything specific you\'re stuck on or confused about in your career right now?'
  }
];


let currentQuestion = 0;
let answers = {};


function showSection(section) {
  landingSection.classList.add('hidden');
  assessmentSection.classList.add('hidden');
  resultsSection.classList.add('hidden');
  section.classList.remove('hidden');
}


function selectOption(btn, questionId, value) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  answers[questionId] = value;
}

startBtn.addEventListener('click', () => {
  showSection(assessmentSection);
  renderQuestion();
});

retakeBtn.addEventListener('click', () => {
  currentQuestion = 0;
  answers = {};
  showSection(assessmentSection);
  renderQuestion();
});

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  renderQuestion();
});

backBtn.addEventListener('click', () => {
  currentQuestion--;
  renderQuestion();
});

function renderQuestion() {
  const q = questions[currentQuestion];

  progressEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  let html = `<h2 class="question-text">${q.question}</h2>`;

  if (q.type === 'multiple-choice') {
    html += `<div class="options">`;
    q.options.forEach((option, index) => {
      html += `
        <button class="option-btn" data-index="${index}" onclick="selectOption(this, '${q.id}', '${option}')">
          ${option}
        </button>`;
    });
    html += `</div>`;
  } else if (q.type === 'text') {
    html += `
      <textarea 
        id="text-answer" 
        class="text-input" 
        placeholder="Type your answer here..."
        onchange="answers['${q.id}'] = this.value"
      ></textarea>`;
  }

  questionContainer.innerHTML = html;


  backBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
  submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
  nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
}