// Elementos DOM
const startScreen = document.getElementById('startScreen');
const testScreen = document.getElementById('testScreen');
const resultScreen = document.getElementById('resultScreen');
const historyScreen = document.getElementById('historyScreen');

const loadedFilesInfo = document.getElementById('loadedFilesInfo');
const fileCountText = document.getElementById('fileCount');
const totalAvailableText = document.getElementById('totalAvailable');
const startTestBtn = document.getElementById('startTestBtn');
const startExamBtn = document.getElementById('startExamBtn');
const viewHistoryBtn = document.getElementById('viewHistoryBtn');
const historyToStartBtn = document.getElementById('historyToStartBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const currentQuestionNumberText = document.getElementById('currentQuestionNumber');
const scoreTrackerText = document.getElementById('scoreTracker');
const testProgressFill = document.getElementById('testProgressFill');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitExamBtn = document.getElementById('submitExamBtn');
const exitTestBtn = document.getElementById('exitTestBtn');

const finalScoreText = document.getElementById('finalScoreText');
const feedbackMessage = document.getElementById('feedbackMessage');
const tryAgainBtn = document.getElementById('tryAgainBtn');

// Estado
let allQuestions = [];
let testQuestions = [];
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
const TEST_LIMIT = 40;

let testMode = 'normal'; // 'normal' | 'examen'
let reviewMode = false;
let userAnswers = [];
let chartInstance = null;
let isResultSaved = false;
let isConfirmDialogActive = false;

document.addEventListener('DOMContentLoaded', autoLoadQuestions);
startTestBtn.addEventListener('click', () => startTest('normal'));
startExamBtn.addEventListener('click', () => startTest('examen'));
nextBtn.addEventListener('click', proceedToNext);
prevBtn.addEventListener('click', proceedToPrev);
exitTestBtn.addEventListener('click', exitTest);
viewHistoryBtn.addEventListener('click', showHistory);
historyToStartBtn.addEventListener('click', () => switchScreen(startScreen));
clearHistoryBtn.addEventListener('click', clearHistory);
tryAgainBtn.addEventListener('click', () => switchScreen(startScreen));

// Funciones
async function autoLoadQuestions() {
    try {
        const response = await fetch('./data/preguntas_comunes.json');
        if (!response.ok) throw new Error("No se pudo cargar el archivo local");
        
        const text = await response.text();
        const data = JSON.parse(text);
        
        allQuestions = data.filter(q => q.respuestaCorrecta && q.respuestaCorrecta !== "");
        
        fileCountText.textContent = "1";
        totalAvailableText.textContent = allQuestions.length;
        
        loadedFilesInfo.classList.remove('hidden');
        const loadingZone = document.getElementById('loadingZone');
        if (loadingZone) loadingZone.style.display = 'none';

        if (allQuestions.length === 0) {
            startTestBtn.disabled = true;
            startExamBtn.disabled = true;
            startTestBtn.textContent = 'Sin preguntas';
        } else {
            startTestBtn.disabled = false;
            startExamBtn.disabled = false;
            startTestBtn.textContent = 'Comenzar Test';
        }
    } catch (e) {
        console.error("Error cargando las preguntas:", e);
        const loadingMessage = document.getElementById('loadingMessage');
        if (loadingMessage) loadingMessage.textContent = "Error al cargar las preguntas automáticamente. Por favor, asegúrate de estar en un servidor local o GitHub Pages.";
    }
}

function startTest(mode) {
    testMode = mode;
    reviewMode = false;
    
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    
    let pool = [...allQuestions].map(q => {
        let failures = failuresMap[q.pregunta] || 0;
        return { q, weight: 1 + failures }; // A mayor número de fallos, mayor peso
    });
    
    testQuestions = [];
    const limit = Math.min(TEST_LIMIT, pool.length);
    
    for (let i = 0; i < limit; i++) {
        let totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
        let randomNum = Math.random() * totalWeight;
        
        let cumulativeWeight = 0;
        for (let j = 0; j < pool.length; j++) {
            cumulativeWeight += pool[j].weight;
            if (randomNum <= cumulativeWeight) {
                testQuestions.push(pool[j].q);
                pool.splice(j, 1);
                break;
            }
        }
    }
    
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    isResultSaved = false;
    userAnswers = new Array(testQuestions.length).fill(null);
    
    switchScreen(testScreen);
    renderQuestion();
}

function renderQuestion() {
    const q = testQuestions[currentQuestionIndex];
    
    currentQuestionNumberText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${testQuestions.length}`;
    
    if (testMode === 'normal' || reviewMode) {
        scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;
    } else {
        const respondidas = userAnswers.filter(a => a !== null).length;
        scoreTrackerText.textContent = `Respondidas: ${respondidas}`;
    }

    const progress = ((currentQuestionIndex + 1) / testQuestions.length) * 100;
    testProgressFill.style.width = `${progress}%`;
    
    questionText.textContent = q.pregunta;
    optionsContainer.innerHTML = '';
    
    const options = [
        { letter: 'A', text: q.opciones.A },
        { letter: 'B', text: q.opciones.B },
        { letter: 'C', text: q.opciones.C },
        { letter: 'D', text: q.opciones.D }
    ];

    options.forEach(opt => {
        if (!opt.text) return;

        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="op-letter">${opt.letter}</span>
            <span class="op-text">${opt.text}</span>
        `;
        
        const userA = userAnswers[currentQuestionIndex];
        
        if (testMode === 'examen' && !reviewMode) {
            if (userA === opt.letter) {
                btn.classList.add('selected');
            }
            btn.onclick = () => handleAnswerSelected(btn, opt.letter, q.respuestaCorrecta);
        } else if (reviewMode) {
            btn.disabled = true;
            btn.style.cursor = 'default';
            if (opt.letter === q.respuestaCorrecta) {
                btn.classList.add('correct');
            } else if (userA === opt.letter && userA !== q.respuestaCorrecta) {
                btn.classList.add('incorrect');
            }
        } else if (testMode === 'normal') {
            if (userA) {
                // Ya respondido
                btn.disabled = true;
                btn.style.cursor = 'default';
                if (opt.letter === q.respuestaCorrecta) {
                    btn.classList.add('correct');
                } else if (userA === opt.letter && userA !== q.respuestaCorrecta) {
                    btn.classList.add('incorrect');
                }
            } else {
                btn.onclick = () => handleAnswerSelected(btn, opt.letter, q.respuestaCorrecta);
            }
        }
        
        optionsContainer.appendChild(btn);
    });

    manageNavigationButtons();
}

