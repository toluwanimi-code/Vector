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
      "I've thought about it",
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
    question: "Is there anything specific you're stuck on or confused about in your career right now?"
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
  document
    .querySelectorAll('.option-btn')
    .forEach((b) => b.classList.remove('selected'));

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
        <button class="option-btn" data-index="${index}">
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
      ></textarea>`;
  }

  questionContainer.innerHTML = html;

  if (q.type === 'multiple-choice') {
    const optionButtons = questionContainer.querySelectorAll('.option-btn');

    optionButtons.forEach((btn, index) => {
        if (q.options[index] === answers[q.id]) {
    btn.classList.add('selected');
  }

      btn.addEventListener('click', () => {
        selectOption(btn, q.id, q.options[index]);
      });
    });
  } else if (q.type === 'text') {
    const textArea = document.getElementById('text-answer');
if (answers[q.id] !== undefined) {
  textArea.value = answers[q.id];
}

   textArea.addEventListener('change', () => {
  answers[q.id] = textArea.value;
  console.log(answers);
});
  }

  backBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
  submitBtn.style.display =
    currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
  nextBtn.style.display =
    currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
}

function buildPrompt(answers) {
  return `You are Vector, an AI career diagnosis system for aspiring developers.

Your job is to analyze a developer's self-assessment and return an honest, structured diagnosis of where they currently stand in their career journey.

You classify users into exactly one of these five stages:
1. Learning — Primarily consuming content. Little to no original output.
2. Builder — Actively building projects independently. Some output exists.
3. Internship Ready — Has shipped real projects, has public presence, understands fundamentals well enough to contribute on a team.
4. Market Validation — Has received external signal (users, feedback, clients, responses to applications).
5. Founder Readiness — Has shipped products that real people use or pay for. Understands the full cycle from idea to deployment to validation.

Rules:
- Be honest. Do not flatter the user.
- If their answers suggest they are stuck in tutorial hell, say so directly.
- If their effort does not match their output, flag it in the reality check.
- Base your diagnosis only on what the answers reveal, not what the user hopes.

User's self-assessment:
Q1 - Primary learning activity: ${answers.q1 || 'No answer'}
Q2 - What they do after finishing a tutorial: ${answers.q2 || 'No answer'}
Q3 - Number of projects built without tutorials: ${answers.q3 || 'No answer'}
Q3b - Project description: ${answers.q3b || 'No answer'}
Q4 - Public accessibility of projects: ${answers.q4 || 'No answer'}
Q5 - Coding frequency per week: ${answers.q5 || 'No answer'}
Q6 - Portfolio or public presence: ${answers.q6 || 'No answer'}
Q7 - Real-world application attempts: ${answers.q7 || 'No answer'}
Q8 - External validation received: ${answers.q8 || 'No answer'}
Q8b - What they are currently stuck on: ${answers.q8b || 'No answer'}

Return your response in this exact JSON format and nothing else:
{
  "stage": "",
  "explanation": "",
  "next_steps": ["", "", "", ""],
  "reality_check": ""
}`;
}

async function getDiagnosis() {
  const prompt = buildPrompt(answers);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${CONFIG.API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('API error:', data);
      throw new Error(
        data.error?.message || `Request failed with status ${response.status}`
      );
    }

    const text = data.candidates[0].content.parts[0].text;
    const cleaned = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleaned);

    return result;
  } catch (error) {
    console.error('API call failed:', error);
    return null;
  }
}

submitBtn.addEventListener('click', async () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing...';

  showSection(resultsSection);

  document.getElementById('stage-name').textContent = 'Analyzing...';
  document.getElementById('explanation').textContent = '';
  document.getElementById('next-steps').innerHTML = '';
  document.getElementById('reality-check').textContent = '';

  const result = await getDiagnosis();

  if (result) {
    document.getElementById('stage-name').textContent = result.stage;
    document.getElementById('explanation').textContent = result.explanation;
    document.getElementById('reality-check').textContent =
      result.reality_check;

    const nextStepsList = document.getElementById('next-steps');

    result.next_steps.forEach((step) => {
      const li = document.createElement('li');
      li.textContent = step;
      nextStepsList.appendChild(li);
    });
  } else {
    document.getElementById('stage-name').textContent = 'Something went wrong.';
    document.getElementById('explanation').textContent = 'Please try again.';
  }

  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit';
});