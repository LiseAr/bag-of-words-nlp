from flask import Flask, request, jsonify
from flask_cors import CORS  # Para permitir requisições do frontend
import json
import os

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# Função para criar vocabulário e somas
def criar_vocabulario_e_somas(frases_positivas, frases_negativas):
    vocabulario = set()
    for frase in frases_positivas + frases_negativas:
        for palavra in frase.split():
            vocabulario.add(palavra.lower())  # Converter para minúsculas
    
    vocabulario = list(vocabulario)
    
    soma_positivo = [0] * len(vocabulario)
    soma_negativo = [0] * len(vocabulario)
    
    # Somar as ocorrências de palavras para as classes
    for frase in frases_positivas:
        vetor = [0] * len(vocabulario)
        for palavra in frase.split():
            if palavra.lower() in vocabulario:
                indice = vocabulario.index(palavra.lower())
                vetor[indice] += 1
        soma_positivo = [soma_positivo[i] + vetor[i] for i in range(len(vocabulario))]
    
    for frase in frases_negativas:
        vetor = [0] * len(vocabulario)
        for palavra in frase.split():
            if palavra.lower() in vocabulario:
                indice = vocabulario.index(palavra.lower())
                vetor[indice] += 1
        soma_negativo = [soma_negativo[i] + vetor[i] for i in range(len(vocabulario))]
    
    return vocabulario, soma_positivo, soma_negativo

# Função para classificar a frase
def classificar(frase, vocabulario, soma_positivo, soma_negativo):
    vetor = [0] * len(vocabulario)
    for palavra in frase.split():
        if palavra.lower() in vocabulario:
            indice = vocabulario.index(palavra.lower())
            vetor[indice] += 1
    
    similaridade_positivo = sum(vetor[i] * soma_positivo[i] for i in range(len(vocabulario)))
    similaridade_negativo = sum(vetor[i] * soma_negativo[i] for i in range(len(vocabulario)))
    
    if similaridade_positivo > similaridade_negativo:
        return "Positivo"
    else:
        return "Negativo"

# Armazenando os dados do modelo
modelo_path = 'modelo.json'

# Rota para criar o modelo de classificação
@app.route('/criar-modelo', methods=['POST'])
def criar_modelo():
    data = request.json
    frases_positivas = data.get('positivas', [])
    frases_negativas = data.get('negativas', [])
    
    vocabulario, soma_positivo, soma_negativo = criar_vocabulario_e_somas(frases_positivas, frases_negativas)
    
    modelo = {
        'vocabulario': vocabulario,
        'soma_positivo': soma_positivo,
        'soma_negativo': soma_negativo
    }
    
    # Salvar o modelo em um arquivo
    with open(modelo_path, 'w') as f:
        json.dump(modelo, f)
    
    return jsonify({"message": "Modelo criado com sucesso!"})

# Rota para classificar a frase
@app.route('/classificar', methods=['POST'])
def classificar_api():
    # Carregar o modelo salvo
    if not os.path.exists(modelo_path):
        return jsonify({"error": "Modelo não encontrado. Crie o modelo primeiro."}), 400
    
    with open(modelo_path, 'r') as f:
        modelo = json.load(f)
    
    vocabulario = modelo['vocabulario']
    soma_positivo = modelo['soma_positivo']
    soma_negativo = modelo['soma_negativo']
    
    data = request.json
    frase = data.get('frase', "")
    
    resultado = classificar(frase, vocabulario, soma_positivo, soma_negativo)
    
    return jsonify({"resultado": resultado})

if __name__ == "__main__":
    app.run(debug=True)
