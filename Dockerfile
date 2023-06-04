# Use the predefined node base image for this module.
FROM node:16

# create the log directory
RUN mkdir -p /var/log/applications/transactionlogger

# Creating base "src" directory where the source repo will reside in our container.
# Code is copied from the host machine to this "src" folder in the container as a last step.
RUN mkdir /src
WORKDIR /src
# COPY yarn.lock ./src
COPY package.json ./src
COPY . /src

# Install node dependencies
RUN yarn global add @nestjs/cli --ignore-engines

# For development environment, we want to use forever to keep the code running
RUN yarn global add pm2@4.4.1 --ignore-engines prisma

# RUN npm i

# RUN yarn build

# RUN prisma generate

# Map a volume for the log files and add a volume to override the code
VOLUME ["/src", "/var/log/applications/transactionlogger"]

# Expose web service and nodejs debug port
EXPOSE  8000
EXPOSE 80

CMD ["pm2-docker", "pm2.json"]

