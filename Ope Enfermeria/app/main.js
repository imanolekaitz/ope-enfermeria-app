/** 
 * SELECTORES DE PANTALLAS PRINCIPALES
 * Se utilizan para alternar la visibilidad de las diferentes secciones de la aplicación.
 */
const startScreen = document.getElementById('startScreen');   // Pantalla de inicio
const testScreen = document.getElementById('testScreen');     // Pantalla de realización de test
const resultScreen = document.getElementById('resultScreen'); // Pantalla de resultados finales
const historyScreen = document.getElementById('historyScreen'); // Pantalla de historial y estadísticas
const infoScreen = document.getElementById('infoScreen');       // Pantalla de "Cómo funciona"
const flashcardScreen = document.getElementById('flashcardScreen'); // Pantalla de modo Flashcards
const searchScreen = document.getElementById('searchScreen');   // Pantalla del buscador/glosario

/** 
 * BOTONES Y ELEMENTOS DE NAVEGACIÓN
 */
const resumeTestBtn = document.getElementById('resumeTestBtn');
const startFavoritesBtn = document.getElementById('startFavoritesBtn');
const startFailedBtn = document.getElementById('startFailedBtn');
const openSearchBtn = document.getElementById('openSearchBtn');
const pauseTestBtn = document.getElementById('pauseTestBtn');
const toggleFavoriteBtn = document.getElementById('toggleFavoriteBtn');
const openNoteBtn = document.getElementById('openNoteBtn');
const userNoteDisplay = document.getElementById('userNoteDisplay');

/** 
 * ELEMENTOS DEL BUSCADOR
 */
const searchToStartBtn = document.getElementById('searchToStartBtn');
const searchInput = document.getElementById('searchInput');
const doSearchBtn = document.getElementById('doSearchBtn');
const searchIdInput = document.getElementById('searchIdInput');
const searchRepoSelect = document.getElementById('searchRepoSelect');
const doSearchIdBtn = document.getElementById('doSearchIdBtn');
const searchFavoritesBtn = document.getElementById('searchFavoritesBtn');
const listAllBtn = document.getElementById('listAllBtn');
const listAllRepoSelect = document.getElementById('listAllRepoSelect');
const searchResultCount = document.getElementById('searchResultCount');
const searchResultsContainer = document.getElementById('searchResultsContainer');

/** 
 * ELEMENTOS DEL MODAL DE NOTAS
 */
const noteModal = document.getElementById('noteModal');
const closeNoteModalBtn = document.getElementById('closeNoteModalBtn');
const noteTextarea = document.getElementById('noteTextarea');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');

/** 
 * ELEMENTOS DEL MODAL DE ESTADÍSTICAS POR PREGUNTA
 */
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

// Pregunta activa para los modales de notas/estadísticas
let currentActiveQuestion = null;

/** 
 * ELEMENTOS DE UI DIVERSOS (RACHAS, CARGA, TIMER, PROGRESS)
 */
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

/** 
 * ELEMENTOS DEL MODO FLASHCARDS
 */
const flashcardElement = document.getElementById('flashcardElement');
const fcQuestionText = document.getElementById('fcQuestionText');
const fcAnswerText = document.getElementById('fcAnswerText');
const flashcardNumberText = document.getElementById('flashcardNumber');
const flashcardProgressFill = document.getElementById('flashcardProgressFill');
const fcNextBtn = document.getElementById('fcNextBtn');
const fcPrevBtn = document.getElementById('fcPrevBtn');
const fcFinishBtn = document.getElementById('fcFinishBtn');

/** 
 * BOTONES DE CONTROL DEL TEST
 */
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitExamBtn = document.getElementById('submitExamBtn');
const exitTestBtn = document.getElementById('exitTestBtn');

/** 
 * ELEMENTOS DE LA PANTALLA DE RESULTADOS
 */
const finalScoreText = document.getElementById('finalScoreText');
const feedbackMessage = document.getElementById('feedbackMessage');
const tryAgainBtn = document.getElementById('tryAgainBtn');

/** 
 * ELEMENTOS DEL MODAL DE REPORTE DE ERRORES
 */
const errorModal = document.getElementById('errorModal');
const reportErrorBtn = document.getElementById('reportErrorBtn');
const fcReportErrorBtn = document.getElementById('fcReportErrorBtn');
const closeErrorModalBtn = document.getElementById('closeErrorModalBtn');
const errorQuestionInfo = document.getElementById('errorQuestionInfo');
const errorCurrentAnswer = document.getElementById('errorCurrentAnswer');
const errorUserSuggestion = document.getElementById('errorUserSuggestion');
const errorUserComment = document.getElementById('errorUserComment');
const sendErrorEmailBtn = document.getElementById('sendErrorEmailBtn');

/** 
 * VARIABLES DE ESTADO DE LA APLICACIÓN
 */
let allQuestions = [];       // Todas las preguntas cargadas desde los JSON
let testQuestions = [];      // Preguntas seleccionadas para el test actual
let currentQuestionIndex = 0; // Índice de la pregunta actual en el test
let correctAnswersCount = 0;  // Contador de aciertos en el test actual

let dailyFlashcards = [];    // Preguntas seleccionadas para las flashcards del día
let currentFlashcardIndex = 0; // Índice de la flashcard actual

let testMode = 'normal';     // 'normal' | 'examen' | 'favoritas' | 'falladas'
let reviewMode = false;      // Indica si el usuario está revisando un test terminado
let userAnswers = [];        // Almacena las respuestas elegidas por el usuario
let chartInstance = null;    // Instancia de Chart.js para el historial
let isResultSaved = false;   // Controla que el resultado no se guarde dos veces
let isConfirmDialogActive = false; // Evita solapamiento de diálogos de confirmación

let currentErrorQuestion = null; // Pregunta sobre la que se está reportando un error

let examTimerInterval = null; // Intervalo para el cronómetro del examen
let timeRemaining = 3600;     // Tiempo restante en segundos
let finalTimeRemainingText = ''; // Texto con el tiempo sobrante al terminar examen

let flaggedQuestions = [];    // Índices de preguntas marcadas con bandera
let repoCompareChartInstance = null; // Gráfico comparativo de repositorios
let lastTestResults = null;   // Almacena datos del último test para la revisión detallada

/**
 * Genera una clave única para cada pregunta basada en su repositorio e índice original.
 * @param {Object} q Objeto de la pregunta.
 * @returns {string} Clave única identificativa.
 */
function getQuestionKey(q) {
    if (!q || !q.sourceType || !q.originalIndex) return q?.pregunta || '';
    return `${q.sourceType}_${q.originalIndex}`;
}

document.addEventListener('DOMContentLoaded', autoLoadQuestions);
window.addEventListener('cloudStateSynced', () => {
    updateStreakUI();
    updateAchievementsBadge();
    checkSavedSession();
    if (typeof renderHistory === 'function') {
        renderHistory();
    }
    if (typeof testScreen !== 'undefined' && testScreen?.classList.contains('active') && typeof renderQuestion === 'function') {
        renderQuestion();
    }
});
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
if (listAllBtn) listAllBtn.addEventListener('click', performListAll);
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
document.getElementById('openAchievementsBtn').addEventListener('click', openAchievementsModal);
document.getElementById('closeAchievementsBtn').addEventListener('click', closeAchievementsModal);
document.getElementById('achievementsModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('achievementsModal')) closeAchievementsModal();
});

/**
 * Carga automáticamente las preguntas desde los archivos JSON locales.
 * Limpia y procesa los datos para añadir metadatos de origen.
 */
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
                    // Filtrar preguntas vacías y añadir metadatos
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
        
        // Actualizar UI con la cantidad de preguntas disponibles
        fileCountText.textContent = loadedCount.toString();
        totalAvailableText.textContent = allQuestions.length;
        
        loadedFilesInfo.classList.remove('hidden');
        const loadingZone = document.getElementById('loadingZone');
        if (loadingZone) loadingZone.style.display = 'none';

        // Habilitar/Deshabilitar botones de inicio
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
        
        // Inicializar lógica de la aplicación
        updateMaxRangeInfo();
        migrateStorageKeys();
        checkSavedSession();
        updateStreakUI();
        updateAchievementsBadge();
        initGamification();
        // Consolidar estado remoto asíncronamente desde la nube
        if (window.appStorage) {
            window.appStorage.pullAndConsolidateCloudState();
        }
    } catch (e) {
        console.error("Error cargando las preguntas:", e);
        const loadingMessage = document.getElementById('loadingMessage');
        if (loadingMessage) loadingMessage.textContent = "Error al cargar las preguntas automáticamente. Por favor, asegúrate de estar en un servidor local o GitHub Pages.";
    }
}

