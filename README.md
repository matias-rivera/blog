# BLOG

_BlOG App made with NodeJS, Express, MongoDB, ReactJS and NextJS._

_BLOG desarrollado con NodeJS, Express, MongoDB, ReactJS y NextJS._

### Demo :computer:

Esperar a que se cargue el backend.

https://blog-sage-ten.vercel.app

api: https://blogs-example.herokuapp.com/api/

### Instalación 🔧

_1- Clonar el proyecto._

```
git clone https://github.com/matias-rivera/blog.git
```

_2- Instalar las dependencias en la carpeta backend._

```
cd backend
npm install
```

_3- Instalar las dependencias en la carpeta frontend._

```
cd frontend
npm install
```

_4- En backend, renombrar ".env.example" a ".env", asignar valor a cada variable._

_4.1- Configurar SENDGRID para el envío de emails, se debe crear una api key y verificar un sender ._

https://docs.sendgrid.com/ui/account-and-settings/api-keys

https://docs.sendgrid.com/ui/sending-email/sender-verification

_4.2- Obtener el client ID de Google para habilitar la autenticación._

https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

_5- En frontend, renombrar ".env.local.example" a ".env.local", asignar valor a cada variable._

_5.1- Obtener el Disqus Shortname para habilitar los comentarios._

https://help.disqus.com/en/articles/1717063-adding-disqus-to-your-site

_5.2- Obtener el Facebook App ID para habilitar facebook._

https://enfoquenomada.com/app-id-facebook/

_6- Ejecuta los siguientes comandos para inciar el servidor y el cliente.

```
npm run dev // en la carpeta backend
npm run dev // en la carpeta frontend
```

### Preview :mag:

![home](https://i.ibb.co/jLz43mM/blog-pic-main-min.png)
![post](https://i.ibb.co/hmzVnXy/blog-pic-page-min.png)
![login](https://i.ibb.co/HCZL9vS/blog-pic-login-min.png)
![admin](https://i.ibb.co/4FTbqx7/blog-pic-edit-min.png)
