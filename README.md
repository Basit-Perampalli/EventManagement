# TaskManagementApp

---

### Frontend Setup

> Step-1 Change the directory to frontend
> ```bash 
>cd frontend
>```

> Step-2 Install all modules
>```bash 
>npm install
>```

> Step-3 Start the react app
>```bash 
>npm run dev
>```

> ####The app will start on port 5173

---

### Backend Setup

> Step-1 Change the directory to backend
>> `cd backend`

> Step-2 Create .env file inside the root backend folder and add this
>```bash
> DATABASE_NAME = <your_database_name>
> DATABASE_USER = <your_database_username>
> PASSWORD = <your_database_password>
> PORT = <your_database_port>
>```
>> Note: Also install postgres if you dont have

> Step-3 Install all the dependency modules
>```bash
> pip install -r requirements.txt
>```

> Step-4 Start the docker container for elasticsearch and kibana
>```bash
> docker-compose up -d
>```
>> Note: Make sure you have docker desktop already installed or download it

> Step-5 Run migration command to setup model in postgres
>```bash
> python manage.py makemigrations
> python manage.py migrate
>```

> Step-6 Create the index in elasticsearch
>```bash
> python manage.py search_index --create
> python manage.py search_index --populate
>```
> ### OR
>```bash
> python manage.py search_index --rebuild
>```
>> Note: Make sure elasticsearch and kibana containers are properly running

> Step-7 Start the django app
>```bash
>python manage.py runserver
>```

> Backend will start on port 8000