/**
 * Actualiza la información visual del máximo de preguntas según el repositorio seleccionado.
 * También asegura que los inputs de rango no excedan los límites.
 */
function updateMaxRangeInfo() {
    let repoSelect = document.getElementById('repoSelect');
    let maxRangeInfo = document.getElementById('maxRangeInfo');
    let rangeStart = document.getElementById('rangeStart');
    let rangeEnd = document.getElementById('rangeEnd');
    if(repoSelect && maxRangeInfo && allQuestions.length > 0) {
        let count = 0;
        if (repoSelect.value === 'ambos') {
            count = allQuestions.length;
        } else {
            count = allQuestions.filter(q => q.sourceType === repoSelect.value).length;
        }
        maxRangeInfo.textContent = `(Máx: ${count})`;
        
        // Ajustar valores de rango si exceden el nuevo máximo
        if (rangeStart && rangeStart.value) {
            let v = parseInt(rangeStart.value, 10);
            if (isNaN(v) || v < 1) rangeStart.value = '';
            else if (v > count) rangeStart.value = count;
        }
        if (rangeEnd && rangeEnd.value) {
            let v = parseInt(rangeEnd.value, 10);
            if (isNaN(v) || v < 1) rangeEnd.value = '';
            else if (v > count) rangeEnd.value = count;
        }
        
        if (rangeStart) rangeStart.max = count;
        if (rangeEnd) rangeEnd.max = count;
    }
}
document.getElementById('repoSelect').addEventListener('change', updateMaxRangeInfo);

/**
 * Limita el valor de un input numérico al rango permitido.
 * @param {HTMLElement} inputEl Elemento input.
 */
function clampRangeInput(inputEl) {
    if (!inputEl || !inputEl.value) return;
    let v = parseInt(inputEl.value, 10);
    if (isNaN(v) || v < 1) { inputEl.value = ''; return; }
    let repoSelect = document.getElementById('repoSelect');
    let count = (repoSelect && repoSelect.value !== 'ambos')
        ? allQuestions.filter(q => q.sourceType === repoSelect.value).length
        : allQuestions.length;
    if (v > count) inputEl.value = count;
}

document.getElementById('rangeStart').addEventListener('blur', function() { clampRangeInput(this); });
document.getElementById('rangeEnd').addEventListener('blur', function() { clampRangeInput(this); });

/**
 * Limpia los campos de rango para seleccionar "todo" el temario.
 */
function setRangeAll() {
    document.getElementById('rangeStart').value = '';
    document.getElementById('rangeEnd').value = '';
}

/**
 * Configura e inicia un nuevo test basado en el modo seleccionado.
 * Aplica filtros de repositorio, rangos y un sistema de pesos para favorecer 
 * preguntas falladas o no vistas recientemente.
 * @param {string} mode Modo del test: 'normal', 'examen', 'favoritas', 'falladas'.
 */
function startTest(mode) {
    testMode = mode;
    reviewMode = false;
    
    // Limpiar timer si existe
    if (examTimerInterval) clearInterval(examTimerInterval);
    if (mode === 'examen') {
        timeRemaining = 3600; // 60 minutos
        finalTimeRemainingText = '';
        examTimerContainer.classList.remove('hidden');
        updateTimerDisplay();
        examTimerInterval = setInterval(timerTick, 1000);
    } else {
        examTimerContainer.classList.add('hidden');
    }
    
    // Cargar mapas de datos desde localStorage
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let lastSeenMap = JSON.parse(localStorage.getItem('antigravity_last_seen_test') || '{}');
    let currentTestCounter = parseInt(localStorage.getItem('antigravity_test_counter') || '0', 10);
    
    let repoSelect = document.getElementById('repoSelect');
    let rangeStart = document.getElementById('rangeStart');
    let rangeEnd = document.getElementById('rangeEnd');
    
    let filteredQuestions = [...allQuestions];
    
    // Aplicar filtros según el modo
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
        filteredQuestions = [...allQuestions]; // El examen usa todo el repositorio
    } else {
        // Modo normal con filtros de repositorio y rango
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
    
    /**
     * Sistema de selección inteligente por pesos:
     * - Peso base: 1
     * - +3 por cada fallo previo
     * - Bonus por tiempo sin verla (tests pasados desde la última vez)
     */
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
    
    // Determinar longitud del test
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
    
    // Selección aleatoria ponderada
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
    
    // Reiniciar estado del test
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    isResultSaved = false;
    userAnswers = new Array(testQuestions.length).fill(null);
    flaggedQuestions = [];
    
    // Configuración de UI según modo examen/estudio
    const navWrapper = document.getElementById('questionNavWrapper');
    const navGrid = document.getElementById('questionNavGrid');
    const flagBtn = document.getElementById('flagQuestionBtn');
    if (testMode === 'examen') {
        navWrapper.classList.remove('hidden');
        navGrid.classList.remove('hidden');
        if (flagBtn) flagBtn.style.display = '';
    } else {
        navWrapper.classList.add('hidden');
        navGrid.classList.add('hidden');
        if (flagBtn) flagBtn.style.display = 'none';
    }
    
    incrementStreak();
    switchScreen(testScreen);
    renderQuestion();
}

/**
 * Dibuja la pregunta actual en pantalla, gestionando opciones, favoritos y notas.
 */
function renderQuestion() {
    const q = testQuestions[currentQuestionIndex];
    
    // Actualizar encabezados
    currentQuestionNumberText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${testQuestions.length} | (Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'})`;
    
    if (testMode !== 'examen' || reviewMode) {
        scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;
    } else {
        const respondidas = userAnswers.filter(a => a !== null).length;
        scoreTrackerText.textContent = `Respondidas: ${respondidas}`;
    }

    // Barra de progreso
    const progress = ((currentQuestionIndex + 1) / testQuestions.length) * 100;
    testProgressFill.style.width = `${progress}%`;
    
    questionText.textContent = q.pregunta;
    
    // Estado de Favorita
    const qKey = getQuestionKey(q);
    const favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.includes(qKey)) {
        toggleFavoriteBtn.style.color = '#facc15';
        toggleFavoriteBtn.innerHTML = '⭐';
    } else {
        toggleFavoriteBtn.style.color = 'var(--text-secondary)';
        toggleFavoriteBtn.innerHTML = '☆';
    }
    
    // Visualización de Notas del usuario
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

    // Estado del botón de bandera (flag)
    const flagBtn = document.getElementById('flagQuestionBtn');
    if (flaggedQuestions.includes(currentQuestionIndex)) {
        flagBtn.classList.add('active');
    } else {
        flagBtn.classList.remove('active');
    }

    renderQuestionNavigator();

    // Renderizar opciones (A, B, C, D)
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
        
        // Lógica visual según modo de test y si ya ha sido respondida
        if (testMode === 'examen' && !reviewMode) {
            if (userA === opt.letter) btn.classList.add('selected');
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

/**
 * Gestiona la selección de una respuesta, actualiza el estado y las estadísticas.
 * @param {HTMLElement} selectedBtn Botón pulsado.
 * @param {string} selectedLetter Letra seleccionada (A, B, C, D).
 * @param {string} correctLetter Letra de la respuesta correcta.
 */
function handleAnswerSelected(selectedBtn, selectedLetter, correctLetter) {
    userAnswers[currentQuestionIndex] = selectedLetter;

    if (testMode !== 'examen') {
        // En modo normal, mostrar corrección inmediata
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
            selectedBtn.classList.add('shake'); // Efecto visual de error
            setTimeout(() => selectedBtn.classList.remove('shake'), 400);
        }
        scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;

        // Guardar estadísticas de esta pregunta inmediatamente para aprendizaje adaptativo
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
        
        window.appStorage.setItem('antigravity_failures', JSON.stringify(failuresMap));
        window.appStorage.setItem('antigravity_last_seen_test', JSON.stringify(lastSeenMap));
        window.appStorage.setItem('appOpeQuestionStats', JSON.stringify(statsMap));

        // Comprobar logros relacionados con tests normales
        checkAndUnlockAchievements({ context: 'answer' });
        checkDailyQuests('answer', { correct: selectedLetter === correctLetter });

    } else {
        // En modo examen, solo marcar la opción seleccionada sin corregir aún
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.classList.remove('selected'));
        selectedBtn.classList.add('selected');
        
        const respondidas = userAnswers.filter(a => a !== null).length;
        scoreTrackerText.textContent = `Respondidas: ${respondidas}`;
    }

    manageNavigationButtons();
}

