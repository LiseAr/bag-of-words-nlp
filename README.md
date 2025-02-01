# 📌 Classificador de Sentimentos com Álgebra Linear e NLP

Este repositório contém um **classificador de sentimentos simples** baseado em **álgebra linear e Bag-of-Words (BoW)**. Ele demonstra conceitos fundamentais de **Processamento de Linguagem Natural (NLP)** usando operações matemáticas básicas para classificar frases como **positivas ou negativas**.

## 🚀 Funcionalidades
- Criação de um **vocabulário** a partir de frases de treinamento
- Representação de frases como **vetores no espaço vetorial**
- Uso de **produto escalar** para medir similaridade entre frases e classes
- **Normalização de vetores** para evitar viés
- **Visualização gráfica** da relação entre palavras e sentimentos
- Interface interativa para testes com frases do usuário

## 🛠️ Requisitos
Antes de rodar o projeto, instale os seguintes pacotes Python:

```bash
pip install numpy matplotlib
```

## 📥 Instalação e Execução
Clone este repositório e execute o script principal:

```bash
git clone https://github.com/seu-usuario/nlp-algebra-basics.git
cd nlp-algebra-basics
python classificador.py
```

## 📊 Como Funciona
1. O script **gera um vocabulário** com todas as palavras das frases de treinamento.
2. Cada frase é transformada em um **vetor de características** baseado em Bag-of-Words.
3. Os vetores das frases positivas e negativas são somados e normalizados para formar **representações vetoriais das classes**.
4. Para classificar uma nova frase, calculamos a **similaridade pelo produto escalar** com os vetores das classes.
5. A classe com maior similaridade determina o resultado.
6. Um **gráfico de barras** exibe a relação das palavras com os sentimentos.

## 🖥️ Exemplo de Uso
```bash
Bem-vindo ao Classificador de Sentimentos!
Digite uma frase para classificá-la como Positiva ou Negativa.
Digite 'sair' para encerrar.

Frase: Esse filme é ótimo!
Classificação: Positivo

Frase: Estou muito triste hoje.
Classificação: Negativo
```

## 📜 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar! 🎯
