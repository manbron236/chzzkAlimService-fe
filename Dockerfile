# 1. build 환경: Node.js로 프론트 빌드
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. serve 환경: nginx로 정적 파일 제공
FROM nginx:alpine

# Nginx 기본 설정 덮어쓰기 (선택)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# React 빌드 결과 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
