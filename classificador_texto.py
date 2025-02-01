# -*- coding: utf-8 -*-
# Passo 1: Definir os dados de treinamento
frases_positivas = ["Eu adoro esse filme", "Que dia maravilhoso", "Isso é incrível"]
frases_negativas = ["Que filme horrível", "Estou muito triste", "Isso é terrível"]

# Passo 2: Pré-processamento (Tokenização e Vocabulário)
def criar_vocabulario(frases_positivas, frases_negativas):
    vocabulario = set()
    for frase in frases_positivas + frases_negativas:
        for palavra in frase.split():
            vocabulario.add(palavra.lower())  # Converter para minúsculas
    return list(vocabulario)

vocabulario = criar_vocabulario(frases_positivas, frases_negativas)
print("Vocabulário:", vocabulario)

# Passo 3: Criar vetores Bag-of-Words (BoW)
def frase_para_vetor(frase, vocabulario):
    vetor = [0] * len(vocabulario)
    for palavra in frase.split():
        palavra = palavra.lower()
        if palavra in vocabulario:
            indice = vocabulario.index(palavra)
            vetor[indice] += 1
    return vetor

# Passo 4: Treinar o modelo (calcular soma das classes)
def treinar_modelo(frases, vocabulario):
    soma_vetor = [0] * len(vocabulario)
    for frase in frases:
        vetor = frase_para_vetor(frase, vocabulario)
        soma_vetor = [soma_vetor[i] + vetor[i] for i in range(len(vocabulario))]
    return soma_vetor

soma_positivo = treinar_modelo(frases_positivas, vocabulario)
soma_negativo = treinar_modelo(frases_negativas, vocabulario)

# Passo 5: Função de classificação (similaridade por produto escalar)
def classificar(frase, vocabulario, soma_positivo, soma_negativo):
    vetor = frase_para_vetor(frase, vocabulario)
    
    # Calcular similaridade com cada classe
    similaridade_positivo = sum(vetor[i] * soma_positivo[i] for i in range(len(vocabulario)))
    similaridade_negativo = sum(vetor[i] * soma_negativo[i] for i in range(len(vocabulario)))
    
    if similaridade_positivo > similaridade_negativo:
        return "Positivo"
    else:
        return "Negativo"

# Passo 6: Interface de linha de comando
def interface_usuario():
    print("\nBem-vindo ao Classificador de Texto Simples!")
    print("Digite uma frase e veja se é classificada como Positivo ou Negativo.")
    print("Digite 'sair' para encerrar.\n")
    
    while True:
        frase = input("Frase: ")
        if frase.lower() == "sair":
            print("Até mais! 👋")
            break
        resultado = classificar(frase, vocabulario, soma_positivo, soma_negativo)
        print(f"Classificação: {resultado}\n")

# Executar a interface
if __name__ == "__main__":
    interface_usuario()