/**
 * Controla la visibilidad de los botones de navegación (Siguiente, Anterior, Entregar).
 */
function manageNavigationButtons() {
    nextBtn.classList.add('hidden');
    prevBtn.classList.add('hidden');
    submitExamBtn.classList.add('hidden');

    if (currentQuestionIndex > 0) {
        prevBtn.classList.remove('hidden');
    }

    if (currentQuestionIndex < testQuestions.length - 1) {
        // Solo permitir avanzar si se ha respondido (en modo normal) o si es modo examen
        if (testMode === 'examen' || reviewMode || userAnswers[currentQuestionIndex]) {
            nextBtn.classList.remove('hidden');
        }
        if (testMode === 'examen' && !reviewMode) {
            submitExamBtn.classList.remove('hidden');
            submitExamBtn.textContent = "Entregar Examen";
            submitExamBtn.onclick = submitExamHandler;
        }
    } else {
        // Última pregunta: mostrar botón de finalizar
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

/**
 * Avanza a la siguiente pregunta con una animación de deslizamiento.
 */
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

/**
 * Retrocede a la pregunta anterior con una animación de deslizamiento.
 */
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

/**
 * Actualiza el texto visual del cronómetro (MM:SS).
 */
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    examTimerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Función que se ejecuta cada segundo para decrementar el tiempo del examen.
 */
function timerTick() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
    } else {
        clearInterval(examTimerInterval);
        alert("¡Se acabó el tiempo!");
        if (testMode === 'examen' && !reviewMode) {
             submitExamHandler(true); // Entrega forzada al agotar el tiempo
        }
    }
}

/**
 * Maneja la entrega del examen, calculando la nota final y activando el modo revisión.
 * @param {boolean} isForceCall Indica si la entrega es forzada (ej. por tiempo agotado).
 */
function submitExamHandler(isForceCall) {
    if (isForceCall !== true) {
        if (isConfirmDialogActive) return;
        isConfirmDialogActive = true;
        const res = confirm("¿Seguro que quieres entregar el examen?");
        setTimeout(() => { isConfirmDialogActive = false; }, 300);
        if (!res) return;
    }
    
    // Detener el cronómetro y calcular tiempo restante
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
    
    // Calcular aciertos finales
    correctAnswersCount = 0;
    for (let i = 0; i < testQuestions.length; i++) {
        if (userAnswers[i] === testQuestions[i].respuestaCorrecta) {
            correctAnswersCount++;
        }
    }
    
    // Guardar resultados
    if (!isResultSaved) {
        saveResult();
        isResultSaved = true;
    }
    
    reviewMode = true; // Activar modo de revisión detallada
    currentQuestionIndex = 0; 
    
    scoreTrackerText.textContent = `Aciertos: ${correctAnswersCount}`;
    checkAndUnlockAchievements({ context: 'submit_exam' });
    renderQuestion();
}

/**
 * Finaliza un test (modo normal o tras revisión) y muestra la pantalla de resultados.
 * Calcula la puntuación neta aplicando penalizaciones por fallos (-1/3).
 */
function finishTest() {
    testProgressFill.style.width = '100%';
    
    if (!isResultSaved) {
        saveResult();
        isResultSaved = true;
    }
    
    // Cálculo detallado de estadísticas y penalizaciones OPE
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
    
    // Almacenar datos para la revisión posterior
    lastTestResults = { testQuestions: [...testQuestions], userAnswers: [...userAnswers], correct, wrong, blank, netScore };
    
    // Mostrar nota final con animación
    const scoreEl = document.getElementById('finalScoreText');
    scoreEl.textContent = '0';
    document.querySelector('.score-max').textContent = `/ ${total}`;
    animateCountUp(scoreEl, correct);
    
    // Desglose de penalización
    const penaltyDiv = document.getElementById('penaltyBreakdown');
    penaltyDiv.classList.remove('hidden');
    document.getElementById('penaltyCorrect').textContent = `${correct} (+${correct.toFixed(2)})`;
    document.getElementById('penaltyWrong').textContent = `${wrong} (-${(wrong / 3).toFixed(2)})`;
    document.getElementById('penaltyBlank').textContent = `${blank} (0.00)`;
    document.getElementById('penaltyNet').textContent = `${netScore.toFixed(2)} / ${total} (${netPercentage.toFixed(1)}%)`;
    
    // Mensaje de feedback motivador
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
    
    // Comprobar logros al terminar test
    checkAndUnlockAchievements({
        context: 'finish',
        correct,
        total,
        percentage
    });
    
    // Gamificación (Fase 2)
    gamificationRewardXP(correct, total, testMode);
    checkGamificationQuests('finish_test', { correct, total, percentage, testMode });
    
    // Confetti for >90%
    if (percentage >= 90) {
        setTimeout(launchConfetti, 400);
    }
}

/**
 * Cambia la visibilidad entre las diferentes pantallas de la aplicación.
 * @param {HTMLElement} screenElement Elemento de la pantalla a mostrar.
 */
function switchScreen(screenElement) {
    [startScreen, testScreen, resultScreen, historyScreen, infoScreen, flashcardScreen, searchScreen].forEach(el => {
        if(el) el.classList.remove('active');
    });
    screenElement.classList.add('active');
}

/**
 * Sale del test actual, pidiendo confirmación si es un examen en curso.
 */
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
            // Reanudar cronómetro si se cancela la salida
            if (testMode === 'examen' && timeRemaining > 0 && !reviewMode) {
                examTimerInterval = setInterval(timerTick, 1000);
            }
        }
    } else {
        switchScreen(startScreen);
    }
}

/**
 * Guarda los resultados del test en el historial y actualiza las estadísticas de las preguntas.
 */
