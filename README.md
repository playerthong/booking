#Structure App:
.
├── README.MD                   <-- This instructions file
├── api                         <-- API booking (Koajs )
|   └── src
|   └── test
|   
├── frontend                    <-- Source code reactjs for frontend booking
│   └── src               
|   └── test   
│       
├── docker-compose.yml          <-- Docker
│
|── README.md                   <-- Instruction


#Install Docker in computuer
## Download docker and install
You could instlal docker via https://www.docker.com/get-started
## Intall docker compose 
https://docs.docker.com/compose/install/

#Install Mongo Db via docker and create db user 
1) Stay at folder `booking` which has docker-compose.yml
2) Run command:
   docker-compose up -d
3) If you want access mongo in docker. You can run command
    docker exec -it mongo /bin/bash 

4) Access mongo in mongo of docker and run like that:
   /# mongo -u root -p rootroot --authenticationDatabase 'admin' 
   > user restaurant
   > db.createUser(
        {
            user: "admin",
            pwd: "12345678",
            roles: [
                { role: "readWrite", db: "restaurant" }
            ]
        }
    )


#Unit Test
https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8