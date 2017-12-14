npm install --production
npm update --production

Compress-Archive -Path .\server.js, .\package.json, .\node_modules -DestinationPath deploy.zip -Force

$user = 'lme-pilot-deploy-user'
$pass = 'w9rZTM5G4RyG86sFpQxDcLQJ7g5p8v7u'

$pair = "$($user):$($pass)"

$encodedCreds = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($pair))

$basicAuthValue = "Basic $encodedCreds"

$Headers = @{
    Authorization = $basicAuthValue
}
Invoke-WebRequest -Uri https://monli-lme-pilot-as.scm.azurewebsites.net/api/zipdeploy -Headers $Headers -Method POST -InFile deploy.zip -ContentType "multipart/form-data"
