const startScreen = document.getElementById('startScreen');
const testScreen = document.getElementById('testScreen');
const resultScreen = document.getElementById('resultScreen');
const historyScreen = document.getElementById('historyScreen');
const infoScreen = document.getElementById('infoScreen');
const flashcardScreen = document.getElementById('flashcardScreen');
const searchScreen = document.getElementById('searchScreen');

const resumeTestBtn = document.getElementById('resumeTestBtn');
const startFavoritesBtn = document.getElementById('startFavoritesBtn');
const startFailedBtn = document.getElementById('startFailedBtn');
const openSearchBtn = document.getElementById('openSearchBtn');
const pauseTestBtn = document.getElementById('pauseTestBtn');
const toggleFavoriteBtn = document.getElementById('toggleFavoriteBtn');
const openNoteBtn = document.getElementById('openNoteBtn');
const userNoteDisplay = document.getElementById('userNoteDisplay');

const searchToStartBtn = document.getElementById('searchToStartBtn');
const searchInput = document.getElementById('searchInput');
const doSearchBtn = document.getElementById('doSearchBtn');
const searchIdInput = document.getElementById('searchIdInput');
const searchRepoSelect = document.getElementById('searchRepoSelect');
const doSearchIdBtn = document.getElementById('doSearchIdBtn');
const searchResultCount = document.getElementById('searchResultCount');
const searchResultsContainer = document.getElementById('searchResultsContainer');

const noteModal = document.getElementById('noteModal');
const closeNoteModalBtn = document.getElementById('closeNoteModalBtn');
const noteTextarea = document.getElementById('noteTextarea');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');

const statsModal = document.getElementById('statsModal');
const closeStatsModalBtn = document.getElementById('closeStatsModalBtn');
const statsQuestionTitle = document.getElementById('statsQuestionTitle');
const statsQuestionText = document.getElementById('statsQuestionText');
const statsCorrectAnswer = document.getElementById('statsCorrectAnswer');
const statsSeen = document.getElementById('statsSeen');
const statsCorrect = document.getElementById('statsCorrect');
const statsWrong = document.getElementById('statsWrong');
const statsToggleFavBtn = document.getElementById('statsToggleFavBtn');
const statsOpenNoteBtn = document.getElementById('statsOpenNoteBtn');
const statsReportBtn = document.getElementById('statsReportBtn');

let currentActiveQuestion = null;

const streakContainer = document.getElementById('streakContainer');
const streakCountText = document.getElementById('streakCount');

