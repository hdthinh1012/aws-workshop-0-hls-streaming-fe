# # AWS First Cloud Journey Workshop 0: Building HLS Large Video Streaming Web App using AWS EC2, S3

## About the repository
Contain front-end source code for the project, please refer to the writeup for detail explanation and step by step guide for deploying to AWS EC2.

Writeup link at: [Coming soon](./ "Writeup") 

The accompanied back-end repository: [back-end Github Link](https://github.com/hdthinh1012/aws-workshop-0-hls-streaming "Back-end Github Link")

## Step-by-step running
1. Clone the repository
2. Create .env file
```
touch .env
echo VITE_SERVER_URL=<your-server-url> > .env
```
3. Install NVM & Node 18
4. Install dependencies `npm install`
5. Run vite react app in hot-reload mode `npm run dev`