function handleAnswerSelected(selectedBtn, selectedLetter, correctLetter) {
    userAnswers[currentQuestionIndex] = selectedLetter;

    if (testMode === 'normal') {
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => {
            b.disabled = true;
            b.style.cursor = 'default';
            const bLetter = b.querySelector('.op-letter').textContent;
            if (bLetter === correctLetter) {
                b.classList.add('correct');
            }
        });

        if (selectedLetter === correctLetter) {
            correctAnswersCount++;
        } else {
            selectedBtn.classList.add('incorrect');
        }
        scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;
    } else {
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.classList.remove('selected'));
        selectedBtn.classList.add('selected');
        
        const respondidas = userAnswers.filter(a => a !== null).length;
        scoreTrackerText.textContent = `Respondidas: ${respondidas}`;
    }

    manageNavigationButtons();
}

function manageNavigationButtons() {
    nextBtn.classList.add('hidden');
    prevBtn.classList.add('hidden');
    submitExamBtn.classList.add('hidden');

    if (currentQuestionIndex > 0) {
        prevBtn.classList.remove('hidden');
    }

    if (currentQuestionIndex < testQuestions.length - 1) {
        if (testMode === 'examen' || reviewMode || userAnswers[currentQuestionIndex]) {
            nextBtn.classList.remove('hidden');
        }
        if (testMode === 'examen' && !reviewMode) {
            submitExamBtn.classList.remove('hidden');
            submitExamBtn.textContent = "Entregar Examen";
            submitExamBtn.onclick = submitExamHandler;
        }
    } else {
        // Última pregunta
        if (testMode === 'examen' && !reviewMode) {
            submitExamBtn.classList.remove('hidden');
            submitExamBtn.textContent = "Entregar Examen";
            submitExamBtn.onclick = submitExamHandler;
        } else if (testMode === 'normal' && userAnswers[currentQuestionIndex]) {
            submitExamBtn.classList.remove('hidden');
            submitExamBtn.textContent = "Ver Nota Final";
            submitExamBtn.onclick = finishTest;
        } else if (reviewMode) {
            submitExamBtn.classList.remove('hidden');
            submitExamBtn.textContent = "Ver Nota Final";
            submitExamBtn.onclick = finishTest;
        }
    }
}