function saveResult() {
    const historyData = JSON.parse(localStorage.getItem('antigravity_history') || '[]');
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let lastSeenMap = JSON.parse(localStorage.getItem('antigravity_last_seen_test') || '{}');
    let statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
    
    // Incrementar contador global de tests realizados
    let currentTestCounter = parseInt(localStorage.getItem('antigravity_test_counter') || '0', 10) + 1;
    window.appStorage.setItem('antigravity_test_counter', currentTestCounter.toString());
    
    let respondidas = 0;
    
    for (let i = 0; i < testQuestions.length; i++) {
        const q = testQuestions[i];
        const ua = userAnswers[i];
        
        if (ua !== null) {
            respondidas++;
            
            // En modo examen, los resultados se guardan al final
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
        window.appStorage.setItem('antigravity_failures', JSON.stringify(failuresMap));
        window.appStorage.setItem('antigravity_last_seen_test', JSON.stringify(lastSeenMap));
        window.appStorage.setItem('appOpeQuestionStats', JSON.stringify(statsMap));
    }
    
    const record = {
        date: new Date().toISOString(),
        mode: testMode,
        correct: correctAnswersCount,
        answered: respondidas,
        total: testQuestions.length
    };
    
    historyData.push(record);
    window.appStorage.setItem('antigravity_history', JSON.stringify(historyData));
}

/**
 * Muestra la pantalla de historial y estadísticas generales.
 */
function showHistory() {
    switchScreen(historyScreen);
    renderHistory();
}

/**
 * Procesa y dibuja las estadísticas avanzadas: gráficos, tendencias, cobertura 
 * y detección de la pregunta más fallada del usuario.
 */
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

    // Indicador de Tendencia de los últimos tests
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

    // Cobertura del Temario (cuántas preguntas únicas ha visto el usuario)
    const statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
    const seenCount = Object.keys(statsMap).length;
    const totalAvail = allQuestions.length;
    const coveragePct = totalAvail > 0 ? ((seenCount / totalAvail) * 100).toFixed(1) : 0;
    document.getElementById('coverageSeen').textContent = seenCount;
    document.getElementById('coverageTotal').textContent = `/ ${totalAvail} preguntas`;
    document.getElementById('coverageFill').style.width = `${coveragePct}%`;
    document.getElementById('coveragePct').textContent = `${coveragePct}%`;

    // Gráfico comparativo por Repositorio (Aciertos Común vs Específico)
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

    // Gráfico de Evolución Temporal
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

    // Detección de la pregunta más fallada (Némesis)
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

/**
 * Borra todo el historial y estadísticas almacenadas localmente.
 */
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

/**
 * Genera o recupera las 10 Flashcards diarias.
 * Se eligen favoreciendo aquellas con más fallos previos para reforzar el aprendizaje.
 * @returns {Array} Lista de preguntas seleccionadas.
 */
function getDailyFlashcards() {
    const todayStr = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem('antigravity_daily_flashcards') || '{}');
    
    // Si ya existen para hoy y son válidas, se reutilizan
    if (stored.date === todayStr && stored.questions && stored.questions.length > 0) {
        return stored.questions;
    }

    // Generar nuevas flashcards
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let repoSelect = document.getElementById('repoSelect');
    let rangeStart = document.getElementById('rangeStart');
    let rangeEnd = document.getElementById('rangeEnd');
    
    let filteredQuestions = [...allQuestions];
    
    // Aplicar filtros de repositorio y rango actuales
    if (repoSelect && repoSelect.value !== 'ambos') {
        filteredQuestions = filteredQuestions.filter(q => q.sourceType === repoSelect.value);
    }
    let minVal = 1;
    let maxVal = filteredQuestions.length;
    if (rangeStart && rangeStart.value) minVal = parseInt(rangeStart.value, 10);
    if (rangeEnd && rangeEnd.value) maxVal = parseInt(rangeEnd.value, 10);
    filteredQuestions = filteredQuestions.slice(minVal - 1, maxVal);
    
    if (filteredQuestions.length === 0) {
        alert("No hay preguntas disponibles para Flashcards con el filtro actual.");
        return [];
    }

    // Ponderación por fallos: más fallos = más probabilidad de aparecer
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
    
    window.appStorage.setItem('antigravity_daily_flashcards', JSON.stringify({
        date: todayStr,
        questions: fcs
    }));
    
    return fcs;
}

/**
 * Inicia el modo de estudio con Flashcards.
 */
function startFlashcards() {
    dailyFlashcards = getDailyFlashcards();
    if(dailyFlashcards.length === 0) return;
    
    currentFlashcardIndex = 0;
    switchScreen(flashcardScreen);
    renderFlashcard();
}

/**
 * Renderiza la flashcard actual (Anverso con pregunta, Reverso con respuesta).
 */
function renderFlashcard() {
    const rawQ = dailyFlashcards[currentFlashcardIndex];
    // Asegurar que tenemos el objeto completo de la pregunta
    const q = allQuestions.find(x => x.pregunta === rawQ.pregunta) || rawQ;
    
    flashcardNumberText.textContent = `Flashcard ${currentFlashcardIndex + 1}/${dailyFlashcards.length} | (Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'})`;
    
    const progress = ((currentFlashcardIndex + 1) / dailyFlashcards.length) * 100;
    flashcardProgressFill.style.width = `${progress}%`;
    
    flashcardElement.classList.remove('is-flipped');
    fcQuestionText.textContent = q.pregunta;
    
    const correctLetter = q.respuestaCorrecta;
    const correctText = q.opciones[correctLetter];
    fcAnswerText.innerHTML = `<span style="display:block; margin-bottom: 0.5rem;">Opción ${correctLetter}</span><span style="font-weight: 300;">${correctText}</span>`;
    
    manageFlashcardsButtons();
}

/**
 * Controla la navegación entre flashcards.
 */
function manageFlashcardsButtons() {
    fcPrevBtn.classList.add('hidden');
    fcNextBtn.classList.add('hidden');
    fcFinishBtn.classList.add('hidden');
    
    if (currentFlashcardIndex > 0) fcPrevBtn.classList.remove('hidden');
    if (currentFlashcardIndex < dailyFlashcards.length - 1) fcNextBtn.classList.remove('hidden');
    else fcFinishBtn.classList.remove('hidden');
}

/**
 * Avanza a la siguiente flashcard.
 */
function proceedToNextFlashcard() {
    if (currentFlashcardIndex < dailyFlashcards.length - 1) {
        currentFlashcardIndex++;
        renderFlashcard();
    }
}

/**
 * Retrocede a la flashcard anterior.
 */
function proceedToPrevFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        renderFlashcard();
    }
}

/**
 * Finaliza el modo flashcards y vuelve al inicio.
 */
function finishFlashcards() {
    switchScreen(startScreen);
}

// --- LOGICA REPORTE DE ERRORES ---
/**
 * Abre el modal para reportar un error en una pregunta específica.
 * @param {Object} questionObj Objeto de la pregunta.
 */
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

/**
 * Prepara y envía un correo electrónico con los detalles del error reportado.
 */
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
/**
 * Lógica compartida para marcar/desmarcar favoritos.
 * Actualiza el estado visual del botón disparador.
 * @param {Object} q Objeto de la pregunta.
 * @param {HTMLElement} btnElement Botón que dispara el cambio (opcional).
 */
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
    window.appStorage.setItem('appOpeFavorites', JSON.stringify(favs));
    
    // Comprobar logro de coleccionista
    checkAndUnlockAchievements({ context: 'favorite' });
    
    // Sincronizar UI de test si es la pregunta actual
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

/**
 * Alterna el favorito de la pregunta actual del test.
 */
function toggleFavorite() {
    if (!testQuestions || testQuestions.length === 0) return;
    toggleFavoriteAction(testQuestions[currentQuestionIndex], toggleFavoriteBtn);
}

/**
 * Abre el modal de notas para una pregunta.
 * @param {Object} q Objeto de la pregunta.
 */
function openNoteModalAction(q) {
    if (!q) return;
    currentActiveQuestion = q;
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    const qKey = getQuestionKey(q);
    
    noteTextarea.value = notes[qKey] || '';
    noteModal.style.display = 'flex';
}

/**
 * Abre el modal de notas para la pregunta actual del test.
 */
function openNoteModal() {
    if (!testQuestions || testQuestions.length === 0) return;
    openNoteModalAction(testQuestions[currentQuestionIndex]);
}

/**
 * Guarda la nota personal escrita por el usuario.
 */
function saveNote() {
    let q = currentActiveQuestion;
    // Si no hay una activa en el buscador, intentamos usar la del test en curso
    if (!q && testQuestions && testQuestions.length > 0) {
        q = testQuestions[currentQuestionIndex];
    }
    if (!q) return;
    
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    const val = noteTextarea.value.trim();
    const qKey = getQuestionKey(q);
    
    if (val) notes[qKey] = val;
    else delete notes[qKey];
    
    window.appStorage.setItem('appOpeNotes', JSON.stringify(notes));
    noteModal.style.display = 'none';
    
    // Refrescar UI pertinente
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex] && getQuestionKey(testQuestions[currentQuestionIndex]) === qKey) {
        renderQuestion();
    }
    if (statsModal.style.display === 'flex') openStatsModal(q);
}

/**
 * Borra la nota personal de la pregunta activa.
 */
function deleteNote() {
    let q = currentActiveQuestion;
    if (!q && testQuestions && testQuestions.length > 0) {
        q = testQuestions[currentQuestionIndex];
    }
    if (!q) return;
    
    const notes = JSON.parse(localStorage.getItem('appOpeNotes') || '{}');
    const qKey = getQuestionKey(q);
    delete notes[qKey];
    window.appStorage.setItem('appOpeNotes', JSON.stringify(notes));
    noteModal.style.display = 'none';
    
    if (testScreen.classList.contains('active') && testQuestions[currentQuestionIndex] && getQuestionKey(testQuestions[currentQuestionIndex]) === qKey) {
        renderQuestion();
    }
    if (statsModal.style.display === 'flex') openStatsModal(q);
}

// --- LOGICA BUSCADOR / GLOSARIO ---
/**
 * Abre la pantalla del buscador avanzado.
 */
function openSearchScreen() {
    searchInput.value = '';
    searchIdInput.value = '';
    searchResultCount.textContent = '0';
    searchResultsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">Escribe algo arriba para buscar entre todas las preguntas.</p>';
    switchScreen(searchScreen);
}

