# 🚗 Plataforma de Revenda de Veículos - Tech Challenge SOAT

API para listagem de veículos construída com Node.js, Express, TypeScript e Firebase Firestore.

## 📌 Funcionalidades

- Cadastrar/editar/excluir veículos
- Listar disponíveis e vendidos por preço (asc)

## 📁 Estrutura do Projeto

```
src/
├── domain/              # Entidades e erros
├── infra/               # Controllers, repos, rotas, middlewares
├── useCases/            # Regras de negócio
└── index.ts             # Bootstrap do app (Firebase + Express)

k8s/
├── configmap.yaml       # Configuração básica
├── deployment.yaml      # Deployment do app
├── service.yaml         # Service (NodePort/ClusterIP)
├── start-minikube.sh    # Sobe tudo no Minikube e faz port-forward
└── stop-minikube.sh     # Encerra port-forward e limpa recursos

docker-compose.yml       # Dev/Prod local com bind do JSON
Dockerfile               # Build multi-stage
```

## 🔑 Configuração do Firebase (obrigatório)

O app inicializa o Firebase Admin APENAS via arquivo JSON do Service Account.

1. Crie o arquivo na raiz: `fiapsub2-firebase-sdk.json`
2. Adicione o JSON do arquivo fiapsub2-firebase-sdk.json enviado junto com o arquivo do projeto. Infelizmente não consigo compartilhar por aqui por que o firebase bloqueia a key.

## 🚀 Executar local (sem Docker)

```bash
npm install

npm start
```

Swagger endpoint:

- Docs: http://localhost:3000/api-docs

## 🧪 Testes

```bash
npm test
```

## 🐳 Docker

```bash
# Build da imagem
docker build -t fiapsub2 .

# Rodar container (bind do JSON no caminho esperado pelo app)
docker run -p 3000:3000 \
  -v "$PWD/fiapsub2-firebase-sdk.json:/app/fiapsub2-firebase-sdk.json:ro" \
  fiapsub2

# Docker Compose (já faz o bind e seta a env automaticamente)
docker compose up -d --build
```

## ☸️ Minikube (Kubernetes)

Alternativa manual (Todos os Sistemas Operacionais):

```bash
minikube start

# Usar Docker do Minikube
minikube docker-env | Invoke-Expression

docker build -t fiapsub2:latest .

kubectl create secret generic firebase-adminsdk --from-file=fiapsub2-firebase-sdk.json=./fiapsub2-firebase-sdk.json

kubectl apply -f k8s/

# Port-forward do Service (80 -> 3000 local)
kubectl port-forward service/fiapsub2-service 3000:80
```

## 🔧 Tecnologias

- Node.js + TypeScript
- Express.js
- Firebase Admin SDK (Firestore)
- Jest (testes)
- Docker, Kubernetes (Minikube)
- GitHub Actions (CI/CD)
