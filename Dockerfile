# 1. build 환경: 보안 패치가 적용된 구체적인 최신 버전 이미지 사용
FROM node:20.18.0-alpine3.20 AS builder

RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. serve 환경: nginx로 정적 파일 제공
FROM nginx:alpine

# Nginx 기본 설정 덮어쓰기
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# React 빌드 결과 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]