/**
 * Ejecuta una búsqueda de texto global.
 * Utiliza normalización Unicode para ignorar tildes y diacríticos.
 */
function performSearch() {
    const rawQuery = searchInput.value.trim();
    if (!rawQuery) {
        openSearchScreen();
        return;
    }
    
    /**
     * Normaliza una cadena para búsqueda insensible a acentos.
     */
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

/**
 * Busca preguntas por número de ID o índice original en el repositorio seleccionado.
 */
function performSearchById() {
    const numStr = searchIdInput.value.trim();
    if (!numStr) return;
    
    const num = parseInt(numStr, 10);
    const repo = searchRepoSelect.value;
    
    const results = allQuestions.filter(q => {
        let matchRepo = (repo === 'ambos') ? true : (q.sourceType === repo);
        return matchRepo && (q.id == num || q.originalIndex == num);
    });
    
    renderSearchResults(results);
}

/**
 * Filtra y muestra todas las preguntas guardadas en Favoritos.
 */
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

/**
 * Lista todas las preguntas de un repositorio concreto.
 */
function performListAll() {
    const repoVal = listAllRepoSelect ? listAllRepoSelect.value : 'ambos';
    let results;
    if (repoVal === 'ambos') results = [...allQuestions];
    else results = allQuestions.filter(q => q.sourceType === repoVal);
    
    if (results.length === 0) {
        searchResultCount.textContent = '0';
        searchResultsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">No hay preguntas disponibles para ese repositorio.</p>';
        return;
    }
    renderSearchResults(results);
}

/**
 * Renderiza los resultados de búsqueda con un diseño de tarjetas informativas.
 * @param {Array} results Lista de preguntas.
 */
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
        div.className = 'search-result-card'; // Clase estilizada en CSS
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

/**
 * Abre un modal con estadísticas detalladas de la pregunta.
 * Muestra aciertos, errores y permite gestionar favoritas/notas.
 * @param {Object} q Objeto de la pregunta.
 */
function openStatsModal(q) {
    currentActiveQuestion = q;
    const qKey = getQuestionKey(q);
    statsQuestionTitle.textContent = `Nº ${q.originalIndex || '?'} - ${q.sourceName || 'General'}`;
    statsQuestionText.textContent = q.pregunta;
    
    const correctLetter = q.respuestaCorrecta;
    statsCorrectAnswer.textContent = `Opción ${correctLetter}: ${q.opciones[correctLetter]}`;
    
    // Cargar estadísticas generales
    let statsMap = JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}');
    const stats = statsMap[qKey] || { seen: 0, correct: 0, wrong: 0 };
    
    // Cargar historial de fallos específicos
    let failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    let historicalWrong = failuresMap[qKey] || 0;
    
    // Mostrar estadísticas consolidadas
    statsSeen.textContent = Math.max(stats.seen, historicalWrong);
    statsCorrect.textContent = stats.correct;
    statsWrong.textContent = Math.max(stats.wrong, historicalWrong);
    
    // Actualizar estado visual de favorita
    let favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.includes(qKey)) {
        statsToggleFavBtn.style.color = '#facc15';
        statsToggleFavBtn.innerHTML = '⭐ Favorita';
    } else {
        statsToggleFavBtn.style.color = 'var(--text-secondary)';
        statsToggleFavBtn.innerHTML = '☆ Favorita';
    }
    
    // Actualizar estado visual de notas
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
    
    window.appStorage.setItem('appOpeSavedSession', JSON.stringify(session));
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
    
    // Navigator and flag button: only for exam mode
    const resumeNavWrapper = document.getElementById('questionNavWrapper');
    const resumeNavGrid = document.getElementById('questionNavGrid');
    const resumeFlagBtn = document.getElementById('flagQuestionBtn');
    if (testMode === 'examen') {
        resumeNavWrapper.classList.remove('hidden');
        resumeNavGrid.classList.remove('hidden');
        if (resumeFlagBtn) resumeFlagBtn.style.display = '';
    } else {
        resumeNavWrapper.classList.add('hidden');
        resumeNavGrid.classList.add('hidden');
        if (resumeFlagBtn) resumeFlagBtn.style.display = 'none';
    }
    
    localStorage.removeItem('appOpeSavedSession');
    checkSavedSession();
    
    switchScreen(testScreen);
    renderQuestion();
}

// --- LOGICA RACHAS (STREAKS) ---
function incrementStreak() {
    // Primero, si ha pasado la medianoche con la app abierta, updateStreakUI consumirá los protectores necesarios
    updateStreakUI();

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
        
        if (diffDays === 1 || streakData.streak === 0) {
            streakData.streak += 1;
        } else {
            streakData.streak = 1; // Perdió la racha (no tenía protectores)
        }
    } else {
        streakData.streak = 1;
    }
    
    streakData.lastDate = today;
    window.appStorage.setItem('appOpeStudyStreak', JSON.stringify(streakData));
    updateStreakUI();
    
    // Comprobar logro de racha
    checkAndUnlockAchievements({ context: 'streak', streak: streakData.streak });
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
            let freezes = parseInt(localStorage.getItem('appOpe_streak_freezes') || '0', 10);
            const daysMissed = diffDays - 1;
            
            if (freezes >= daysMissed) {
                // Tienen suficientes protectores
                freezes -= daysMissed;
                localStorage.setItem('appOpe_streak_freezes', freezes);
                
                // Actualizar lastDate para simular que estudiaron ayer
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                streakData.lastDate = yesterday.toDateString();
                window.appStorage.setItem('appOpeStudyStreak', JSON.stringify(streakData));
                
                if (typeof showAchievementToast === 'function') {
                    showAchievementToast({ icon: '🧊', name: 'Racha Salvada', desc: `Se usaron ${daysMissed} protectores.` });
                }
                if (document.getElementById('streakFreezeCount')) document.getElementById('streakFreezeCount').textContent = freezes;
            } else {
                // Perdió la racha ayer o antes
                streakData.streak = 0;
                window.appStorage.setItem('appOpeStudyStreak', JSON.stringify(streakData));
            }
        }
    }
    
    if (true) {
        streakContainer.classList.remove('hidden');
        streakCountText.textContent = streakData.streak;
    } else {
        streakContainer.classList.add('hidden');
    }
}

/**
 * MIGRACIÓN DE DATOS (v2): Convierte claves de texto a claves únicas (Repo_Index).
 * Necesario para mantener la consistencia entre dispositivos y actualizaciones.
 */
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
        if (changed) window.appStorage.setItem(storageKey, JSON.stringify(newData));
    }
    
    // Migrar favoritos (formato array)
    let favs = JSON.parse(localStorage.getItem('appOpeFavorites') || '[]');
    if (favs.length > 0 && favs[0] && favs[0].length > 30) {
        favs = favs.map(text => textToKey[text] || text);
        window.appStorage.setItem('appOpeFavorites', JSON.stringify(favs));
    }
    
    migrateObject('appOpeNotes');
    migrateObject('antigravity_failures');
    migrateObject('antigravity_last_seen_test');
    migrateObject('appOpeQuestionStats');
    
    localStorage.setItem('appOpe_migrated_v2', 'true');
    console.log('Storage keys migrated to v2 format.');
}

/**
 * Alterna el tema de la aplicación (Claro / Oscuro).
 */
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    btn.textContent = isLight ? '\u2600\ufe0f' : '\ud83c\udf19';
    window.appStorage.setItem('appOpeTheme', isLight ? 'light' : 'dark');
}

/**
 * Aplica el tema guardado en el arranque.
 */
function applyTheme() {
    const saved = localStorage.getItem('appOpeTheme');
    const btn = document.getElementById('themeToggleBtn');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        btn.textContent = '\u2600\ufe0f';
    }
}
applyTheme();

/**
 * Animación de conteo ascendente para números.
 * @param {HTMLElement} element Elemento donde mostrar el número.
 * @param {number} target Valor final.
 */
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

/**
 * Lanza una animación de confeti en toda la pantalla.
 */
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

/**
 * Abre/Cierra el panel de navegación rápida por preguntas (Grid).
 */
function toggleNavigator() {
    const grid = document.getElementById('questionNavGrid');
    grid.classList.toggle('hidden');
    if (!grid.classList.contains('hidden')) {
        renderQuestionNavigator();
    }
}

