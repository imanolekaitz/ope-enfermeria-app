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
const searchFavoritesBtn = document.getElementById('searchFavoritesBtn');
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

let flaggedQuestions = [];
let repoCompareChartInstance = null;
let lastTestResults = null;

function getQuestionKey(q) {
    if (!q || !q.sourceType || !q.originalIndex) return q?.pregunta || '';
    return `${q.sourceType}_${q.originalIndex}`;
}

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
if (searchFavoritesBtn) searchFavoritesBtn.addEventListener('click', performSearchFavorites);
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

document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
document.getElementById('navToggleBtn').addEventListener('click', toggleNavigator);
document.getElementById('flagQuestionBtn').addEventListener('click', toggleFlag);
document.getElementById('reviewAnswersBtn').addEventListener('click', toggleResultReview);
document.getElementById('retryFailedBtn').addEventListener('click', retryFailedQuestions);

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
        migrateStorageKeys();
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
        filteredQuestions = filteredQuestions.filter(q => favs.includes(getQuestionKey(q)));
        if (filteredQuestions.length === 0) {
            alert("No tienes preguntas marcadas como favoritas todavía.");
            return;
        }
    } else if (mode === 'falladas') {
        filteredQuestions = filteredQuestions.filter(q => (failuresMap[getQuestionKey(q)] || 0) > 0);
        if (filteredQuestions.length === 0) {
            alert("¡Enhorabuena! No tienes preguntas falladas registradas.");
            return;
        }
    } else if (mode === 'examen') {
        filteredQuestions = [...allQuestions];
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
        let failures = failuresMap[getQuestionKey(q)] || 0;
        let lastSeenTest = lastSeenMap[getQuestionKey(q)];
        
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
    flaggedQuestions = [];
    
    // Show navigator for exam mode
    const navWrapper = document.getElementById('questionNavWrapper');
    const navGrid = document.getElementById('questionNavGrid');
    if (testMode === 'examen') {
        navWrapper.classList.remove('hidden');
        navGrid.classList.remove('hidden');
    } else {
        navWrapper.classList.remove('hidden');
        navGrid.classList.add('hidden');
    }
    
    incrementStreak();
    
    switchScreen(testScreen);
    renderQuestion();
}

function renderQuestion() {
    const q = testQuestions[currentQuestionIndex];
    
    currentQuestionNumberText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${testQuestions.length} | (Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'})`;
    
    if (testMode !== 'examen' || reviewMode) {
        scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;
    } else {
        const respondidas = userAnswers.filter(a => a !== null).length;
        scoreTrackerText.textContent = `Respondidas: ${respondidas}`;
    }

    const progress = ((currentQuestionIndex + 1) / testQuestions.length) * 100;
    testProgressFill.style.width = `${progress}%`;
    
    questionText.textContent = q.pregunta;
    
    // UI de Favorita y Nota
    const qKey = getQuestionKey(q);
    const favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.includes(qKey)) {
        toggleFavoriteBtn.style.color = '#facc15';
        toggleFavoriteBtn.innerHTML = '⭐';
    } else {
        toggleFavoriteBtn.style.color = 'var(--text-secondary)';
        toggleFavoriteBtn.innerHTML = '☆';
    }
    
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    if (notes[qKey]) {
        userNoteDisplay.textContent = `📝 Mi Nota:\n${notes[qKey]}`;
        userNoteDisplay.classList.remove('hidden');
        openNoteBtn.style.color = '#6366f1';
    } else {
        userNoteDisplay.classList.add('hidden');
        userNoteDisplay.textContent = '';
        openNoteBtn.style.color = 'var(--text-secondary)';
    }

    // Flag button state
    const flagBtn = document.getElementById('flagQuestionBtn');
    if (flaggedQuestions.includes(currentQuestionIndex)) {
        flagBtn.classList.add('active');
    } else {
        flagBtn.classList.remove('active');
    }

    renderQuestionNavigator();

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
        } else if (testMode !== 'examen') {
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

    if (testMode !== 'examen') {
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
            selectedBtn.classList.add('shake');
            setTimeout(() => selectedBtn.classList.remove('shake'), 400);
        }
        scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;

        // Guardar estadísticas de esta pregunta inmediatamente
        let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
        let lastSeenMap = JSON.parse(localStorage.getItem('antigravity_last_seen_test') || '{}');
        let statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
        let currentTestCounter = parseInt(localStorage.getItem('antigravity_test_counter') || '0', 10);
        
        const q = testQuestions[currentQuestionIndex];
        const hash = getQuestionKey(q);
        
        lastSeenMap[hash] = currentTestCounter + 1;
        if (!statsMap[hash]) {
            statsMap[hash] = { seen: 0, correct: 0, wrong: 0 };
        }
        statsMap[hash].seen++;
        
        if (selectedLetter === correctLetter) {
            statsMap[hash].correct++;
            if (failuresMap[hash]) {
                failuresMap[hash] = Math.max(0, failuresMap[hash] - 1);
            }
        } else {
            statsMap[hash].wrong++;
            failuresMap[hash] = (failuresMap[hash] || 0) + 1;
        }
        
        localStorage.setItem('antigravity_failures', JSON.stringify(failuresMap));
        localStorage.setItem('antigravity_last_seen_test', JSON.stringify(lastSeenMap));
        localStorage.setItem('appOpeQuestionStats', JSON.stringify(statsMap));

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
        const panel = document.querySelector('.question-panel');
        panel.classList.add('slide-out-left');
        setTimeout(() => {
            currentQuestionIndex++;
            panel.classList.remove('slide-out-left');
            panel.classList.add('slide-in-right');
            renderQuestion();
            setTimeout(() => panel.classList.remove('slide-in-right'), 200);
        }, 150);
    }
}

