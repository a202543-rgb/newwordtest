// 퀴즈 데이터 배열
const quizData = [
    {
        question: "‘킹받네’는 무슨 뜻인가요?",
        options: ["정말 화가 나네", "왕이 화가 났네", "킹이 받쳐주네", "킹이 되었네"],
        answer: "정말 화가 나네"
    },
    {
        question: "‘내돈내산’은 무슨 뜻의 줄임말인가요?",
        options: ["내 돈 주고 내가 산 것", "내 돈 내고 산 물건", "내 돈 내 산책", "내 돈을 내 산에 쓴 것"],
        answer: "내 돈 주고 내가 산 것"
    },
    {
        question: "‘꾸안꾸’는 무슨 뜻인가요?",
        options: ["꾸민 듯 안 꾸민 듯", "꾸미기만 하고 안 꾸민 척", "꿈과 안녕", "꾸준히 안 꾸민 사람"],
        answer: "꾸민 듯 안 꾸민 듯"
    },
    {
        question: "‘스불재’는 어떤 상황에 쓰는 말인가요?",
        options: ["스스로 불러온 재앙", "스트레스 받는 사람", "스스로 불을 지른 사람", "쓰레기 분리수거 재활용"],
        answer: "스스로 불러온 재앙"
    },
    {
        question: "‘점메추’는 무슨 뜻인가요?",
        options: ["점심 메뉴 추천", "점점 멀어지는 추억", "점심에 먹는 추어탕", "점수 내기 추리"],
        answer: "점심 메뉴 추천"
    },
    {
        question: "‘군싹’은 무슨 뜻인가요?",
        options: ["군침이 싹 도네", "군대에서 싹싹 긁어먹는다", "군대 싹쓸이", "군인들의 싹수"],
        answer: "군침이 싹 도네"
    },
    {
        question: "‘폼 미쳤다’는 어떤 의미로 사용되나요?",
        options: ["실력이나 모습이 매우 뛰어나다", "폼이 나빠졌다", "폼이 미친 것 같다", "폼을 미쳐버리다"],
        answer: "실력이나 모습이 매우 뛰어나다"
    },
    {
        question: "‘만반잘부’의 뜻은 무엇인가요?",
        options: ["만나서 반가워 잘 부탁해", "만들면 반드시 잘 부탁해", "만약에 반가워도 잘 부탁해", "만세, 반드시 잘 부탁해"],
        answer: "만나서 반가워 잘 부탁해"
    }
];

const quizContent = document.getElementById('quiz-content');
const checkButton = document.getElementById('check-button');
const resultMessage = document.getElementById('result-message');

// 배열의 요소를 무작위로 섞는 함수 (Fisher-Yates 알고리즘)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 퀴즈를 화면에 그리는 함수
function renderQuiz() {
    quizData.forEach((item, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        
        const questionText = document.createElement('p');
        questionText.className = 'text-lg font-semibold mb-4 text-gray-700';
        questionText.textContent = `${index + 1}. ${item.question}`;
        questionCard.appendChild(questionText);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';
        
        // 선택지 배열을 무작위로 섞음
        const shuffledOptions = shuffleArray([...item.options]);

        shuffledOptions.forEach(option => {
            const optionId = `q${index}-option-${option.replace(/\s+/g, '-')}`;
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            input.id = optionId;
            
            const label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = option;
            
            optionsContainer.appendChild(input);
            optionsContainer.appendChild(label);
        });
        
        questionCard.appendChild(optionsContainer);
        quizContent.appendChild(questionCard);
    });
}

// 정답을 확인하는 함수
function checkAnswers() {
    let score = 0;
    let allAnswered = true;
    
    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        
        // 모든 문제가 선택되었는지 확인
        if (!selectedOption) {
            allAnswered = false;
        } else {
            // 정답 확인 및 점수 계산
            if (selectedOption.value === item.answer) {
                score++;
            }
        }
    });
    
    // 모든 문제가 풀리지 않았을 경우
    if (!allAnswered) {
        resultMessage.textContent = "모든 문제에 답해주세요!";
        resultMessage.className = "result-message incorrect block";
        resultMessage.style.display = 'block';
        return;
    }
    
    // 결과 메시지 표시
    resultMessage.style.display = 'block';
    resultMessage.textContent = `당신의 점수는 ${quizData.length}문제 중 ${score}점입니다.`;
    resultMessage.className = `result-message ${score === quizData.length ? 'correct' : 'incorrect'} block`;
}

// 이벤트 리스너 연결
checkButton.addEventListener('click', checkAnswers);

// 페이지 로드 시 퀴즈 생성
document.addEventListener('DOMContentLoaded', renderQuiz);