const loadedFilesInfo = document.getElementById('loadedFilesInfo');
const fileCountText = document.getElementById('fileCount');
const totalAvailableText = document.getElementById('totalAvailable');
const startTestBtn = document.getElementById('startTestBtn');
const startExamBtn = document.getElementById('startExamBtn');
const viewHistoryBtn = document.getElementById('viewHistoryBtn');
const howItWorksBtn = document.getElementById('howItWorksBtn');
const historyToStartBtn = document.getElementById('historyToStartBtn');
const infoToStartBtn = document.getElementById('infoToStartBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const startFlashcardsBtn = document.getElementById('startFlashcardsBtn');
const exitFlashcardsBtn = document.getElementById('exitFlashcardsBtn');

const examTimerContainer = document.getElementById('examTimerContainer');
const examTimerText = document.getElementById('examTimerText');
const remainingTimeFeedback = document.getElementById('remainingTimeFeedback');

const currentQuestionNumberText = document.getElementById('currentQuestionNumber');
const scoreTrackerText = document.getElementById('scoreTracker');
const testProgressFill = document.getElementById('testProgressFill');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');

const flashcardElement = document.getElementById('flashcardElement');
const fcQuestionText = document.getElementById('fcQuestionText');
const fcAnswerText = document.getElementById('fcAnswerText');
const flashcardNumberText = document.getElementById('flashcardNumber');
const flashcardProgressFill = document.getElementById('flashcardProgressFill');
const fcNextBtn = document.getElementById('fcNextBtn');
const fcPrevBtn = document.getElementById('fcPrevBtn');
const fcFinishBtn = document.getElementById('fcFinishBtn');

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitExamBtn = document.getElementById('submitExamBtn');
const exitTestBtn = document.getElementById('exitTestBtn');

const finalScoreText = document.getElementById('finalScoreText');
const feedbackMessage = document.getElementById('feedbackMessage');
const tryAgainBtn = document.getElementById('tryAgainBtn');

const errorModal = document.getElementById('errorModal');
const reportErrorBtn = document.getElementById('reportErrorBtn');
const fcReportErrorBtn = document.getElementById('fcReportErrorBtn');
const closeErrorModalBtn = document.getElementById('closeErrorModalBtn');
const errorQuestionInfo = document.getElementById('errorQuestionInfo');
const errorCurrentAnswer = document.getElementById('errorCurrentAnswer');
const errorUserSuggestion = document.getElementById('errorUserSuggestion');
const errorUserComment = document.getElementById('errorUserComment');
const sendErrorEmailBtn = document.getElementById('sendErrorEmailBtn');

// Estado
let allQuestions = [];
let testQuestions = [];
let currentQuestionIndex = 0;
let correctAnswersCount = 0;

let dailyFlashcards = [];
let currentFlashcardIndex = 0;

let testMode = 'normal'; // 'normal' | 'examen'
let reviewMode = false;
let userAnswers = [];
let chartInstance = null;
let isResultSaved = false;
let isConfirmDialogActive = false;

let currentErrorQuestion = null;

let examTimerInterval = null;
let timeRemaining = 3600;
let finalTimeRemainingText = '';

document.addEventListener('DOMContentLoaded', autoLoadQuestions);
startTestBtn.addEventListener('click', () => startTest('normal'));
startExamBtn.addEventListener('click', () => startTest('examen'));
startFavoritesBtn.addEventListener('click', () => startTest('favoritas'));
startFailedBtn.addEventListener('click', () => startTest('falladas'));
resumeTestBtn.addEventListener('click', resumeSavedTest);
pauseTestBtn.addEventListener('click', pauseTest);
nextBtn.addEventListener('click', proceedToNext);
prevBtn.addEventListener('click', proceedToPrev);
exitTestBtn.addEventListener('click', exitTest);
viewHistoryBtn.addEventListener('click', showHistory);
howItWorksBtn.addEventListener('click', () => switchScreen(infoScreen));
historyToStartBtn.addEventListener('click', () => switchScreen(startScreen));
infoToStartBtn.addEventListener('click', () => switchScreen(startScreen));
searchToStartBtn.addEventListener('click', () => switchScreen(startScreen));
openSearchBtn.addEventListener('click', openSearchScreen);
doSearchBtn.addEventListener('click', performSearch);
doSearchIdBtn.addEventListener('click', performSearchById);
searchInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') performSearch(); });
searchIdInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') performSearchById(); });

toggleFavoriteBtn.addEventListener('click', toggleFavorite);
openNoteBtn.addEventListener('click', openNoteModal);
closeNoteModalBtn.addEventListener('click', () => noteModal.style.display = 'none');
saveNoteBtn.addEventListener('click', saveNote);
deleteNoteBtn.addEventListener('click', deleteNote);

closeStatsModalBtn.addEventListener('click', () => statsModal.style.display = 'none');
statsToggleFavBtn.addEventListener('click', () => toggleFavoriteAction(currentActiveQuestion, statsToggleFavBtn));
statsOpenNoteBtn.addEventListener('click', () => openNoteModalAction(currentActiveQuestion, statsOpenNoteBtn));
statsReportBtn.addEventListener('click', () => openErrorModal(currentActiveQuestion));

clearHistoryBtn.addEventListener('click', clearHistory);
tryAgainBtn.addEventListener('click', () => switchScreen(startScreen));

// Listeners Flashcards
startFlashcardsBtn.addEventListener('click', startFlashcards);
exitFlashcardsBtn.addEventListener('click', () => switchScreen(startScreen));
flashcardElement.addEventListener('click', () => {
    flashcardElement.classList.toggle('is-flipped');
});
fcNextBtn.addEventListener('click', proceedToNextFlashcard);
fcPrevBtn.addEventListener('click', proceedToPrevFlashcard);
fcFinishBtn.addEventListener('click', finishFlashcards);

// Listeners Modal Error
reportErrorBtn.addEventListener('click', () => openErrorModal(testQuestions[currentQuestionIndex]));
fcReportErrorBtn.addEventListener('click', () => openErrorModal(dailyFlashcards[currentFlashcardIndex]));
closeErrorModalBtn.addEventListener('click', () => errorModal.style.display = 'none');
sendErrorEmailBtn.addEventListener('click', sendErrorEmail);

// Funciones
async function autoLoadQuestions() {
    try {
        const sources = [
            { url: './data/preguntas_comunes.json', type: 'comun', name: 'Común' },
            { url: './data/preguntas_especificas.json', type: 'especifico', name: 'Específico' }
        ];
        
        let allLoadedQuestions = [];
        let loadedCount = 0;
        
        for (const source of sources) {
            try {
                const response = await fetch(source.url);
                if (response.ok) {
                    const data = await response.json();
                    const validQuestions = data.filter(q => q.respuestaCorrecta && q.respuestaCorrecta !== "").map((q, idx) => ({
                        ...q,
                        originalIndex: idx + 1,
                        sourceType: source.type,
                        sourceName: source.name
                    }));
                    allLoadedQuestions = allLoadedQuestions.concat(validQuestions);
                    loadedCount++;
                }
            } catch (err) {
                console.error("Error al cargar " + source.url, err);
            }
        }
        
        allQuestions = allLoadedQuestions;
        
        fileCountText.textContent = loadedCount.toString();
        totalAvailableText.textContent = allQuestions.length;
        
        loadedFilesInfo.classList.remove('hidden');
        const loadingZone = document.getElementById('loadingZone');
        if (loadingZone) loadingZone.style.display = 'none';

        if (allQuestions.length === 0) {
            startTestBtn.disabled = true;
            startExamBtn.disabled = true;
            startFlashcardsBtn.disabled = true;
            startTestBtn.textContent = 'Sin preguntas';
        } else {
            startTestBtn.disabled = false;
            startExamBtn.disabled = false;
            startFlashcardsBtn.disabled = false;
            startTestBtn.textContent = 'Comenzar Test';
        }
        updateMaxRangeInfo();
        checkSavedSession();
        updateStreakUI();
    } catch (e) {
        console.error("Error cargando las preguntas:", e);
        const loadingMessage = document.getElementById('loadingMessage');
        if (loadingMessage) loadingMessage.textContent = "Error al cargar las preguntas automáticamente. Por favor, asegúrate de estar en un servidor local o GitHub Pages.";
    }
}

function updateMaxRangeInfo() {
    let repoSelect = document.getElementById('repoSelect');
    let maxRangeInfo = document.getElementById('maxRangeInfo');
    if(repoSelect && maxRangeInfo && allQuestions.length > 0) {
        let count = 0;
        if (repoSelect.value === 'ambos') {
            count = allQuestions.length;
        } else {
            count = allQuestions.filter(q => q.sourceType === repoSelect.value).length;
        }
        maxRangeInfo.textContent = `(Máx: ${count})`;
    }
}
document.getElementById('repoSelect').addEventListener('change', updateMaxRangeInfo);

function startTest(mode) {
    testMode = mode;
    reviewMode = false;
    
    if (examTimerInterval) clearInterval(examTimerInterval);
    if (mode === 'examen') {
        timeRemaining = 3600;
        finalTimeRemainingText = '';
        examTimerContainer.classList.remove('hidden');
        updateTimerDisplay();
        examTimerInterval = setInterval(timerTick, 1000);
    } else {
        examTimerContainer.classList.add('hidden');
    }
    
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let lastSeenMap = JSON.parse(localStorage.getItem('antigravity_last_seen_test') || '{}');
    let currentTestCounter = parseInt(localStorage.getItem('antigravity_test_counter') || '0', 10);
    
    let repoSelect = document.getElementById('repoSelect');
    let rangeStart = document.getElementById('rangeStart');
    let rangeEnd = document.getElementById('rangeEnd');
    
    let filteredQuestions = [...allQuestions];
    
    if (mode === 'favoritas') {
        const favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
        filteredQuestions = filteredQuestions.filter(q => favs.includes(q.pregunta));
        if (filteredQuestions.length === 0) {
            alert("No tienes preguntas marcadas como favoritas todavía.");
            return;
        }
    } else if (mode === 'falladas') {
        filteredQuestions = filteredQuestions.filter(q => (failuresMap[q.pregunta] || 0) > 0);
        if (filteredQuestions.length === 0) {
            alert("¡Enhorabuena! No tienes preguntas falladas registradas.");
            return;
        }
    } else {
        if (repoSelect && repoSelect.value !== 'ambos') {
            filteredQuestions = filteredQuestions.filter(q => q.sourceType === repoSelect.value);
        }
        let minVal = 1;
        let maxVal = filteredQuestions.length;
        if (rangeStart && rangeStart.value) {
            minVal = parseInt(rangeStart.value, 10);
        }
        if (rangeEnd && rangeEnd.value) {
            maxVal = parseInt(rangeEnd.value, 10);
        }
        filteredQuestions = filteredQuestions.slice(minVal - 1, maxVal);
    }
    
    if (filteredQuestions.length === 0) {
        alert("No hay preguntas disponibles con la configuración actual (Revisa el repositorio y el rango).");
        return;
    }
    
    let pool = filteredQuestions.map(q => {
        let failures = failuresMap[q.pregunta] || 0;
        let lastSeenTest = lastSeenMap[q.pregunta];
        
        let testsUnseen = 0;
        if (lastSeenTest === undefined) {
             testsUnseen = currentTestCounter + 5; // Bonus para garantizar que entren las nunca vistas
        } else {
             testsUnseen = currentTestCounter - lastSeenTest;
        }
        
        let weight = 1 + (failures * 3) + testsUnseen;
        return { q, weight };
    });
    
    testQuestions = [];
    
    let maxQuestions = 100;
    if (mode === 'normal') {
        const selectEl = document.getElementById('testLengthSelect');
        if (selectEl) {
            if (selectEl.value === 'all') {
                maxQuestions = pool.length;
            } else {
                maxQuestions = parseInt(selectEl.value, 10);
            }
        }
    }
    
    const limit = Math.min(maxQuestions, pool.length);
    
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
    
    incrementStreak();
    
    switchScreen(testScreen);
    renderQuestion();
}

function renderQuestion() {
    const q = testQuestions[currentQuestionIndex];
    
    currentQuestionNumberText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${testQuestions.length} | (Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'})`;
    
    if (testMode === 'normal' || reviewMode) {
        scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;
    } else {
        const respondidas = userAnswers.filter(a => a !== null).length;
        scoreTrackerText.textContent = `Respondidas: ${respondidas}`;
    }

    const progress = ((currentQuestionIndex + 1) / testQuestions.length) * 100;
    testProgressFill.style.width = `${progress}%`;
    
    questionText.textContent = q.pregunta;
    
    // UI de Favorita y Nota
    const favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.includes(q.pregunta)) {
        toggleFavoriteBtn.style.color = '#facc15';
        toggleFavoriteBtn.innerHTML = '⭐';
    } else {
        toggleFavoriteBtn.style.color = 'var(--text-secondary)';
        toggleFavoriteBtn.innerHTML = '☆';
    }
    
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    if (notes[q.pregunta]) {
        userNoteDisplay.textContent = `📝 Mi Nota:\n${notes[q.pregunta]}`;
        userNoteDisplay.classList.remove('hidden');
        openNoteBtn.style.color = '#6366f1';
    } else {
        userNoteDisplay.classList.add('hidden');
        userNoteDisplay.textContent = '';
        openNoteBtn.style.color = 'var(--text-secondary)';
    }

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

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    examTimerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function timerTick() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
    } else {
        clearInterval(examTimerInterval);
        alert("¡Se acabó el tiempo!");
        if (testMode === 'examen' && !reviewMode) {
             submitExamHandler(true);
        }
    }
}