function proceedToPrev() {
    if (currentQuestionIndex > 0) {
        const panel = document.querySelector('.question-panel');
        panel.classList.add('slide-out-right');
        setTimeout(() => {
            currentQuestionIndex--;
            panel.classList.remove('slide-out-right');
            panel.classList.add('slide-in-left');
            renderQuestion();
            setTimeout(() => panel.classList.remove('slide-in-left'), 200);
        }, 150);
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
    
    // Calculate penalty breakdown
    let correct = 0, wrong = 0, blank = 0;
    for (let i = 0; i < testQuestions.length; i++) {
        if (userAnswers[i] === null) {
            blank++;
        } else if (userAnswers[i] === testQuestions[i].respuestaCorrecta) {
            correct++;
        } else {
            wrong++;
        }
    }
    
    const netScore = correct - (wrong / 3);
    const total = testQuestions.length;
    const percentage = (correct / total) * 100;
    const netPercentage = (netScore / total) * 100;
    
    // Store for review
    lastTestResults = { testQuestions: [...testQuestions], userAnswers: [...userAnswers], correct, wrong, blank, netScore };
    
    // Animate score counter
    const scoreEl = document.getElementById('finalScoreText');
    scoreEl.textContent = '0';
    document.querySelector('.score-max').textContent = `/ ${total}`;
    animateCountUp(scoreEl, correct);
    
    // Show penalty breakdown
    const penaltyDiv = document.getElementById('penaltyBreakdown');
    penaltyDiv.classList.remove('hidden');
    document.getElementById('penaltyCorrect').textContent = `${correct} (+${correct.toFixed(2)})`;
    document.getElementById('penaltyWrong').textContent = `${wrong} (-${(wrong / 3).toFixed(2)})`;
    document.getElementById('penaltyBlank').textContent = `${blank} (0.00)`;
    document.getElementById('penaltyNet').textContent = `${netScore.toFixed(2)} / ${total} (${netPercentage.toFixed(1)}%)`;
    
    // Feedback
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
    
    // Show retry failed button if there are wrong answers
    const retryBtn = document.getElementById('retryFailedBtn');
    if (wrong > 0) {
        retryBtn.classList.remove('hidden');
    } else {
        retryBtn.classList.add('hidden');
    }
    
    // Hide review section on fresh load
    document.getElementById('resultReviewSection').classList.add('hidden');
    
    switchScreen(resultScreen);
    
    // Confetti for >90%
    if (percentage >= 90) {
        setTimeout(launchConfetti, 400);
    }
}

function switchScreen(screenElement) {
    [startScreen, testScreen, resultScreen, historyScreen, infoScreen, flashcardScreen, searchScreen].forEach(el => {
        if(el) el.classList.remove('active');
    });
    screenElement.classList.add('active');
}

function exitTest() {
    if (examTimerInterval) {
        clearInterval(examTimerInterval);
        examTimerInterval = null;
    }
    if (testMode === 'examen') {
        if (isConfirmDialogActive) return;
        isConfirmDialogActive = true;
        const res = confirm("¿Estás seguro de que deseas salir? Perderás el progreso de este examen.");
        setTimeout(() => { isConfirmDialogActive = false; }, 300);
        if (res) {
            switchScreen(startScreen);
        } else {
            // Si cancela la salida, hay que reanudar el timer si era un examen
            if (testMode === 'examen' && timeRemaining > 0 && !reviewMode) {
                examTimerInterval = setInterval(timerTick, 1000);
            }
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
            
            if (testMode === 'examen') {
                const hash = getQuestionKey(q);
                
                lastSeenMap[hash] = currentTestCounter;
                if (!statsMap[hash]) {
                    statsMap[hash] = { seen: 0, correct: 0, wrong: 0 };
                }
                statsMap[hash].seen++;
                
                if (ua === q.respuestaCorrecta) {
                    statsMap[hash].correct++;
                    if (failuresMap[hash]) {
                        failuresMap[hash] = Math.max(0, failuresMap[hash] - 1);
                    }
                } else {
                    statsMap[hash].wrong++;
                    failuresMap[hash] = (failuresMap[hash] || 0) + 1;
                }
            }
        }
    }
    
    if (testMode === 'examen') {
        localStorage.setItem('antigravity_failures', JSON.stringify(failuresMap));
        localStorage.setItem('antigravity_last_seen_test', JSON.stringify(lastSeenMap));
        localStorage.setItem('appOpeQuestionStats', JSON.stringify(statsMap));
    }
    
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
    
    let totalE = 0, totalT = 0, totalQuestions = 0, totalCorrects = 0;
    const labels = [], dataPoints = [];
    
    historyData.forEach((rec, index) => {
        if (rec.mode === 'examen') totalE++; else totalT++;
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

    // Trend indicator
    const trendEl = document.getElementById('histTrend');
    if (dataPoints.length >= 5) {
        const recent = dataPoints.slice(-5).reduce((s, v) => s + parseFloat(v), 0) / 5;
        const prev = dataPoints.slice(-10, -5);
        if (prev.length > 0) {
            const prevAvg = prev.reduce((s, v) => s + parseFloat(v), 0) / prev.length;
            const diff = recent - prevAvg;
            if (diff > 2) {
                trendEl.innerHTML = `<span class="trend-indicator up">\u2191 +${diff.toFixed(1)}%</span>`;
            } else if (diff < -2) {
                trendEl.innerHTML = `<span class="trend-indicator down">\u2193 ${diff.toFixed(1)}%</span>`;
            } else {
                trendEl.innerHTML = `<span class="trend-indicator stable">\u2194 Estable</span>`;
            }
        } else {
            trendEl.innerHTML = `<span class="trend-indicator up">\u2191 ${recent.toFixed(1)}%</span>`;
        }
    } else {
        trendEl.textContent = '\u2014';
    }

    // Coverage
    const statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
    const seenCount = Object.keys(statsMap).length;
    const totalAvail = allQuestions.length;
    const coveragePct = totalAvail > 0 ? ((seenCount / totalAvail) * 100).toFixed(1) : 0;
    document.getElementById('coverageSeen').textContent = seenCount;
    document.getElementById('coverageTotal').textContent = `/ ${totalAvail} preguntas`;
    document.getElementById('coverageFill').style.width = `${coveragePct}%`;
    document.getElementById('coveragePct').textContent = `${coveragePct}%`;

    // Repo comparison chart
    let comunCorrect = 0, comunTotal = 0, especCorrect = 0, especTotal = 0;
    for (const q of allQuestions) {
        const s = statsMap[getQuestionKey(q)];
        if (s) {
            if (q.sourceType === 'comun') { comunCorrect += s.correct; comunTotal += s.seen; }
            else { especCorrect += s.correct; especTotal += s.seen; }
        }
    }
    const comunPct = comunTotal > 0 ? (comunCorrect / comunTotal * 100).toFixed(1) : 0;
    const especPct = especTotal > 0 ? (especCorrect / especTotal * 100).toFixed(1) : 0;

    const repoCtx = document.getElementById('repoCompareChart').getContext('2d');
    if (repoCompareChartInstance) repoCompareChartInstance.destroy();
    repoCompareChartInstance = new Chart(repoCtx, {
        type: 'bar',
        data: {
            labels: ['Com\u00fan', 'Espec\u00edfico'],
            datasets: [{
                label: '% Aciertos',
                data: [comunPct, especPct],
                backgroundColor: ['rgba(99, 102, 241, 0.6)', 'rgba(168, 85, 247, 0.6)'],
                borderColor: ['#6366f1', '#a855f7'],
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } }, plugins: { legend: { display: false } } }
    });

    // Main history chart
    const ctx = document.getElementById('historyChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
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
        options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
    });

    // Calcular la pregunta más fallada
    const failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let maxFailures = 0;
    let worstQuestionKey = null;
    
    for (const [qKey, failures] of Object.entries(failuresMap)) {
        if (failures > maxFailures) {
            maxFailures = failures;
            worstQuestionKey = qKey;
        }
    }
    
    const worstQuestionContainer = document.getElementById('worstQuestionContainer');
    const worstQuestionTitle = document.getElementById('worstQuestionTitle');
    const worstQuestionAnswer = document.getElementById('worstQuestionAnswer');
    
    if (worstQuestionKey && maxFailures > 0) {
        worstQuestionContainer.style.display = 'block';
        
        let found = false;
        for (const qObj of allQuestions) {
            if (getQuestionKey(qObj) === worstQuestionKey) {
                worstQuestionTitle.textContent = qObj.pregunta + ` (${maxFailures} fallos)`;
                const correctLetter = qObj.respuestaCorrecta;
                const correctText = qObj.opciones[correctLetter];
                worstQuestionAnswer.textContent = `${correctLetter}) ${correctText}`;
                found = true;
                break;
            }
        }
        
        if (!found) {
            worstQuestionTitle.textContent = `Pregunta ${worstQuestionKey} (${maxFailures} fallos)`;
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
        let failures = failuresMap[getQuestionKey(q)] || 0;
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
    const qKey = getQuestionKey(q);
    let favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    
    if (favs.includes(qKey)) {
        favs = favs.filter(f => f !== qKey);
        if (btnElement) {
            btnElement.style.color = 'var(--text-secondary)';
            btnElement.innerHTML = btnElement.id === 'statsToggleFavBtn' ? '☆ Favorita' : '☆';
        }
    } else {
        favs.push(qKey);
        if (btnElement) {
            btnElement.style.color = '#facc15';
            btnElement.innerHTML = btnElement.id === 'statsToggleFavBtn' ? '⭐ Favorita' : '⭐';
        }
    }
    localStorage.setItem('appOpeFavorites', JSON.stringify(favs));
    
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex] && getQuestionKey(testQuestions[currentQuestionIndex]) === qKey) {
        if (favs.includes(qKey)) {
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
    const qKey = getQuestionKey(q);
    
    if (notes[qKey]) {
        noteTextarea.value = notes[qKey];
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
    const qKey = getQuestionKey(q);
    if (val) {
        notes[qKey] = val;
    } else {
        delete notes[qKey];
    }
    
    localStorage.setItem('appOpeNotes', JSON.stringify(notes));
    noteModal.style.display = 'none';
    
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex] && getQuestionKey(testQuestions[currentQuestionIndex]) === qKey) {
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
    const qKey = getQuestionKey(q);
    delete notes[qKey];
    localStorage.setItem('appOpeNotes', JSON.stringify(notes));
    noteModal.style.display = 'none';
    
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex] && getQuestionKey(testQuestions[currentQuestionIndex]) === qKey) {
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
    const rawQuery = searchInput.value.trim();
    if (!rawQuery) {
        openSearchScreen();
        return;
    }
    
    const normalizeStr = (str) => {
        if (!str) return "";
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const query = normalizeStr(rawQuery);
    
    const results = allQuestions.filter(q => {
        if (normalizeStr(q.pregunta).includes(query)) return true;
        return Object.values(q.opciones).some(opt => normalizeStr(opt).includes(query));
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

function performSearchFavorites() {
    const favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.length === 0) {
        searchResultCount.textContent = '0';
        searchResultsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">No tienes preguntas favoritas guardadas.</p>';
        return;
    }
    
    const results = allQuestions.filter(q => favs.includes(getQuestionKey(q)));
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
    const qKey = getQuestionKey(q);
    statsQuestionTitle.textContent = `Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'}`;
    statsQuestionText.textContent = q.pregunta;
    
    const correctLetter = q.respuestaCorrecta;
    statsCorrectAnswer.textContent = `Opción ${correctLetter}: ${q.opciones[correctLetter]}`;
    
    let statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
    const stats = statsMap[qKey] || { seen: 0, correct: 0, wrong: 0 };
    
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let historicalWrong = failuresMap[qKey] || 0;
    
    statsSeen.textContent = Math.max(stats.seen, historicalWrong);
    statsCorrect.textContent = stats.correct;
    statsWrong.textContent = Math.max(stats.wrong, historicalWrong);
    
    let favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.includes(qKey)) {
        statsToggleFavBtn.style.color = '#facc15';
        statsToggleFavBtn.innerHTML = '⭐ Favorita';
    } else {
        statsToggleFavBtn.style.color = 'var(--text-secondary)';
        statsToggleFavBtn.innerHTML = '☆ Favorita';
    }
    
    let notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    if (notes[qKey]) {
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
    if (examTimerInterval) {
        clearInterval(examTimerInterval);
        examTimerInterval = null;
    }
    
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
    
    if (examTimerInterval) {
        clearInterval(examTimerInterval);
        examTimerInterval = null;
    }
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

// --- MIGRACIÓN DE CLAVES (#14) ---
function migrateStorageKeys() {
    if (localStorage.getItem('appOpe_migrated_v2')) return;
    if (allQuestions.length === 0) return;
    
    const textToKey = {};
    allQuestions.forEach(q => { textToKey[q.pregunta] = getQuestionKey(q); });
    
    function migrateObject(storageKey) {
        const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
        const newData = {};
        let changed = false;
        for (const [key, val] of Object.entries(data)) {
            if (textToKey[key]) { newData[textToKey[key]] = val; changed = true; }
            else { newData[key] = val; }
        }
        if (changed) localStorage.setItem(storageKey, JSON.stringify(newData));
    }
    
    // Migrate favorites (array)
    let favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.length > 0 && favs[0] && favs[0].length > 30) {
        favs = favs.map(text => textToKey[text] || text);
        localStorage.setItem('appOpeFavorites', JSON.stringify(favs));
    }
    
    migrateObject('appOpeNotes');
    migrateObject('antigravity_failures');
    migrateObject('antigravity_last_seen_test');
    migrateObject('appOpeQuestionStats');
    
    localStorage.setItem('appOpe_migrated_v2', 'true');
    console.log('Storage keys migrated to v2 format.');
}

// --- THEME TOGGLE (#3) ---
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    btn.textContent = isLight ? '\u2600\ufe0f' : '\ud83c\udf19';
    localStorage.setItem('appOpeTheme', isLight ? 'light' : 'dark');
}

function applyTheme() {
    const saved = localStorage.getItem('appOpeTheme');
    const btn = document.getElementById('themeToggleBtn');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        btn.textContent = '\u2600\ufe0f';
    }
}
applyTheme();

// --- ANIMACIONES (#4) ---
function animateCountUp(element, target) {
    let current = 0;
    const duration = 800;
    const step = Math.max(1, Math.floor(target / (duration / 30)));
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
            element.classList.add('score-pulse');
            setTimeout(() => element.classList.remove('score-pulse'), 600);
        }
        element.textContent = current;
    }, 30);
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#6366f1', '#818cf8', '#c084fc', '#a855f7', '#22c55e', '#facc15', '#f87171', '#38bdf8'];
    
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -10 - Math.random() * canvas.height * 0.5,
            w: 4 + Math.random() * 6,
            h: 4 + Math.random() * 6,
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.2,
            life: 1
        });
    }
    
    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            if (p.life <= 0) return;
            alive = true;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.rot += p.rotSpeed;
            p.life -= 0.005;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        frame++;
        if (alive && frame < 300) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(draw);
}

