let fileData = [];
let currentFilename = "";
let questionsAnswered = 0;

const jsonFileBtn = document.getElementById('jsonFileBtn');
const downloadBtn = document.getElementById('downloadBtn');
const questionsContainer = document.getElementById('questionsContainer');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');

jsonFileBtn.addEventListener('click', handleFileUpload);
downloadBtn.addEventListener('click', handleDownload);

async function handleFileUpload() {
    let fileHandles;
    try {
        fileHandles = await window.showOpenFilePicker({
            id: 'antigravity_data_folder',
            multiple: false,
            types: [{
                description: 'Archivos JSON',
                accept: { 'application/json': ['.json'] }
            }]
        });
    } catch (error) {
        return; // Usuario canceló
    }

    if (!fileHandles || fileHandles.length === 0) return;

    const file = await fileHandles[0].getFile();
    currentFilename = file.name;
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            fileData = JSON.parse(e.target.result);
            renderQuestions();
            updateProgress();
            downloadBtn.disabled = false;
        } catch (error) {
            alert('Error al leer el archivo JSON. Asegúrate de que el formato es válido.');
        }
    };
    
    reader.readAsText(file);
}

function renderQuestions() {
    questionsContainer.innerHTML = '';
    
    // Check if empty
    if(fileData.length === 0) {
        questionsContainer.innerHTML = '<div class="empty-state">No se encontraron preguntas en este archivo.</div>';
        return;
    }

    fileData.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `q-${index}`;
        
        const answeredState = q.respuestaCorrecta ? ' (Respondida)' : '';
        
        card.innerHTML = `
            <div class="q-header">
                <span class="q-id">Pregunta ${q.id}</span>
            </div>
            <p class="q-text">${q.pregunta}</p>
            <div class="options-grid">
                ${generateOptionButton(index, 'A', q.opciones.A, q.respuestaCorrecta === 'A')}
                ${generateOptionButton(index, 'B', q.opciones.B, q.respuestaCorrecta === 'B')}
                ${generateOptionButton(index, 'C', q.opciones.C, q.respuestaCorrecta === 'C')}
                ${generateOptionButton(index, 'D', q.opciones.D, q.respuestaCorrecta === 'D')}
            </div>
        `;
        
        questionsContainer.appendChild(card);
    });
}

function generateOptionButton(qIndex, letter, text, isSelected) {
    if (!text) return ''; // Skip empty text
    const selectedClass = isSelected ? 'selected' : '';
    return `
        <button class="option-btn ${selectedClass}" onclick="selectAnswer(${qIndex}, '${letter}')">
            <span class="op-letter">${letter})</span>
            <span>${text}</span>
        </button>
    `;
}

function selectAnswer(qIndex, letter) {
    // Update data
    fileData[qIndex].respuestaCorrecta = letter;
    
    // Update UI
    const card = document.getElementById(`q-${qIndex}`);
    const buttons = card.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        // Find if this is the target
        const btnLetter = btn.querySelector('.op-letter').innerText.charAt(0);
        if (btnLetter === letter) {
            btn.classList.add('selected');
        }
    });

    updateProgress();
}

function updateProgress() {
    questionsAnswered = fileData.filter(q => q.respuestaCorrecta && q.respuestaCorrecta !== "").length;
    const total = fileData.length;
    
    progressText.innerText = `${questionsAnswered} / ${total} Respondidas`;
    const percentage = total === 0 ? 0 : (questionsAnswered / total) * 100;
    progressFill.style.width = `${percentage}%`;
}

function handleDownload() {
    if(fileData.length === 0) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fileData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    
    // Reemplaza "sin_corregir" por la versión final, ej: "preguntas_comunes.json"
    let outName = currentFilename.replace('_sin_corregir', '');
    if(outName === currentFilename) outName = 'corregido_' + currentFilename;
    
    downloadAnchorNode.setAttribute("download", outName);
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