function submitExamHandler(isForceCall) {
    if (isForceCall !== true) {
        if (isConfirmDialogActive) return;
        isConfirmDialogActive = true;
        const res = confirm("¿Seguro que quieres entregar el examen?");
        setTimeout(() => { isConfirmDialogActive = false; }, 300);
        if (!res) return;
    }
    
    if (examTimerInterval) {
        clearInterval(examTimerInterval);
        if (timeRemaining > 0) {
            const min = Math.floor(timeRemaining / 60);
            const sec = timeRemaining % 60;
            finalTimeRemainingText = `Te han sobrado ${min} minutos y ${sec} segundos.`;
        } else {
            finalTimeRemainingText = "Agotaste todo el tiempo disponible.";
        }
    }
    examTimerContainer.classList.add('hidden');
    
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

    if (testMode === 'examen') {
        remainingTimeFeedback.textContent = finalTimeRemainingText;
        remainingTimeFeedback.classList.remove('hidden');
    } else {
        remainingTimeFeedback.classList.add('hidden');
    }

    switchScreen(resultScreen);
}

function switchScreen(screenElement) {
    [startScreen, testScreen, resultScreen, historyScreen, infoScreen, flashcardScreen, searchScreen].forEach(el => {
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
    let lastSeenMap = JSON.parse(localStorage.getItem('antigravity_last_seen_test') || '{}');
    let statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
    let currentTestCounter = parseInt(localStorage.getItem('antigravity_test_counter') || '0', 10) + 1;
    
    localStorage.setItem('antigravity_test_counter', currentTestCounter.toString());
    
    let respondidas = 0;
    
    for (let i = 0; i < testQuestions.length; i++) {
        const q = testQuestions[i];
        const ua = userAnswers[i];
        
        if (ua !== null) {
            respondidas++;
            const hash = q.pregunta;
            
            lastSeenMap[hash] = currentTestCounter;
            if (!statsMap[hash]) {
                statsMap[hash] = { seen: 0, correct: 0, wrong: 0 };
            }
            statsMap[hash].seen++;
            
            if (ua === q.respuestaCorrecta) {
                statsMap[hash].correct++;
                if (failuresMap[hash]) {
                    failuresMap[hash] = Math.max(0, failuresMap[hash] - 1); // Disminuye el peso si se acierta
                }
            } else {
                statsMap[hash].wrong++;
                failuresMap[hash] = (failuresMap[hash] || 0) + 1; // Aumenta el peso si se falla
            }
        }
    }
    
    localStorage.setItem('antigravity_failures', JSON.stringify(failuresMap));
    localStorage.setItem('antigravity_last_seen_test', JSON.stringify(lastSeenMap));
    localStorage.setItem('appOpeQuestionStats', JSON.stringify(statsMap));
    
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
        localStorage.removeItem('antigravity_test_counter');
        localStorage.removeItem('antigravity_last_seen_test');
        localStorage.removeItem('antigravity_daily_flashcards');
        renderHistory();
    }
}

// --- LÓGICA DE FLASHCARDS ---

function getDailyFlashcards() {
    const todayStr = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem('antigravity_daily_flashcards') || '{}');
    
    // Si ya existen para hoy y son válidas
    if (stored.date === todayStr && stored.questions && stored.questions.length > 0) {
        return stored.questions;
    }

    // Generar nuevas flashcards
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');

    let repoSelect = document.getElementById('repoSelect');
    let rangeStart = document.getElementById('rangeStart');
    let rangeEnd = document.getElementById('rangeEnd');
    
    let filteredQuestions = [...allQuestions];
    
    if (repoSelect && repoSelect.value !== 'ambos') {
        filteredQuestions = filteredQuestions.filter(q => q.sourceType === repoSelect.value);
    }
    let minVal = 1;
    let maxVal = filteredQuestions.length;
    if (rangeStart && rangeStart.value) {
        minVal = parseInt(rangeStart.value, 10);
    }
    if (rangeEnd && rangeEnd.value) {
        maxVal = parseInt(rangeEnd.value, 10);
    }
    filteredQuestions = filteredQuestions.slice(minVal - 1, maxVal);
    
    if (filteredQuestions.length === 0) {
        alert("No hay preguntas disponibles para Flashcards con el filtro actual.");
        return [];
    }

    let pool = filteredQuestions.map(q => {
        let failures = failuresMap[q.pregunta] || 0;
        let weight = 1 + (failures * 3);
        return { q, weight };
    });
    
    let fcs = [];
    const limit = Math.min(10, pool.length);
    for (let i = 0; i < limit; i++) {
        let totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
        let randomNum = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        for (let j = 0; j < pool.length; j++) {
            cumulativeWeight += pool[j].weight;
            if (randomNum <= cumulativeWeight) {
                fcs.push(pool[j].q);
                pool.splice(j, 1);
                break;
            }
        }
    }
    
    localStorage.setItem('antigravity_daily_flashcards', JSON.stringify({
        date: todayStr,
        questions: fcs
    }));
    
    return fcs;
}