/**
 * Renderiza los botones de navegación rápida.
 */
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

/**
 * Salta directamente a una pregunta específica.
 * @param {number} index Índice de la pregunta.
 */
function jumpToQuestion(index) {
    if (index < 0 || index >= testQuestions.length) return;
    // En modo normal, no se puede saltar hacia adelante si no se ha respondido la actual
    if (testMode !== 'examen' && !reviewMode && !userAnswers[index] && index !== currentQuestionIndex) {
        if (userAnswers[currentQuestionIndex] === null) return;
    }
    currentQuestionIndex = index;
    renderQuestion();
}

/**
 * Marca/Desmarca la pregunta actual con una bandera (flag) para revisión.
 */
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

/**
 * Abre/Cierra la lista detallada de revisión de respuestas tras finalizar un test.
 */
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

/**
 * Dibuja la lista de revisión con iconos de acierto/error y desplegable de detalles.
 */
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
            
            if (answer === null) html += `<p style="margin-top:0.5rem;color:var(--text-secondary);font-size:0.85rem;">No respondida</p>`;
            
            detail.innerHTML = html;
            item.after(detail);
        });
        
        container.appendChild(item);
    });
}

/**
 * Inicia un nuevo test rápido compuesto solo por las preguntas falladas en el último intento.
 */
function retryFailedQuestions() {
    if (!lastTestResults) return;
    const { testQuestions: tq, userAnswers: ua } = lastTestResults;
    const failed = tq.filter((q, i) => ua[i] !== null && ua[i] !== q.respuestaCorrecta);
    
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
    
    document.getElementById('questionNavWrapper').classList.add('hidden');
    document.getElementById('questionNavGrid').classList.add('hidden');
    const retryFlagBtn = document.getElementById('flagQuestionBtn');
    if (retryFlagBtn) retryFlagBtn.style.display = 'none';
    
    switchScreen(testScreen);
    renderQuestion();
}

/** 
 * DEFINICIÓN DEL SISTEMA DE LOGROS
 */
const ACHIEVEMENTS = [
    { id: 'primer_test', icon: '\ud83e\udd49', name: 'Primer Test', desc: 'Completa tu primer test o examen.', check: () => JSON.parse(localStorage.getItem('antigravity_history') || '[]').length >= 1 },
    { id: 'decena', icon: '\ud83d\udcd6', name: 'Estudiante Constante', desc: 'Completa 10 tests o ex\u00e1menes.', check: () => JSON.parse(localStorage.getItem('antigravity_history') || '[]').length >= 10 },
    { id: 'francotirador', icon: '\ud83c\udfaf', name: 'Francotirador', desc: 'Consigue un 100% en un test de 50+ preguntas.', check: (ctx) => (ctx && ctx.context === 'finish' && ctx.percentage === 100 && ctx.total >= 50) || JSON.parse(localStorage.getItem('antigravity_history') || '[]').some(r => r.total >= 50 && r.correct === r.total && r.answered === r.total) },
    { id: 'perfeccionista', icon: '\ud83d\udc8e', name: 'Perfeccionista', desc: 'Responde 10 preguntas seguidas correctamente en un test.', check: () => !!localStorage.getItem('appOpeAch_streak10') },
    { id: 'racha_7', icon: '\ud83d\udd25', name: 'Racha de 7', desc: '7 d\u00edas seguidos estudiando.', check: (ctx) => (ctx && ctx.context === 'streak' && ctx.streak >= 7) || JSON.parse(localStorage.getItem('appOpeStudyStreak') || '{"streak":0}').streak >= 7 },
    { id: 'enciclopedia', icon: '\ud83d\udcda', name: 'Enciclopedia', desc: 'Has visto al menos 500 preguntas distintas.', check: () => Object.keys(JSON.parse(localStorage.getItem('appOpeQuestionStats') || '{}')).length >= 500 },
    { id: 'coleccionista', icon: '\u2b50', name: 'Coleccionista', desc: 'Marca 50 preguntas como favoritas.', check: () => JSON.parse(localStorage.getItem('appOpeFavorites') || '[]').length >= 50 }
];

function loadUnlockedAchievements() { return JSON.parse(localStorage.getItem('appOpeAchievements') || '{}'); }
function saveUnlockedAchievements(data) { window.appStorage.setItem('appOpeAchievements', JSON.stringify(data)); }

let achievementToastQueue = [];
let achievementToastActive = false;

/**
 * Comprueba si el usuario ha cumplido las condiciones para desbloquear nuevos logros.
 * @param {Object} ctx Contexto del evento (finish, answer, streak, etc.)
 */
function checkAndUnlockAchievements(ctx = {}) {
    if (ctx.context === 'answer' && testMode !== 'examen') {
        let streak = 0;
        for (let i = 0; i <= currentQuestionIndex; i++) {
            if (userAnswers[i] && testQuestions[i] && userAnswers[i] === testQuestions[i].respuestaCorrecta) streak++;
            else streak = 0;
        }
        if (streak >= 10) window.appStorage.setItem('appOpeAch_streak10', '1');
    }

    const unlocked = loadUnlockedAchievements();
    const newlyUnlocked = [];

    for (const ach of ACHIEVEMENTS) {
        if (unlocked[ach.id]) continue;
        try {
            if (ach.check(ctx)) {
                const now = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
                unlocked[ach.id] = { date: now };
                newlyUnlocked.push(ach);
            }
        } catch (e) {}
    }

    if (newlyUnlocked.length > 0) {
        saveUnlockedAchievements(unlocked);
        updateAchievementsBadge();
        newlyUnlocked.forEach(ach => achievementToastQueue.push(ach));
        if (!achievementToastActive) processToastQueue();
    }
}

function processToastQueue() {
    if (achievementToastQueue.length === 0) { achievementToastActive = false; return; }
    achievementToastActive = true;
    const ach = achievementToastQueue.shift();
    showAchievementToast(ach, () => setTimeout(processToastQueue, 400));
}

function showAchievementToast(ach, onDone) {
    const toast = document.getElementById('achievementToast');
    document.getElementById('achievementToastIcon').textContent = ach.icon;
    document.getElementById('achievementToastName').textContent = ach.name;
    document.getElementById('achievementToastDesc').textContent = ach.desc;
    const iconEl = document.getElementById('achievementToastIcon');
    iconEl.style.animation = 'none'; void iconEl.offsetWidth; iconEl.style.animation = '';
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); if (onDone) setTimeout(onDone, 500); }, 3500);
}

function updateAchievementsBadge() {
    const unlocked = loadUnlockedAchievements();
    const badge = document.getElementById('achievementsUnlockedBadge');
    if (badge) badge.textContent = Object.keys(unlocked).length + '/' + ACHIEVEMENTS.length;
}

function openAchievementsModal() { renderAchievementsModal(); document.getElementById('achievementsModal').classList.add('open'); }
function closeAchievementsModal() { document.getElementById('achievementsModal').classList.remove('open'); }

/**
 * Renderiza el modal de logros con tarjetas desbloqueadas y bloqueadas.
 */
function renderAchievementsModal() {
    const unlocked = loadUnlockedAchievements();
    const total = ACHIEVEMENTS.length;
    const count = Object.keys(unlocked).length;
    document.getElementById('achievementsProgressText').textContent = count + ' de ' + total + ' desbloqueados';
    document.getElementById('achievementsProgressFill').style.width = (total > 0 ? (count / total) * 100 : 0) + '%';
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    [...ACHIEVEMENTS].sort((a, b) => (!!unlocked[a.id] === !!unlocked[b.id]) ? 0 : (!!unlocked[a.id] ? -1 : 1)).forEach(ach => {
        const isUnlocked = !!unlocked[ach.id];
        const card = document.createElement('div');
        card.className = 'achievement-card ' + (isUnlocked ? 'unlocked' : 'locked');
        card.innerHTML = `<span class="achievement-badge">${isUnlocked ? '\u2713 Obtenido' : 'Bloqueado'}</span><div class="achievement-icon">${ach.icon}</div><div class="achievement-name">${ach.name}</div><div class="achievement-desc">${ach.desc}</div>${isUnlocked ? '<div class="achievement-date">\ud83d\udcc5 ' + unlocked[ach.id].date + '</div>' : ''}`;
        grid.appendChild(card);
    });
}

