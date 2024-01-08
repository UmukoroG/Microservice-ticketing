# Microservice Ticketing App #
---
Welcome to the Microservice Ticketing App! This project is designed to provide a scalable and modular solution for managing ticketing operations. The application consists of five microservices: `auth`, `orders`, `payments`, `tickets`, and `expiration`. Each microservice is encapsulated in a Docker container and orchestrated using Kubernetes. Skaffold is employed to streamline the Kubernetes deployment process, and the entire project is hosted on Digital Ocean.

App is still in progress and can be accessed here : http://www.microservice-ticketing-sale-app.shop/

## Communications ##
---
In a microservices architecture, communication between services is a critical aspect. One approach to achieve this communication is by using a message broker. In the Microservice Ticketing App, Node.js NATS Streaming Server which is built on top of NATS (Pub/Sub messaging system) is used to communicate between the services. 

`Diagrams and more to be added soon`

## Getting Started ##
---
### Prerequisites ###
---
Make sure you have the following tools installed in your machine:
- Docker
- Kubernetes
- Skaffold
- kubectl
- Digital Ocean account

### Installation ###
---
Clone the repository:
```
git clone https://github.com/umukoroG/microservice-ticketing-app.git
cd microservice-ticketing-app
```
Build the docker images for each microservice:
```
cd auth
docker build -t umukorog2/auth .
# auth service can be changed here but must be updated in the kubernetes depl files
# Repeat for other services
```
Set up Kubernetes cluster on Digital Ocean and configure kubectl:
```
# Install kubectl
# Follow instructions at https://kubernetes.io/docs/tasks/tools/install-kubectl/
```

## Services ##
---
## Auth Service ##
---
The `auth` service handles user authentication and authorization.

## Orders Service ##
---
The `orders` service manages the creation and tracking of orders.

## Payments Service ##
---
The `payments` service is responsible for processing payment transactions.

## Tickets Service ##
---
The `tickets` service handles the creation and management of tickets.

## Expiration Service ##
---
The `expiration` service deals with the automatic expiration of certain resources.

## Kubernetes Deployment ##
---
### Skaffold ##
---
Skaffold simplifies the local development workflow by automating the deployment process. Run the following command to deploy all services using Skaffold:
```
skaffold dev
```
### Digital Ocean Clusters ###
---
The project is hosted on Digital Ocean, with each microservice deployed to its own Kubernetes cluster. Ensure that you have created the necessary clusters on Digital Ocean, and configure kubectl to use them.
```
kubectl config use-context your-cluster-context
```
 