function startFlashcards() {
    dailyFlashcards = getDailyFlashcards();
    if(dailyFlashcards.length === 0) return;
    
    currentFlashcardIndex = 0;
    switchScreen(flashcardScreen);
    renderFlashcard();
}

function renderFlashcard() {
    const rawQ = dailyFlashcards[currentFlashcardIndex];
    const q = allQuestions.find(x => x.pregunta === rawQ.pregunta) || rawQ;
    flashcardNumberText.textContent = `Flashcard ${currentFlashcardIndex + 1}/${dailyFlashcards.length} | (Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'})`;
    
    const progress = ((currentFlashcardIndex + 1) / dailyFlashcards.length) * 100;
    flashcardProgressFill.style.width = `${progress}%`;
    
    // Reiniciar estado volteado
    flashcardElement.classList.remove('is-flipped');
    
    fcQuestionText.textContent = q.pregunta;
    
    const correctLetter = q.respuestaCorrecta;
    const correctText = q.opciones[correctLetter];
    fcAnswerText.innerHTML = `<span style="display:block; margin-bottom: 0.5rem;">Opción ${correctLetter}</span><span style="font-weight: 300;">${correctText}</span>`;
    
    manageFlashcardsButtons();
}

function manageFlashcardsButtons() {
    fcPrevBtn.classList.add('hidden');
    fcNextBtn.classList.add('hidden');
    fcFinishBtn.classList.add('hidden');
    
    if (currentFlashcardIndex > 0) {
        fcPrevBtn.classList.remove('hidden');
    }
    
    if (currentFlashcardIndex < dailyFlashcards.length - 1) {
        fcNextBtn.classList.remove('hidden');
    } else {
        fcFinishBtn.classList.remove('hidden');
    }
}

