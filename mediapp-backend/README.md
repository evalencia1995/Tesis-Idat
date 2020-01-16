
# Sesion 6
1:42
## Librerias para Angular

primeng  -- https://www.primefaces.org/primeng/

ng bootstrap -- https://ng-bootstrap.github.io/#/home

Angular Material -- https://material.angular.io/

## Instalar Librerias

Instalacion Angular Material cdk(pre dependencia , pre libreria para que angular material funciones) solo una vez al iniciar el proyecto --save lo guarda en package.json

npm install @angular/cdk --save 

Instalacion Angular Material Agregando los componentes necesarios para usarlo y dar inicio al asistente.
HammerJS es para funciones de click presionado por varios segundos (No),
Browser Animations (Yes)

ng add @angular/material

## Comandos Angular

Crear componente ng generate component <component-name>

ng g c <nombre>

Crear componente sin archivo spec

ng g c --spec=false

## Cambiar Version de Angular

npm unistall -g angular -cli

npm cache clean --force

npm install @angular/cli@1.68


------
## Inciar comando cuando no tienes el node_modules

npm install

## Cancelar terminal 

Ctrl + c

## Iniciar Proyecto en puerto diferente

ng serve --port 4500

## Compilar y abrir proyecto en navegador

ng serve --open

# Anotes Git

## Iniciar proyecto Git Local.

git init

git add --A

git status

git commit --m 'Mi Primer commit'

## Agregar un repositorio git remoto al proyecto local.

git remote add origin https://github.com/luizgrc/mediaapp-backend.git

## Obtener el nombre de los repositorios remotos

git remote -v

## Mandar nuestro rama local master al remoto en rama remota origin 

git push origin master

## Mandar nuestro proyecto local al remoto en la rama fork

git push fork 

## Combinar branchs.

git merge origin/master.

## Regresar al commit anterior

git reset --hard

## Obtener ultimas versiones de las ramas remotas

git fetch

## Actualizar tus ramas locales de las remotas

git pull

## Ver Log grafico

git log --graph --oneline --all



---------------------

# Posibles Errores

git push origin master.

! Rejected master -> master (fetch first).

git pull origin master.

! Rejected master -> master(non-fast-forward).

git merge origin/master.

faltal: refusing to merge unrelated histories.

Solucion:

git pull --rebase origin master



---------------------



## Taller Git Anotes

## Git 101

git clone

crea los siguientes carpetas 

>working dir tus archivos
>index(stage) 
>HEAD -> EL UTIMO COMMIT que se hizo


GIT PULL
hace 2 comandos git fetch y get merge
traer los ultimos cambios de la nube y actualiza los cambios de tu repositorio local

## Workflowrs con GIT

estructura de Flow

Mater -> codigo de produccion

Develop -> task

    Feature-001

Release -> 

    Release-1.0

Hotifx -> fixes arreglos

    Fix-001


merge

git checkout feature/task-001

git pull origin Develop

rebase

git checkout feature/task-001

git pull --rebase origin develop


git checkout develop

git reset --hard origin/develop

git checkout -b release-v1.0.0

git push

hitfix

git checkout master

git reset --hard origin/master

git checkout -b Hotifx

git push

Herramientas que investigar

    Gitlens

ITers2

    zsh

    oh-my-zsh

Revisar comandos

git flog
----------------------------------------
ir hasta esa linea de tiempo

git reset --hard origin/master


git pull --rebase origin develop

--actualiza la rama sin importar la linea de tiempo que tenemos en el repositorio

git push -f

cambiar el comentario

git commit --ammend -m '<comentario>

git rebase -i HEAD~2

Git Avanzado 
cd .git/

mkdir branches
mkdir hooks
mkdir hookstoch config
touch configtoch description
mkdir objects
mkdir refs
mkdir refs/heads
mkdir pack
mkdir info
vim HEAD 
ref: refs/heads/master


















