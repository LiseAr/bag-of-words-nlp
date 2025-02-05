from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

modelo_path = 'modelo.json'


def criar_vocabulario(frases_positivas, frases_negativas):
    vocab_set = set()
    for frase in frases_positivas + frases_negativas:
        for palavra in frase.split():
            vocab_set.add(palavra.lower())
    vocabulario = list(vocab_set)
    return vocabulario


def criar_somas(vocabulario, frases_positivas, frases_negativas):
    
    ocorrencia_positivo = [0] * len(vocabulario)
    ocorrencia_negativo = [0] * len(vocabulario)
    
    for frase in frases_positivas:
        for palavra in frase.split():
            palavra = palavra.lower()
            if palavra in vocabulario:
                indice = vocabulario.index(palavra)
                ocorrencia_positivo[indice] += 1

    for frase in frases_negativas:
        for palavra in frase.split():
            palavra = palavra.lower()
            if palavra in vocabulario:
                indice = vocabulario.index(palavra)
                ocorrencia_negativo[indice] += 1
    
    return ocorrencia_positivo, ocorrencia_negativo

def classificar(frase, vocabulario, ocorrencia_positivo, ocorrencia_negativo):
    vetorCorrespondencia = [0] * len(vocabulario)

    for palavra in frase.split():
        palavra = palavra.lower()
        if palavra in vocabulario:
            indice = vocabulario.index(palavra)
            vetorCorrespondencia[indice] += 1

    
    similaridade_positivo = sum(vetorCorrespondencia[i] * ocorrencia_positivo[i] for i in range(len(vocabulario)))
    similaridade_negativo = sum(vetorCorrespondencia[i] * ocorrencia_negativo[i] for i in range(len(vocabulario)))

    
    # Retornando mais dados úteis para a animação
    dados = {
        "vetor_correspondencia": vetorCorrespondencia,
        "similaridade_positivo": similaridade_positivo,
        "similaridade_negativo": similaridade_negativo,
        "percentual_positivo": (similaridade_positivo / (similaridade_positivo + similaridade_negativo + 1)) * 100,
        "percentual_negativo": (similaridade_negativo / (similaridade_positivo + similaridade_negativo + 1)) * 100,
        "palavras_reconhecidas": [vocabulario[i] for i in range(len(vocabulario)) if vetorCorrespondencia[i] > 0]
    }
    
    return dados

@app.route('/criar-modelo', methods=['POST'])
def criar_modelo():
    data = request.get_json()
    
    frases_positivas = data.get('positivas', [])
    frases_negativas = data.get('negativas', [])
    
    if not frases_positivas or not frases_negativas:
        # carrega de arquivo
        try:
            with open('positivas.txt', 'r') as f:
                frases_positivas = f.readlines()
        except Exception as e:
            return jsonify({"error": "Erro ao carregar frases positivas.", "details": str(e)}), 500
        
        try:
            with open('negativas.txt', 'r') as f:
                frases_negativas = f.readlines()
        except Exception as e:
            return jsonify({"error": "Erro ao carregar frases negativas.", "details": str(e)}), 500

    vocabulario = criar_vocabulario(frases_positivas, frases_negativas)


    ocorrencia_positivo, ocorrencia_negativo = criar_somas(vocabulario, frases_positivas, frases_negativas)


    modelo = {
        "vocabulario": vocabulario,
        "ocorrencia_positivo": ocorrencia_positivo,
        "ocorrencia_negativo": ocorrencia_negativo
    }
    
    try:
        with open(modelo_path, 'w') as f:
            json.dump(modelo, f)
    except Exception as e:
        return jsonify({"error": "Erro ao salvar o modelo.", "details": str(e)}), 500

    dados_vis = {
        "vocabulario": vocabulario,
        "ocorrencia_positivo": ocorrencia_positivo,
        "ocorrencia_negativo": ocorrencia_negativo
    }

    return jsonify({
        "message": "Modelo criado com sucesso!",
        "dados_vis": dados_vis
    })


@app.route('/classificar', methods=['POST'])
def classificar_api():
    if not os.path.exists(modelo_path):
        return jsonify({"error": "Modelo não encontrado. Crie o modelo primeiro."}), 400
    
    try:
        with open(modelo_path, 'r') as f:
            modelo = json.load(f)
    except Exception as e:
        return jsonify({"error": "Erro ao carregar o modelo.", "details": str(e)}), 500
    
    vocabulario = modelo.get("vocabulario", [])
    ocorrencia_positivo = modelo.get("ocorrencia_positivo", [])
    ocorrencia_negativo = modelo.get("ocorrencia_negativo", [])
    
    data = request.get_json()
    frase = data.get('frase', '')
    
    if not frase:
        return jsonify({"error": "Frase não fornecida."}), 400

    resultado = classificar(frase, vocabulario, ocorrencia_positivo, ocorrencia_negativo)
    
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)