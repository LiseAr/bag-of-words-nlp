# Classificador de Texto Simples

> **Readme in English** – [Jump to English section](#simple-text-classifier)

[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg)](LICENSE)  
[![Repositório](https://img.shields.io/badge/Reposit%C3%B3rio-GitHub-green.svg)](https://github.com/lzdeva/bag-of-words-nlp)  
[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)  
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange.svg)](https://github.com/lzdeva/bag-of-words-nlp)

Um exemplo prático e didático de como cálculos matemáticos e álgebra linear são usados para criar um classificador de texto básico. Este projeto foi desenvolvido utilizando **Vite**, **React** e **Tailwind** no frontend, e **Flask** com **Python** no backend.

---

## 🚀 Como Executar

### **Pré-requisitos**

Certifique-se de ter instalado:

- **Python 3.x** ([Download](https://www.python.org/downloads/))
- **Node.js e npm** ([Download](https://nodejs.org/))

---

### **Passos para execução**

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
   python -m venv venv
   source venv/bin/activate  # Para Linux/macOS
   venv\Scripts\activate  # Para Windows
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

## 🧠 Como Funciona

O sistema segue as etapas abaixo:

1. **Entrada de Dados**:

   - O usuário fornece dois arquivos de texto: um contendo palavras positivas e outro com palavras negativas.
   - Esses arquivos são usados para treinar o modelo.

2. **Tokenização e Construção do Vocabulário**:

   - As frases são divididas em palavras únicas, formando um vocabulário dinâmico.

3. **Vetorização (Bag-of-Words)**:

   - Cada frase é convertida em um vetor numérico, onde cada posição representa uma palavra do vocabulário.

4. **Treinamento**:

   - Os vetores das frases positivas e negativas são somados para criar uma representação das classes.

5. **Classificação**:
   - A classificação é feita comparando a similaridade (produto escalar) entre o vetor da frase de entrada e os vetores das classes.

---

## ⚠️ Limitações

- O classificador não consegue determinar se uma palavra é positiva ou negativa quando ela não está presente em nenhum dos arquivos fornecidos pelo usuário.
- A precisão do modelo depende diretamente da qualidade e da quantidade das palavras fornecidas nos arquivos de treinamento.

---

## 🤝 Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

Por favor, certifique-se de seguir os padrões de código e adicionar testes adequados para novas funcionalidades.

---

## 📜 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