// --- QUESTION NAVIGATOR (#10) ---
function toggleNavigator() {
    const grid = document.getElementById('questionNavGrid');
    grid.classList.toggle('hidden');
    if (!grid.classList.contains('hidden')) {
        renderQuestionNavigator();
    }
}

function renderQuestionNavigator() {
    const grid = document.getElementById('questionNavGrid');
    if (!grid || grid.classList.contains('hidden')) return;
    
    grid.innerHTML = '';
    for (let i = 0; i < testQuestions.length; i++) {
        const item = document.createElement('div');
        item.className = 'nav-item';
        item.textContent = i + 1;
        
        if (i === currentQuestionIndex) item.classList.add('current');
        if (userAnswers[i] !== null) item.classList.add('answered');
        if (flaggedQuestions.includes(i)) item.classList.add('flagged');
        
        item.addEventListener('click', () => jumpToQuestion(i));
        grid.appendChild(item);
    }
}

function jumpToQuestion(index) {
    if (index < 0 || index >= testQuestions.length) return;
    if (testMode !== 'examen' && !reviewMode && !userAnswers[index] && index !== currentQuestionIndex) {
        // In normal mode, can only jump to answered or current
        if (userAnswers[currentQuestionIndex] === null) return;
    }
    currentQuestionIndex = index;
    renderQuestion();
}

