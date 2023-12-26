from node:18.0 as builder

WORKDIR /app/webgal

COPY . .

# 清NPM缓存
RUN npm cache verify && npm cache clean -f

RUN npm install yarn -g --registry https://registry.npm.taobao.org && yarn && yarn build

FROM nginx:1.12.2

WORKDIR /usr/share/nginx/html

RUN rm -f *

COPY --from=builder /packages/webgal/dist .