function proceedToNextFlashcard() {
    if (currentFlashcardIndex < dailyFlashcards.length - 1) {
        currentFlashcardIndex++;
        renderFlashcard();
    }
}

function proceedToPrevFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        renderFlashcard();
    }
}

function finishFlashcards() {
    switchScreen(startScreen);
}

// --- LOGICA REPORTE DE ERRORES ---
function openErrorModal(questionObj) {
    if(!questionObj) return;
    currentErrorQuestion = questionObj;
    errorQuestionInfo.textContent = `Nº ${questionObj.originalIndex || '?'} - ${questionObj.sourceName || 'General'}`;
    const correcta = questionObj.respuestaCorrecta;
    errorCurrentAnswer.textContent = `Opción ${correcta}: ${questionObj.opciones[correcta]}`;
    errorUserSuggestion.value = 'A';
    errorUserComment.value = '';
    errorModal.style.display = 'flex';
}

function sendErrorEmail() {
    if(!currentErrorQuestion) return;
    const subject = encodeURIComponent("Error en Pregunta Simulador OPE");
    const suggestion = errorUserSuggestion.value;
    const comment = errorUserComment.value;
    
    let bodyText = `Hola, he encontrado un posible error en una pregunta del simulador.\n\n`;
    bodyText += `[ PREGUNTA ]\nOrigen: ${errorQuestionInfo.textContent}\nTexto: ${currentErrorQuestion.pregunta}\n\n`;
    bodyText += `[ RESPUESTA ACTUAL ]\nMarcada en el temario: ${errorCurrentAnswer.textContent}\n\n`;
    bodyText += `[ MI SUGERENCIA ]\nConsidero que la correcta es: ${suggestion}\n\n`;
    if(comment.trim() !== '') {
        bodyText += `[ COMENTARIO ]\n${comment}\n`;
    }
    
    window.location.href = `mailto:imanoleka@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    errorModal.style.display = 'none';
}

// --- LOGICA FAVORITAS Y NOTAS ---
function toggleFavoriteAction(q, btnElement) {
    if (!q) return;
    let favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    
    if (favs.includes(q.pregunta)) {
        favs = favs.filter(f => f !== q.pregunta);
        if (btnElement) {
            btnElement.style.color = 'var(--text-secondary)';
            btnElement.innerHTML = btnElement.id === 'statsToggleFavBtn' ? '☆ Favorita' : '☆';
        }
    } else {
        favs.push(q.pregunta);
        if (btnElement) {
            btnElement.style.color = '#facc15';
            btnElement.innerHTML = btnElement.id === 'statsToggleFavBtn' ? '⭐ Favorita' : '⭐';
        }
    }
    localStorage.setItem('appOpeFavorites', JSON.stringify(favs));
    
    // Si estamos en la pantalla de test, sincronizamos visualmente si es la misma pregunta
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex]?.pregunta === q.pregunta) {
        if (favs.includes(q.pregunta)) {
            toggleFavoriteBtn.style.color = '#facc15';
            toggleFavoriteBtn.innerHTML = '⭐';
        } else {
            toggleFavoriteBtn.style.color = 'var(--text-secondary)';
            toggleFavoriteBtn.innerHTML = '☆';
        }
    }
}

function toggleFavorite() {
    if (!testQuestions || testQuestions.length === 0) return;
    toggleFavoriteAction(testQuestions[currentQuestionIndex], toggleFavoriteBtn);
}

function openNoteModalAction(q) {
    if (!q) return;
    currentActiveQuestion = q;
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    
    if (notes[q.pregunta]) {
        noteTextarea.value = notes[q.pregunta];
    } else {
        noteTextarea.value = '';
    }
    
    noteModal.style.display = 'flex';
}

function openNoteModal() {
    if (!testQuestions || testQuestions.length === 0) return;
    openNoteModalAction(testQuestions[currentQuestionIndex]);
}

function saveNote() {
    let q = currentActiveQuestion;
    if (!q && testQuestions && testQuestions.length > 0) {
        q = testQuestions[currentQuestionIndex];
    }
    if (!q) return;
    
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    const val = noteTextarea.value.trim();
    if (val) {
        notes[q.pregunta] = val;
    } else {
        delete notes[q.pregunta];
    }
    
    localStorage.setItem('appOpeNotes', JSON.stringify(notes));
    noteModal.style.display = 'none';
    
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex]?.pregunta === q.pregunta) {
        renderQuestion();
    }
    if (statsModal.style.display === 'flex') {
        openStatsModal(q);
    }
}

function deleteNote() {
    let q = currentActiveQuestion;
    if (!q && testQuestions && testQuestions.length > 0) {
        q = testQuestions[currentQuestionIndex];
    }
    if (!q) return;
    
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    delete notes[q.pregunta];
    localStorage.setItem('appOpeNotes', JSON.stringify(notes));
    noteModal.style.display = 'none';
    
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex]?.pregunta === q.pregunta) {
        renderQuestion();
    }
    if (statsModal.style.display === 'flex') {
        openStatsModal(q);
    }
}

// --- LOGICA BUSCADOR / GLOSARIO ---
function openSearchScreen() {
    searchInput.value = '';
    searchResultCount.textContent = '0';
    searchResultsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">Escribe algo arriba para buscar entre todas las preguntas.</p>';
    switchScreen(searchScreen);
}

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        openSearchScreen();
        return;
    }
    
    const results = allQuestions.filter(q => {
        return q.pregunta.toLowerCase().includes(query) || 
               Object.values(q.opciones).some(opt => opt.toLowerCase().includes(query));
    });
    
    renderSearchResults(results);
}

function performSearchById() {
    const numStr = searchIdInput.value.trim();
    if (!numStr) {
        return;
    }
    const num = parseInt(numStr, 10);
    const repo = searchRepoSelect.value;
    
    const results = allQuestions.filter(q => {
        let matchRepo = (repo === 'ambos') ? true : (q.sourceType === repo);
        return matchRepo && (q.id == num || q.originalIndex == num);
    });
    
    renderSearchResults(results);
}

function renderSearchResults(results) {
    searchResultCount.textContent = results.length;
    searchResultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">No se encontraron resultados.</p>';
        return;
    }
    
    results.forEach(q => {
        const correctLetter = q.respuestaCorrecta;
        const correctText = q.opciones[correctLetter];
        
        const div = document.createElement('div');
        div.style.background = 'rgba(255,255,255,0.05)';
        div.style.padding = '1rem';
        div.style.borderRadius = '0.5rem';
        div.style.marginBottom = '0.5rem';
        div.style.cursor = 'pointer';
        div.style.transition = 'background 0.2s';
        
        div.addEventListener('mouseover', () => div.style.background = 'rgba(255,255,255,0.1)');
        div.addEventListener('mouseout', () => div.style.background = 'rgba(255,255,255,0.05)');
        div.addEventListener('click', () => openStatsModal(q));
        
        let html = `<p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.3rem;">Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'}</p>`;
        html += `<p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-primary);">${q.pregunta}</p>`;
        html += `<div style="background: rgba(74, 222, 128, 0.1); border-left: 3px solid #4ade80; padding: 0.5rem; font-size: 0.9rem; color: #4ade80;">`;
        html += `<strong>Correcta (${correctLetter}):</strong> ${correctText}</div>`;
        
        div.innerHTML = html;
        searchResultsContainer.appendChild(div);
    });
}

