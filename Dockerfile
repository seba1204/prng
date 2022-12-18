FROM node:latest
EXPOSE 6095/tcp
COPY dist/ /app/dist/
RUN npm install -g serve
ENTRYPOINT ["serve", "-s",  "/app/dist", "-l",  "6095"]