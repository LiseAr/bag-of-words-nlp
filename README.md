# Classificador de Texto Simples

[![Licença](https://img.shields.io/badge/Licença-MIT-blue.svg)](LICENSE)  
[![Repositório](https://img.shields.io/badge/Repositório-GitHub-green.svg)](https://github.com/lzdeva/bag-of-words-nlp)  
[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)  
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange.svg)](https://github.com/lzdeva/bag-of-words-nlp)

Um exemplo prático e didático de como cálculos matemáticos e álgebra linear são usados para criar um classificador de texto básico.

---

## 🚀 Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/lzdeva/bag-of-words-nlp.git
   ```

2. Execute o código:
   ```bash
   cd bag-of-words-nlp
   python classificador_texto.py
   ```

---

## 🧠 Entendendo o Funcionamento

O código é dividido em etapas simples:

1. **Tokenização e Vocabulário**:

   - As frases são divididas em palavras únicas, criando um vocabulário.
   - O tamanho do vocabulário é dinâmico e depende das palavras presentes nas frases de treinamento.
   - Exemplo: Se o vocabulário gerado for `["eu", "adoro", "esse", "filme", "que", "dia", "maravilhoso", "isso", "é", "incrível", "horrível", "estou", "muito", "triste", "terrível"]`, o tamanho do vocabulário será **15**.

2. **Vetorização (Bag-of-Words)**:

   - Cada frase é convertida em um vetor numérico, onde cada posição representa uma palavra do vocabulário.
   - O vetor tem o mesmo tamanho do vocabulário.

3. **Treinamento**:

   - Soma-se os vetores das frases positivas e negativas para criar representações das classes.

4. **Classificação**:
   - A classificação é feita comparando a similaridade (produto escalar) entre o vetor da frase de entrada e as somas das classes.

---

## 💡 Exemplo Prático

Digite uma frase e veja como o classificador funciona:

```bash
Frase: "Que dia incrível!"
Classificação: Positivo
```

Vocabulário gerado:

```
["eu", "adoro", "esse", "filme", "que", "dia", "maravilhoso", "isso", "é", "incrível", "horrível", "estou", "muito", "triste", "terrível"]
Tamanho do vocabulário: 15
```

---

## 📜 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

# Simple Text Classifier

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Repository](https://img.shields.io/badge/Repository-GitHub-green.svg)](https://github.com/lzdeva/bag-of-words-nlp)  
[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)  
[![Status](https://img.shields.io/badge/Status-Under%20Development-orange.svg)](https://github.com/lzdeva/bag-of-words-nlp)

A practical and educational example of how mathematical calculations and linear algebra are used to create a basic text classifier.

---

## 🚀 How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/lzdeva/bag-of-words-nlp.git
   ```

2. Run the code:
   ```bash
   cd bag-of-words-nlp
   python classificador_texto.py
   ```

---

## 🧠 Understanding How It Works

The code is divided into simple steps:

1. **Tokenization and Vocabulary**:

   - Sentences are split into unique words to create a vocabulary.
   - The vocabulary size is dynamic and depends on the words in the training sentences.
   - Example: If the generated vocabulary is `["I", "love", "this", "movie", "what", "a", "great", "day", "this", "is", "amazing", "terrible", "I’m", "feeling", "sad", "awful"]`, the vocabulary size will be **15**.

2. **Vectorization (Bag-of-Words)**:

   - Each sentence is converted into a numerical vector, where each position represents a word in the vocabulary.
   - The vector has the same size as the vocabulary.

3. **Training**:

   - The vectors of positive and negative sentences are summed to create class representations.

4. **Classification**:
   - Classification is done by comparing the similarity (dot product) between the input sentence vector and the class sums.

---

## 💡 Practical Example

Type a sentence and see how the classifier works:

```bash
Sentence: "What an amazing day!"
Classification: Positive
```

Generated vocabulary:

```
["I", "love", "this", "movie", "what", "a", "great", "day", "this", "is", "amazing", "terrible", "I’m", "feeling", "sad", "awful"]
Vocabulary size: 15
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