function openStatsModal(q) {
    currentActiveQuestion = q;
    statsQuestionTitle.textContent = `Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'}`;
    statsQuestionText.textContent = q.pregunta;
    
    const correctLetter = q.respuestaCorrecta;
    statsCorrectAnswer.textContent = `Opción ${correctLetter}: ${q.opciones[correctLetter]}`;
    
    let statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
    const hash = q.pregunta;
    const stats = statsMap[hash] || { seen: 0, correct: 0, wrong: 0 };
    
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let historicalWrong = failuresMap[hash] || 0;
    
    statsSeen.textContent = Math.max(stats.seen, historicalWrong);
    statsCorrect.textContent = stats.correct;
    statsWrong.textContent = Math.max(stats.wrong, historicalWrong);
    
    let favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.includes(q.pregunta)) {
        statsToggleFavBtn.style.color = '#facc15';
        statsToggleFavBtn.innerHTML = '⭐ Favorita';
    } else {
        statsToggleFavBtn.style.color = 'var(--text-secondary)';
        statsToggleFavBtn.innerHTML = '☆ Favorita';
    }
    
    let notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    if (notes[q.pregunta]) {
        statsOpenNoteBtn.style.color = '#6366f1';
        statsOpenNoteBtn.innerHTML = '📝 Ver Mis Notas';
    } else {
        statsOpenNoteBtn.style.color = 'var(--text-secondary)';
        statsOpenNoteBtn.innerHTML = '📝 Añadir Nota';
    }
    
    statsModal.style.display = 'flex';
}

