import fitz
import re
import json
import os

def clean_text(text):
    # Intentar limpiar la típica cabecera o pie de página, o dejarlo así 
    # y simplemente limpiar los espacios y saltos de línea excesivos
    text = re.sub(r'PREGUNTAS BATERÍA COMÚN.*?Categorías A, B y C1', '', text, flags=re.IGNORECASE|re.DOTALL)
    text = re.sub(r'ENFERMERO/A\s*PREGUNTAS', '', text, flags=re.IGNORECASE|re.DOTALL)
    # Limpiamos números sueltos que puedan ser numeración de página si están solos en una línea
    text = re.sub(r'\n\s*\d+\s*\n', '\n', text)
    return text

def extract_questions(pdf_path):
    print(f"Abriendo {pdf_path}...")
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    full_text = clean_text(full_text)
    
    # Expresión regular para separar en bloques de preguntas
    # Busca un número, un punto y un guión al inicio de línea o tras espacios
    # ej: "1.-" o " 1 .-"
    pattern_question = re.compile(r'(?:\n|^)\s*(\d+)\s*\.-\s*(.*?)(?=(?:\n|^)\s*\d+\s*\.-\s*|\Z)', re.DOTALL)
    
    questions = []
    
    for match in pattern_question.finditer(full_text):
        q_num_str = match.group(1).strip()
        q_block = match.group(2)
        
        # Ahora separamos el bloque en la pregunta en sí, y las opciones a, b, c, d
        # Buscamos a), b), c) y d)
        
        opt_a_match = re.search(r'(?:\n|^)\s*a\)\s*(.*?)(?=(?:\n|^)\s*b\)|\Z)', q_block, re.DOTALL | re.IGNORECASE)
        opt_b_match = re.search(r'(?:\n|^)\s*b\)\s*(.*?)(?=(?:\n|^)\s*c\)|\Z)', q_block, re.DOTALL | re.IGNORECASE)
        opt_c_match = re.search(r'(?:\n|^)\s*c\)\s*(.*?)(?=(?:\n|^)\s*d\)|\Z)', q_block, re.DOTALL | re.IGNORECASE)
        opt_d_match = re.search(r'(?:\n|^)\s*d\)\s*(.*?)\Z', q_block, re.DOTALL | re.IGNORECASE)
        
        if opt_a_match:
            question_text = q_block[:opt_a_match.start()].strip()
            
            # Limpiamos los saltos de línea de los textos
            question_text = " ".join(question_text.split())
            op_a = " ".join(opt_a_match.group(1).split()) if opt_a_match else ""
            op_b = " ".join(opt_b_match.group(1).split()) if opt_b_match else ""
            op_c = " ".join(opt_c_match.group(1).split()) if opt_c_match else ""
            op_d = " ".join(opt_d_match.group(1).split()) if opt_d_match else ""
            
            questions.append({
                "id": int(q_num_str),
                "pregunta": question_text,
                "opciones": {
                    "A": op_a,
                    "B": op_b,
                    "C": op_c,
                    "D": op_d
                },
                "respuestaCorrecta": ""
            })
    
    # Ordenar por ID para asegurarnos
    questions.sort(key=lambda x: x["id"])
    print(f"Extraídas {len(questions)} preguntas de {os.path.basename(pdf_path)}.")
    return questions

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

if __name__ == '__main__':
    base_dir = r"g:\Mi unidad\Antigravity"
    preg_dir = os.path.join(base_dir, "Preguntas")
    
    comun_path = os.path.join(preg_dir, "Comun.pdf")
    espe_path = os.path.join(preg_dir, "Especificas.pdf")
    
    comun_data = extract_questions(comun_path)
    espe_data = extract_questions(espe_path)
    
    print(f"TOTAL PREGUNTAS EXTRAÍDAS: {len(comun_data) + len(espe_data)}")
    
    out_dir = os.path.join(base_dir, "data")
    ensure_dir(out_dir)
    
    comun_out = os.path.join(out_dir, "preguntas_comunes_sin_corregir.json")
    espe_out = os.path.join(out_dir, "preguntas_especificas_sin_corregir.json")
    
    with open(comun_out, 'w', encoding='utf-8') as f:
        json.dump(comun_data, f, ensure_ascii=False, indent=2)
        
    with open(espe_out, 'w', encoding='utf-8') as f:
        json.dump(espe_data, f, ensure_ascii=False, indent=2)
        
    print(f"Archivos JSON generados en la carpeta {out_dir}")
