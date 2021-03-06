A lightweight service to map Docker webhooks to custom scripts. 

# Dependencies
+ node 5.1.0
+ npm 3.3.12

# Installation
Clone the repo

`git clone https://github.com/justinthareja/hooky.git`

Install dependencies

`npm install`

Run the server

`node app.js`

# Configuration
+ Include any scripts you wish to be run in the `scripts` folder. Make sure they are executable
`chmod u+x script.sh`
+ Include a map of the hook name and the script in the `config.json` file (no relation to the Docker Hub webhook name)
```
config.json

"hooks": {
    "hello": "hello.sh",
    "upgrade": "upgrade-docker-image.sh"
  }
```
+ Set the `token` to whatever you want and include it as a query parameter on your webhook url

# Link your Docker Hub webhooks

For any build you want to execute a script for include a webhook on your automated build with the following url:

`http://<your_hooky_host>/hooky/<your_hook_name>?token=<your_custom_api_token>`






