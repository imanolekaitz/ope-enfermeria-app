import fitz

def test_pdf(filename, pages=3):
    print(f"--- Extrayendo {filename} ---")
    try:
        doc = fitz.open(filename)
        for i in range(min(pages, len(doc))):
            page = doc.load_page(i)
            text = page.get_text()
            print(f"--- Página {i+1} ---")
            print(text[:1000]) # Imprime primeros 1000 caracteres de cada página
    except Exception as e:
        print(f"Error cargando {filename}: {e}")

if __name__ == '__main__':
    test_pdf(r"g:\Mi unidad\Antigravity\Preguntas\Comun.pdf", 3)
    test_pdf(r"g:\Mi unidad\Antigravity\Preguntas\Especificas.pdf", 3)
