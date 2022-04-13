# Flux

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Setting up your local environment

The app needs you to provide some secrets as a local `.env.local` file. 
Set it up as follows
```
NEXT_PUBLIC_ETHERSCAN_API_KEY=<< enter the key here >>
```

Install the requirements from the `package.json` file with 
```
npm install 
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Setting up the Docker image


Docker image dependencies are defined in the `Dockerfile` 
Dependencies and trigger is defined in `docker-compose.yaml` file

To build the image for the first time, run
```buildoutcfg
./build.sh
```
This will create the base image and start the container for you 

If there are no changes to the base image and you just want to start the container, then run
```buildoutcfg
./start.sh
```

If there are code refreshes that need to reflected onto the container, run 
```buildoutcfg
./refresh.sh simple
```
to refresh the container, or run
```buildoutcfg
./refresh.sh complete
```
to refresh the base image itself

## Deployments

The docker images required for deployments are managed through GitHub actions,
You can also deploy images manually using the steps below

To login to AWS ECR, run
```buildoutcfg
sudo docker login -u AWS -p $(aws ecr get-login-password --region us-west-2) 622808209417.dkr.ecr.us-west-2.amazonaws.com
```

To build the docker image, run
```buildoutcfg
sudo DOCKER_BUILDKIT=1 docker build -t flux .
```

To create the required repo [ One time thing ]
```buildoutcfg
aws ecr create-repository --repository-name flux --image-scanning-configuration scanOnPush=true --region us-west-2
```

To tag the image the image
```buildoutcfg
sudo docker tag flux 622808209417.dkr.ecr.us-west-2.amazonaws.com/flux
```

To push the image
```buildoutcfg
sudo docker push 622808209417.dkr.ecr.us-west-2.amazonaws.com/flux    
```

To check the newly pushed image
```buildoutcfg
aws ecr describe-images --repository-name flux
```



