#install git... 
#create SSH to repository
#if already have ssh key u can skip this part
ssh-keygen -t rsa

vim id_rsa.pub = {Public SSH key for Stash}

#(optional) The internal (eth-lo) HOST. e.g. 127.0.0.1
# - defaults to 127.0.0.1
set environment variable HOST={{your_host_name}}

#(optional) The external domain. e.g. appmodel.nl/appmodel.org
# - defaults to appmodel.org
set environment variable DOMAIN={{your_domain_name}}

#(optional) The internal gateway between (reverse named proxy to internal micro services)
# - defaults to 7081
set environment variable INTERNAL_PROXY_PORT={{INTERNAL_PROXY_PORT}}

#(optional) The exposed Authorization port
# - defaults to 8091
set environment variable EXPOSED_AUTHENTICATION_PORT={{EXPOSED_AUTHENTICATION_PORT}}

#(optional) The models the server will expose to the services
# - Allows wildcards in modelnames.
# - defaults to '*'.
set environment variable ENABLED_MODELS={{KSP,MVO}}

#(optional) Hipchat authorization key
# - defaults to Y9wJuWSkGbOJb5eMiT7GhCtchoQIsjSY9XRF1voW
set environment variable HIPCHAT_API_KEY={{hipchat_api_key}}

#(optional) Postgres database connection URL
# - defaults to postgresql://postgres:postgres@localhost/lme
set environment variable FIGURE_DB_STRING={{database_string}}

#----- VIA DOCKER
git clone ssh://git@stash.topicus.nl:7999/ff/fesjs.git
cd fesjs
docker-compose up

# --- VIA NODEJS latest LTS or higher ---
#expose ports
#set environment parameter to configure DB endpoint {FIGURE_DB_STRING|postgresql://postgres:postgres@localhost/lme}
#?LINUX:sudo firewall-cmd --zone=public --add-port=7080/tcp --permanent
git clone ssh://git@stash.topicus.nl:7999/ff/fesjs.git
cd fesjs
npm install -g concurrently
npm install
docker-compose -f docker-compose-db.yml up
#DEVELOPER/RUN: node devrun.js
#DEVELOPER/DEBUG: node -inspect-brk=0 devrun.js
#TEST/PRODUCTION: npm start

#Release 1.0
# --- SECURITY ---
#default IP = 127.0.0.1, preferred over 'localhost' since 127.0.0.1 also works without internet connection.
#All calls are proxied through {PROXY_PORT|7080} Proxy.js
#Services register with {@Proxy.js} at http://{HOST|localhost}:{PROXY_PORT|7080}/register/service/:name/:host/:port/*
#Authentication via {@SecurityPortal.js} on port {FACEBOOK_PROXY_PORT|8091}
#Authorization via {@SecurityPortal.js} with ACL @{Authorization.js}


#DOCS
# --- FUTURE FEATURES ---
#Dynamic assembling models via DB, like data, but also including dependencies to make subselects from models.
#Authorization via property role: VIEWER|APPROVER|ADMIN Will generate the model dynamically from database. (only required and depending)
 #!Authorization will include combining model and aggregated data.
#Identification via proxy.js, Using latest HEAD resolve current uuid
#Debug via injnection in FunctionMap.js
#Rapportages via HTML5 just like creating a front-end by the designer
#Webhook module, broadcast events when state of data/model changes.
#In ternationalization via constants
#Overview via hint icons in properties-view
#Functionverview in IDE
#10mb request is large enough, files bigger than 10mb should be separated in front-end


Matrix-files are also generated as
Uploaded matrix-files are a rest-api function  /{model_name}/{version}/MATRIX(null,table_name,x,y)
Every save call will implicitly save JBEHAVE,FFL and MATRIX file(s)

link private modules:
from model-test to ffl-math via: npm link ../math                                                              
from model-test to excel-connect via: npm link ../excel-connect 


import './exchange_modules/ffl/RegisterPlainFFLDecorator'
import { DebugManager, FFLToRegister, Register, RegisterToFFL, ScorecardTool } from 'ffl-pack'                                                             