// --- LOGICA PAUSA / REANUDAR TEST ---
function pauseTest() {
    if (reviewMode) return;
    
    const session = {
        testQuestions,
        currentQuestionIndex,
        correctAnswersCount,
        userAnswers,
        testMode,
        timeRemaining,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('appOpeSavedSession', JSON.stringify(session));
    if (examTimerInterval) clearInterval(examTimerInterval);
    
    alert("Test pausado y guardado. Puedes reanudarlo más tarde.");
    switchScreen(startScreen);
    checkSavedSession();
}

function checkSavedSession() {
    const session = JSON.parse(localStorage.getItem('appOpeSavedSession'));
    if (session) {
        resumeTestBtn.classList.remove('hidden');
    } else {
        resumeTestBtn.classList.add('hidden');
    }
}

function resumeSavedTest() {
    const session = JSON.parse(localStorage.getItem('appOpeSavedSession'));
    if (!session) return;
    
    testQuestions = session.testQuestions;
    currentQuestionIndex = session.currentQuestionIndex;
    correctAnswersCount = session.correctAnswersCount;
    userAnswers = session.userAnswers;
    testMode = session.testMode;
    timeRemaining = session.timeRemaining;
    reviewMode = false;
    isResultSaved = false;
    
    if (examTimerInterval) clearInterval(examTimerInterval);
    if (testMode === 'examen') {
        finalTimeRemainingText = '';
        examTimerContainer.classList.remove('hidden');
        updateTimerDisplay();
        examTimerInterval = setInterval(timerTick, 1000);
    } else {
        examTimerContainer.classList.add('hidden');
    }
    
    localStorage.removeItem('appOpeSavedSession');
    checkSavedSession();
    
    switchScreen(testScreen);
    renderQuestion();
}

// --- LOGICA RACHAS (STREAKS) ---
function incrementStreak() {
    const today = new Date().toDateString();
    let streakData = JSON.parse(localStorage.getItem('appOpeStudyStreak') || '{"streak": 0, "lastDate": ""}');
    
    if (streakData.lastDate === today) {
        // Ya ha estudiado hoy
        return;
    }
    
    if (streakData.lastDate) {
        const last = new Date(streakData.lastDate);
        const curr = new Date(today);
        const diffTime = Math.abs(curr - last);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays === 1) {
            streakData.streak += 1;
        } else {
            streakData.streak = 1; // Perdió la racha
        }
    } else {
        streakData.streak = 1;
    }
    
    streakData.lastDate = today;
    localStorage.setItem('appOpeStudyStreak', JSON.stringify(streakData));
    updateStreakUI();
}

function updateStreakUI() {
    const streakData = JSON.parse(localStorage.getItem('appOpeStudyStreak') || '{"streak": 0, "lastDate": ""}');
    
    if (streakData.lastDate) {
        const today = new Date().toDateString();
        const last = new Date(streakData.lastDate);
        const curr = new Date(today);
        const diffTime = Math.abs(curr - last);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays > 1) {
            // Perdió la racha ayer o antes
            streakData.streak = 0;
            localStorage.setItem('appOpeStudyStreak', JSON.stringify(streakData));
        }
    }
    
    if (streakData.streak > 0) {
        streakContainer.classList.remove('hidden');
        streakCountText.textContent = streakData.streak;
    } else {
        streakContainer.classList.add('hidden');
    }
}