function proceedToNext() {
    if (currentQuestionIndex < testQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function proceedToPrev() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function submitExamHandler() {
    if (isConfirmDialogActive) return;
    isConfirmDialogActive = true;
    const res = confirm("¿Seguro que quieres entregar el examen?");
    setTimeout(() => { isConfirmDialogActive = false; }, 300);
    if (!res) return;
    
    correctAnswersCount = 0;
    for (let i = 0; i < testQuestions.length; i++) {
        if (userAnswers[i] === testQuestions[i].respuestaCorrecta) {
            correctAnswersCount++;
        }
    }
    
    if (!isResultSaved) {
        saveResult();
        isResultSaved = true;
    }
    
    reviewMode = true;
    currentQuestionIndex = 0; // Volvemos a la 1
    
    // Cambiar la vista superior
    scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;
    
    renderQuestion();
}

function finishTest() {
    testProgressFill.style.width = '100%';
    
    if (!isResultSaved) {
        saveResult();
        isResultSaved = true;
    }
    
    finalScoreText.textContent = correctAnswersCount;
    document.querySelector('.score-max').textContent = `/ ${testQuestions.length}`;
    
    const percentage = (correctAnswersCount / testQuestions.length) * 100;
    
    if (percentage >= 90) {
        feedbackMessage.textContent = "¡Sobresaliente! Estás muy preparad@.";
    } else if (percentage >= 70) {
        feedbackMessage.textContent = "Buen trabajo. ¡Tus conocimientos son sólidos!";
    } else if (percentage >= 50) {
        feedbackMessage.textContent = "Aprobado. Hay margen de mejora con algo de repaso.";
    } else {
        feedbackMessage.textContent = "Debes seguir estudiando. ¡No te rindas!";
    }

    switchScreen(resultScreen);
}

function switchScreen(screenElement) {
    [startScreen, testScreen, resultScreen, historyScreen].forEach(el => {
        if(el) el.classList.remove('active');
    });
    screenElement.classList.add('active');
}

function exitTest() {
    if (testMode === 'examen') {
        if (isConfirmDialogActive) return;
        isConfirmDialogActive = true;
        const res = confirm("¿Estás seguro de que deseas salir? Perderás el progreso de este examen.");
        setTimeout(() => { isConfirmDialogActive = false; }, 300);
        if (res) {
            switchScreen(startScreen);
        }
    } else {
        // Test normal: salir sin pedir confirmación
        switchScreen(startScreen);
    }
}

function saveResult() {
    const historyData = JSON.parse(localStorage.getItem('antigravity_history') || '[]');
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    
    let respondidas = 0;
    
    for (let i = 0; i < testQuestions.length; i++) {
        const q = testQuestions[i];
        const ua = userAnswers[i];
        
        if (ua !== null) {
            respondidas++;
            const hash = q.pregunta;
            if (ua === q.respuestaCorrecta) {
                if (failuresMap[hash]) {
                    failuresMap[hash] = Math.max(0, failuresMap[hash] - 1); // Disminuye el peso si se acierta
                }
            } else {
                failuresMap[hash] = (failuresMap[hash] || 0) + 1; // Aumenta el peso si se falla
            }
        }
    }
    
    localStorage.setItem('antigravity_failures', JSON.stringify(failuresMap));
    
    const record = {
        date: new Date().toISOString(),
        mode: testMode,
        correct: correctAnswersCount,
        answered: respondidas,
        total: testQuestions.length
    };
    
    historyData.push(record);
    localStorage.setItem('antigravity_history', JSON.stringify(historyData));
}

function showHistory() {
    switchScreen(historyScreen);
    renderHistory();
}

function renderHistory() {
    const historyData = JSON.parse(localStorage.getItem('antigravity_history') || '[]');
    
    let totalE = 0;
    let totalT = 0;
    let totalQuestions = 0;
    let totalCorrects = 0;
    
    const labels = [];
    const dataPoints = [];
    
    historyData.forEach((rec, index) => {
        if (rec.mode === 'examen') totalE++;
        else totalT++;
        
        totalQuestions += rec.answered;
        totalCorrects += rec.correct;
        
        labels.push(`Nº ${index + 1} (${rec.mode === 'examen' ? 'E' : 'T'})`);
        const pct = rec.total > 0 ? (rec.correct / rec.total) * 100 : 0;
        dataPoints.push(pct.toFixed(1));
    });
    
    document.getElementById('histTotalSessions').textContent = `${totalE} / ${totalT}`;
    document.getElementById('histTotalQuestions').textContent = totalQuestions;
    
    const overallWinRate = totalQuestions > 0 ? ((totalCorrects / totalQuestions) * 100).toFixed(1) : 0;
    document.getElementById('histWinRate').textContent = `${overallWinRate}%`;

    const ctx = document.getElementById('historyChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tasa de Acierto (%)',
                data: dataPoints,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Calcular la pregunta más fallada
    const failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let maxFailures = 0;
    let worstQuestionText = null;
    
    for (const [qText, failures] of Object.entries(failuresMap)) {
        if (failures > maxFailures) {
            maxFailures = failures;
            worstQuestionText = qText;
        }
    }
    
    const worstQuestionContainer = document.getElementById('worstQuestionContainer');
    const worstQuestionTitle = document.getElementById('worstQuestionTitle');
    const worstQuestionAnswer = document.getElementById('worstQuestionAnswer');
    
    if (worstQuestionText && maxFailures > 0) {
        worstQuestionContainer.style.display = 'block';
        worstQuestionTitle.textContent = worstQuestionText + ` (${maxFailures} fallos)`;
        
        let found = false;
        // Buscar la respuesta correcta en allQuestions
        for (const qObj of allQuestions) {
            if (qObj.pregunta === worstQuestionText) {
                const correctLetter = qObj.respuestaCorrecta;
                const correctText = qObj.opciones[correctLetter];
                worstQuestionAnswer.textContent = `${correctLetter}) ${correctText}`;
                found = true;
                break;
            }
        }
        
        if (!found) {
            worstQuestionAnswer.textContent = "Carga el archivo que contiene esta pregunta para ver la respuesta correcta.";
        }
    } else {
        worstQuestionContainer.style.display = 'none';
    }
}

function clearHistory() {
    if (isConfirmDialogActive) return;
    isConfirmDialogActive = true;
    const res = confirm("¿Estás seguro de que quieres borrar todo el historial? Esto no se puede deshacer.");
    setTimeout(() => { isConfirmDialogActive = false; }, 300);
    if (res) {
        localStorage.removeItem('antigravity_history');
        localStorage.removeItem('antigravity_failures');
        renderHistory();
    }
}