function toggleFlag() {
    const idx = currentQuestionIndex;
    const pos = flaggedQuestions.indexOf(idx);
    if (pos >= 0) {
        flaggedQuestions.splice(pos, 1);
    } else {
        flaggedQuestions.push(idx);
    }
    const flagBtn = document.getElementById('flagQuestionBtn');
    flagBtn.classList.toggle('active');
    renderQuestionNavigator();
}

// --- RESULT REVIEW (#2) ---
function toggleResultReview() {
    const section = document.getElementById('resultReviewSection');
    const isHidden = section.classList.contains('hidden');
    if (isHidden) {
        section.classList.remove('hidden');
        renderResultReview();
    } else {
        section.classList.add('hidden');
    }
}

function renderResultReview() {
    if (!lastTestResults) return;
    const container = document.getElementById('resultReviewList');
    container.innerHTML = '';
    
    const { testQuestions: tq, userAnswers: ua } = lastTestResults;
    
    tq.forEach((q, i) => {
        const answer = ua[i];
        let icon = '\u2b1c';
        if (answer === null) icon = '\u2b1c';
        else if (answer === q.respuestaCorrecta) icon = '\u2705';
        else icon = '\u274c';
        
        const item = document.createElement('div');
        item.className = 'result-review-item';
        item.innerHTML = `
            <span class="result-review-icon">${icon}</span>
            <span class="result-review-num">${i + 1}</span>
            <span class="result-review-text">${q.pregunta.substring(0, 80)}${q.pregunta.length > 80 ? '...' : ''}</span>
        `;
        
        item.addEventListener('click', () => {
            const existing = item.nextElementSibling;
            if (existing && existing.classList.contains('result-review-detail')) {
                existing.remove();
                return;
            }
            // Remove other open details
            container.querySelectorAll('.result-review-detail').forEach(d => d.remove());
            
            const detail = document.createElement('div');
            detail.className = 'result-review-detail';
            
            const correctLetter = q.respuestaCorrecta;
            let html = `<p style="font-weight:600;margin-bottom:0.75rem;color:var(--text-primary);font-size:0.95rem;">${q.pregunta}</p>`;
            
            ['A', 'B', 'C', 'D'].forEach(letter => {
                if (!q.opciones[letter]) return;
                let style = 'padding:0.5rem;margin:0.25rem 0;border-radius:0.5rem;font-size:0.9rem;';
                if (letter === correctLetter) {
                    style += 'background:var(--success-bg);border:1px solid var(--success);color:var(--success);';
                } else if (letter === answer && answer !== correctLetter) {
                    style += 'background:var(--error-bg);border:1px solid var(--error);color:var(--error);';
                } else {
                    style += 'background:var(--surface-subtle);border:1px solid var(--border-color);color:var(--text-secondary);';
                }
                html += `<div style="${style}"><strong>${letter})</strong> ${q.opciones[letter]}</div>`;
            });
            
            if (answer === null) {
                html += `<p style="margin-top:0.5rem;color:var(--text-secondary);font-size:0.85rem;">No respondida</p>`;
            }
            
            detail.innerHTML = html;
            item.after(detail);
        });
        
        container.appendChild(item);
    });
}

function retryFailedQuestions() {
    if (!lastTestResults) return;
    const { testQuestions: tq, userAnswers: ua } = lastTestResults;
    
    const failed = [];
    for (let i = 0; i < tq.length; i++) {
        if (ua[i] !== null && ua[i] !== tq[i].respuestaCorrecta) {
            failed.push(tq[i]);
        }
    }
    
    if (failed.length === 0) {
        alert('No hay preguntas falladas para repetir.');
        return;
    }
    
    testMode = 'normal';
    reviewMode = false;
    examTimerContainer.classList.add('hidden');
    if (examTimerInterval) clearInterval(examTimerInterval);
    
    testQuestions = failed.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    isResultSaved = false;
    userAnswers = new Array(testQuestions.length).fill(null);
    flaggedQuestions = [];
    
    document.getElementById('questionNavWrapper').classList.remove('hidden');
    document.getElementById('questionNavGrid').classList.add('hidden');
    
    switchScreen(testScreen);
    renderQuestion();
}

