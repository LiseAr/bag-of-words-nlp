# Classificador de Texto Simples

> **Readme in English** – [Jump to English section](#simple-text-classifier)

[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg)](LICENSE)  
[![Repositório](https://img.shields.io/badge/Reposit%C3%B3rio-GitHub-green.svg)](https://github.com/lzdeva/bag-of-words-nlp)  
[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)  
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange.svg)](https://github.com/lzdeva/bag-of-words-nlp)

Um exemplo prático e didático de como cálculos matemáticos e álgebra linear são usados para criar um classificador de texto básico. Este projeto foi desenvolvido utilizando **Vite**, **React** e **Tailwind** no frontend, e **Flask** com **Python** no backend.

---

## 🚀 Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/lzdeva/bag-of-words-nlp.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd bag-of-words-nlp
   ```

3. Instale as dependências do frontend e backend:

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```

4. Execute o servidor backend:

   ```bash
   python app.py
   ```

5. Em outro terminal, execute o servidor frontend:

   ```bash
   cd frontend
   npm run dev
   ```

6. Acesse a aplicação no navegador através do endereço fornecido pelo Vite (geralmente `http://localhost:5173`).

---

## 🧠 Entendendo o Funcionamento

O código é dividido em etapas simples:

1. **Entrada de Dados**:

   - O usuário deve fornecer dois arquivos através da interface: um contendo palavras positivas e outro contendo palavras negativas.
   - Esses arquivos serão usados para treinar o modelo.

2. **Tokenização e Vocabulário**:

   - As frases são divididas em palavras únicas, criando um vocabulário.
   - O tamanho do vocabulário é dinâmico e depende das palavras presentes nos arquivos de treinamento.

3. **Vetorizacao (Bag-of-Words)**:

   - Cada frase é convertida em um vetor numérico, onde cada posição representa uma palavra do vocabulário.
   - O vetor tem o mesmo tamanho do vocabulário.

4. **Treinamento**:

   - Soma-se os vetores das frases positivas e negativas para criar representações das classes.

5. **Classificação**:
   - A classificação é feita comparando a similaridade (produto escalar) entre o vetor da frase de entrada e as somas das classes.

---

## ⚠️ Limitações

- O classificador não consegue determinar se uma palavra é positiva ou negativa quando ela não está presente em nenhum dos arquivos fornecidos pelo usuário.
- A precisão do modelo depende diretamente da qualidade e da quantidade das palavras fornecidas nos arquivos de treinamento.

---

## 📜 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

# Simple Text Classifier

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Repository](https://img.shields.io/badge/Repository-GitHub-green.svg)](https://github.com/lzdeva/bag-of-words-nlp)  
[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)  
[![Status](https://img.shields.io/badge/Status-In%20Development-orange.svg)](https://github.com/lzdeva/bag-of-words-nlp)

A practical and didactic example of how mathematical calculations and linear algebra are used to create a basic text classifier. This project was developed using **Vite**, **React**, and **Tailwind** for the frontend, and **Flask** with **Python** for the backend.

---

## 🚀 How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/lzdeva/bag-of-words-nlp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bag-of-words-nlp
   ```

3. Install the dependencies for the frontend and backend:

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```

4. Run the backend server:

   ```bash
   python app.py
   ```

5. In another terminal, run the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

6. Access the application in your browser via the address provided by Vite (usually `http://localhost:5173`).

---

## 🧠 Understanding the Functionality

The code is divided into simple steps:

1. **Data Input**:

   - The user must provide two files through the interface: one containing positive words and the other containing negative words.
   - These files will be used to train the model.

2. **Tokenization and Vocabulary**:

   - Sentences are split into unique words, creating a vocabulary.
   - The size of the vocabulary is dynamic and depends on the words present in the training files.

3. **Vectorization (Bag-of-Words)**:

   - Each sentence is converted into a numerical vector, where each position represents a word from the vocabulary.
   - The vector has the same size as the vocabulary.

4. **Training**:

   - The vectors of positive and negative sentences are summed to create class representations.

5. **Classification**:
   - Classification is performed by comparing the similarity (dot product) between the input sentence vector and the class sums.

---

## ⚠️ Limitations

- The classifier cannot determine whether a word is positive or negative if it is not present in any of the files provided by the user.
- The model's accuracy directly depends on the quality and quantity of the words provided in the training files.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