// Comprobación inicial de logros al cargar
window.addEventListener('load', () => setTimeout(() => checkAndUnlockAchievements({ context: 'load' }), 2000));

/* ===== CONTROLADORES DE INTERFAZ DE AUTENTICACIÓN (FASE 4) ===== */
let currentAuthTab = 'login';

function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    refreshAuthModalViewState();
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('hidden');
}

async function refreshAuthModalViewState() {
    if (!window.appStorage || !window.appStorage.supabase) return;
    const { data: { session } } = await window.appStorage.supabase.auth.getSession();
    const loggedPanel = document.getElementById('authLoggedPanel');
    const formFields = document.getElementById('authFormFieldsContainer');
    const emailDisplay = document.getElementById('authLoggedUserEmail');
    const errorMsg = document.getElementById('authErrorMsg');
    const tabBtns = document.querySelectorAll('#authModal button[id^="tab"]');

    if (errorMsg) errorMsg.classList.add('hidden');

    if (session && session.user) {
        if (loggedPanel) loggedPanel.classList.remove('hidden');
        if (formFields) formFields.classList.add('hidden');
        if (emailDisplay) emailDisplay.textContent = session.user.email;
        tabBtns.forEach(btn => btn.parentElement.classList.add('hidden'));
    } else {
        if (loggedPanel) loggedPanel.classList.add('hidden');
        if (formFields) formFields.classList.remove('hidden');
        tabBtns.forEach(btn => btn.parentElement.classList.remove('hidden'));
    }
}

function switchAuthTab(tab) {
    currentAuthTab = tab;
    const loginBtn = document.getElementById('tabLoginBtn');
    const regBtn = document.getElementById('tabRegisterBtn');
    const errorMsg = document.getElementById('authErrorMsg');
    const submitBtn = document.getElementById('authSubmitBtn');
    
    if (errorMsg) errorMsg.classList.add('hidden');

    if (tab === 'login') {
        if (loginBtn) { loginBtn.style.background = 'var(--accent)'; loginBtn.style.color = 'white'; }
        if (regBtn) { regBtn.style.background = 'transparent'; regBtn.style.color = 'var(--text-secondary)'; }
        if (submitBtn) submitBtn.textContent = 'Entrar';
    } else {
        if (regBtn) { regBtn.style.background = 'var(--accent)'; regBtn.style.color = 'white'; }
        if (loginBtn) { loginBtn.style.background = 'transparent'; loginBtn.style.color = 'var(--text-secondary)'; }
        if (submitBtn) submitBtn.textContent = 'Crear Cuenta';
    }
}

async function submitAuthForm() {
    const emailInput = document.getElementById('authEmailInput');
    const passInput = document.getElementById('authPasswordInput');
    const errorMsg = document.getElementById('authErrorMsg');
    const submitBtn = document.getElementById('authSubmitBtn');

    if (!emailInput || !passInput || !errorMsg) return;

    const email = emailInput.value.trim();
    const pass = passInput.value;

    if (!email || !email.includes('@')) {
        errorMsg.textContent = 'Por favor, introduce un correo electrónico válido.';
        errorMsg.classList.remove('hidden');
        return;
    }

    if (pass.length < 6) {
        errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        errorMsg.classList.remove('hidden');
        return;
    }

    errorMsg.classList.add('hidden');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Conectando...';
    submitBtn.disabled = true;

    try {
        let res;
        if (currentAuthTab === 'login') {
            res = await window.appStorage.loginWithEmail(email, pass);
        } else {
            res = await window.appStorage.registerWithEmail(email, pass);
        }

        if (res?.error) {
            errorMsg.textContent = 'Error de acceso: ' + (res.error.message.includes('Invalid') ? 'Credenciales incorrectas o ya registrado' : res.error.message);
            errorMsg.classList.remove('hidden');
        } else {
            // Éxito absoluto, recargamos el estado visual
            refreshAuthModalViewState();
            updateHeaderCloudTriggerBadge();
            setTimeout(closeAuthModal, 1200);
        }
    } catch (err) {
        errorMsg.textContent = 'Error de conexión con la nube.';
        errorMsg.classList.remove('hidden');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Sincronización continua de la cabecera minimalista
async function updateHeaderCloudTriggerBadge() {
    const triggerBtn = document.getElementById('cloudAuthTriggerBtn');
    const statusIcon = document.getElementById('cloudAuthStatusIcon');
    const statusText = document.getElementById('cloudAuthStatusText');
    
    if (!triggerBtn || !window.appStorage || !window.appStorage.supabase) return;

    const { data: { session } } = await window.appStorage.supabase.auth.getSession();
    if (session && session.user) {
        triggerBtn.classList.add('synced');
        triggerBtn.title = 'Sesión Activa: ' + session.user.email + ' (clic para gestionar)';
        if (statusIcon) statusIcon.style.color = '#22c55e';
        if (statusText) statusText.textContent = 'Sincronizado';
    } else {
        triggerBtn.classList.remove('synced');
        triggerBtn.title = 'Sincronizar en la nube';
        if (statusIcon) statusIcon.style.color = 'var(--text-secondary)';
        if (statusText) statusText.textContent = 'Sincronizar';
    }
}

// Escuchar consolidación global para repintar cabecera en vivo
window.addEventListener('cloudStateSynced', () => {
    updateHeaderCloudTriggerBadge();
    refreshAuthModalViewState();
});

// Notificación animada tras registrarse y combinar con éxito
window.addEventListener('cloudDataMerged', (e) => {
    showAchievementToast({
        icon: '☁️',
        name: '¡Fusión Completa!',
        desc: `Se han volcado ${e.detail?.count || 0} favoritos/notas a tu cuenta en la nube.`
    });
});

// Carga inicial al montar la UI
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateHeaderCloudTriggerBadge, 500);
});

// Solicitud segura de borrado de cuenta e historial (Fase 5)
function requestUserAccountDeletion() {
    if (confirm("⚠️ ADVERTENCIA DE PRIVACIDAD:\n\n¿Estás totalmente seguro de que deseas cerrar sesión, desenlazar tu cuenta y borrar de inmediato todo tu historial local de estudio en este dispositivo?\n\nEsta acción de supresión local es irreversible.")) {
        if (window.appStorage) {
            window.appStorage.deleteUserAccount();
        }
    }
}

// --- BASTIONADO DE SEGURIDAD: CIERRE AUTOMÁTICO DE SESIÓN POR INACTIVIDAD ---
let inactivityTimerTimeout = null;
const INACTIVITY_LIMIT_MS = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

function resetInactivityTimer() {
    if (inactivityTimerTimeout) clearTimeout(inactivityTimerTimeout);
    inactivityTimerTimeout = setTimeout(() => {
        // Ejecutar cierre de sesión si existe la capa de almacenamiento activa
        if (window.appStorage && window.appStorage.supabase) {
            console.log('🔒 Límite de inactividad superado (7 días). Cerrando sesión nativa por seguridad...');
            window.appStorage.logout().then(() => {
                alert("🔒 Sesión cerrada por inactividad prolongada por seguridad.");
            }).catch(e => console.warn('Aviso cerrando sesión por inactividad:', e));
        }
    }, INACTIVITY_LIMIT_MS);
}

// Iniciar y enlazar eventos pasivos de monitoreo al montar el DOM
window.addEventListener('DOMContentLoaded', () => {
    resetInactivityTimer();
    ['click', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
        document.addEventListener(evt, resetInactivityTimer, { passive: true });
    });
});

// ===== GAMIFICACIÓN (FASE 2) =====

function initGamification() {
    const xp = parseInt(localStorage.getItem('appOpe_XP') || '0', 10);
    const freezes = parseInt(localStorage.getItem('appOpe_streak_freezes') || '0', 10);
    
    // Ranks
    let rank = "Estudiante";
    if (xp >= 50000) rank = "Plaza Fija";
    else if (xp >= 30000) rank = "Supervisor/a";
    else if (xp >= 15000) rank = "Enfermero/a Adjunto/a";
    else if (xp >= 5000) rank = "EIR";
    
    // UI Update
    const gamificationPanel = document.getElementById('gamificationPanel');
    if (gamificationPanel) gamificationPanel.classList.remove('hidden');
    
    const userRankText = document.getElementById('userRankText');
    const userXpText = document.getElementById('userXpText');
    const xpBarFill = document.getElementById('xpBarFill');
    const streakFreezeCount = document.getElementById('streakFreezeCount');
    
    if (userRankText) userRankText.textContent = rank;
    if (userXpText) userXpText.textContent = `${xp} XP`;
    if (streakFreezeCount) streakFreezeCount.textContent = freezes;
    
    if (xpBarFill) {
        // Calculate next level percentage
        let nextLvlXP = 5000;
        let prevLvlXP = 0;
        if (xp >= 50000) { nextLvlXP = 50000; prevLvlXP = 50000; }
        else if (xp >= 30000) { nextLvlXP = 50000; prevLvlXP = 30000; }
        else if (xp >= 15000) { nextLvlXP = 30000; prevLvlXP = 15000; }
        else if (xp >= 5000) { nextLvlXP = 15000; prevLvlXP = 5000; }
        
        if (xp >= 50000) {
            xpBarFill.style.width = '100%';
        } else {
            const pct = ((xp - prevLvlXP) / (nextLvlXP - prevLvlXP)) * 100;
            xpBarFill.style.width = `${pct}%`;
        }
    }
    
    updateTemarioHealth();
    checkDailyQuests();
}

function awardXP(amount) {
    if (amount <= 0) return;
    let xp = parseInt(localStorage.getItem('appOpe_XP') || '0', 10);
    xp += amount;
    localStorage.setItem('appOpe_XP', xp);
    
    if (typeof showAchievementToast === 'function') {
        showAchievementToast({ icon: '✨', name: `+${amount} XP`, desc: 'Sigue sumando puntos.' });
    }
    initGamification(); // Refresh UI
}

function gamificationRewardXP(correct, total, mode) {
    let gained = correct * 10;
    if (mode === 'examen') gained += 500;
    else if (total >= 50) gained += 250;
    awardXP(gained);
}

function updateTemarioHealth() {
    const failuresMap = JSON.parse(localStorage.getItem('antigravity_failures') || '{}');
    const totalQuestions = allQuestions.length || 1;
    let failedCount = Object.keys(failuresMap).filter(k => failuresMap[k] > 0).length;
    
    const healthIndicatorText = document.getElementById('healthIndicatorText');
    const healthBarFill = document.getElementById('healthBarFill');
    
    if (!healthIndicatorText || !healthBarFill) return;
    
    let healthPct = 100 - ((failedCount / totalQuestions) * 100);
    if (healthPct < 0) healthPct = 0;
    
    healthIndicatorText.textContent = `${Math.round(healthPct)}%`;
    healthBarFill.style.width = `${healthPct}%`;
    
    if (healthPct >= 80) healthBarFill.style.background = '#4ade80';
    else if (healthPct >= 50) healthBarFill.style.background = '#facc15';
    else healthBarFill.style.background = '#f87171';
}

window.buyStreakFreeze = function() {
    let xp = parseInt(localStorage.getItem('appOpe_XP') || '0', 10);
    if (xp >= 500) {
        if(confirm("¿Quieres gastar 500 XP para comprar 1 Protector de Racha?")) {
            xp -= 500;
            localStorage.setItem('appOpe_XP', xp);
            let freezes = parseInt(localStorage.getItem('appOpe_streak_freezes') || '0', 10);
            localStorage.setItem('appOpe_streak_freezes', freezes + 1);
            initGamification();
            showAchievementToast({ icon: '🧊', name: 'Protector Adquirido', desc: 'Tienes un nuevo protector de racha.' });
        }
    } else {
        alert("Necesitas al menos 500 XP para comprar un protector.");
    }
};

// Misiones Diarias
const possibleQuests = [
    { id: 'q_20_correct', desc: 'Acierta 20 preguntas en total', req: 20, reward: 150 },
    { id: 'q_test_50', desc: 'Haz un test de 50 pregs.', req: 1, reward: 200 },
    { id: 'q_test_perfect', desc: 'Acierta el 100% en un test de >10 pregs', req: 1, reward: 300 }
];

function checkDailyQuests(event = 'init', data = null) {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('appOpe_daily_quests_date');
    let quests = JSON.parse(localStorage.getItem('appOpe_daily_quests') || '[]');
    
    if (storedDate !== today || quests.length === 0) {
        // Generar nuevas misiones (shuffle de posibles)
        const shuffled = [...possibleQuests].sort(() => 0.5 - Math.random());
        quests = shuffled.slice(0, 3).map(q => ({ ...q, progress: 0, completed: false, claimed: false }));
        localStorage.setItem('appOpe_daily_quests_date', today);
        localStorage.setItem('appOpe_daily_quests', JSON.stringify(quests));
    }
    
    // Procesar progreso
    if (event !== 'init' && data) {
        let updated = false;
        quests.forEach(q => {
            if (q.completed) return;
            
            if (q.id === 'q_20_correct' && event === 'answer' && data.correct) {
                q.progress += 1;
                updated = true;
            } else if (q.id === 'q_test_50' && event === 'finish_test' && data.total >= 50) {
                q.progress = 1;
                updated = true;
            } else if (q.id === 'q_test_perfect' && event === 'finish_test' && data.total >= 10 && data.percentage === 100) {
                q.progress = 1;
                updated = true;
            }
            
            if (q.progress >= q.req) {
                q.progress = q.req;
                q.completed = true;
                updated = true;
                if (typeof showAchievementToast === 'function') {
                    showAchievementToast({ icon: '🎯', name: 'Misión Completada', desc: q.desc });
                }
            }
        });
        if (updated) localStorage.setItem('appOpe_daily_quests', JSON.stringify(quests));
    }
    
    renderDailyQuests(quests);
}

// Alias para finishTest
window.checkGamificationQuests = checkDailyQuests;

function renderDailyQuests(quests) {
    const container = document.getElementById('dailyQuestsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    quests.forEach((q, idx) => {
        const item = document.createElement('div');
        item.className = `quest-item ${q.completed ? 'completed' : ''}`;
        
        let progressText = q.req > 1 ? `(${q.progress}/${q.req})` : '';
        if (q.completed) progressText = '✅';
        
        let actionHTML = '';
        if (q.completed && !q.claimed) {
            actionHTML = `<button class="quest-reward-btn" onclick="claimQuestReward(${idx})">Reclamar +${q.reward}XP</button>`;
        } else if (q.claimed) {
            actionHTML = `<span style="font-size:0.8rem; color:var(--text-secondary);">Reclamado</span>`;
        } else {
            let jsAction = '';
            if (q.id === 'q_20_correct') jsAction = 'document.getElementById(`testLengthSelect`).value=`25`; document.getElementById(`startTestBtn`).click()';
            else if (q.id === 'q_test_50') jsAction = 'document.getElementById(`testLengthSelect`).value=`50`; document.getElementById(`startTestBtn`).click()';
            else if (q.id === 'q_test_perfect') jsAction = 'document.getElementById(`testLengthSelect`).value=`25`; document.getElementById(`startTestBtn`).click()';
            
            actionHTML = `<button onclick="${jsAction}" style="background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.4); color: #818cf8; border-radius: 0.5rem; padding: 0.3rem 0.6rem; cursor: pointer; font-size: 0.8rem; display:flex; align-items:center; gap:0.2rem; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">▶️ Ir</button>`;
        }
        
        item.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:0.2rem;">
                <span style="font-size:0.85rem; color:var(--text-primary); font-weight:600;">${q.desc} <span style="color:var(--text-secondary); font-weight:normal;">${progressText}</span></span>
                ${!q.completed ? `<div style="background:rgba(0,0,0,0.2); height:4px; border-radius:2px; margin-top:0.2rem;"><div style="background:linear-gradient(90deg, #6366f1, #a855f7); height:100%; border-radius:2px; width:${(q.progress/q.req)*100}%;"></div></div>` : ''}
            </div>
            <div>${actionHTML}</div>
        `;
        container.appendChild(item);
    });
}

window.claimQuestReward = function(idx) {
    let quests = JSON.parse(localStorage.getItem('appOpe_daily_quests') || '[]');
    if (quests[idx] && quests[idx].completed && !quests[idx].claimed) {
        quests[idx].claimed = true;
        localStorage.setItem('appOpe_daily_quests', JSON.stringify(quests));
        awardXP(quests[idx].reward);
        renderDailyQuests(quests);
    }
};
