# ProjetoLocaliza
Localização com react-native


## M18 Aula 10


## Iniciando:

git::https://github.com/ederpbj/ProjetoLocaliza.git

>Clone

    git clone https://github.com/ederpbj/ProjetoLocaliza.git

>Criar projeto

    react-native init ProjetoLocaliza

>Corrigindo erros

    npm audit fix
    npm i --save-dev jetifier
    npx jetify

>Atualizar yarn

    npm i -g yarn

>Resetar cach

    react-native start --reset-cache

>Autolink

    yarn add react-native-webview

    yarn react-native run-android


>Localização via community

    npm install @react-native-community/geolocation --save


    react-native link @react-native-community/geolocation
    

>Permissões

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LACATION" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    //No IOS
    //Localização
    
    <key>NSLocationWhenInUseUsageDescription</key>
	<string></string>

>Limpar cach

    npm start -- --reset-cache

>Nova tentativa com maps comunit

https://medium.com/@tadeumx1/utilizando-mapas-no-react-native-817c4f4de6f7


    yarn add react-native-maps

    react-native link

>Alterar build

No arquivo build.gradle que está localizado em android/app/build.gradle precisamos apagar essa a linha:

    // Apagar essa linha
    compile project(‘:react-native-maps’)

    // Código correto
    implementation(project(':react-native-maps'))


android/build.gradle precisamos adicionar, a versão do Google Play Services e a versão do mapa que será utilizado.

        buildscript {
        ext {
        buildToolsVersion = "27.0.3"
        minSdkVersion = 16
        compileSdkVersion = 27
        targetSdkVersion = 26
        supportLibVersion = "27.1.1"
        // Adicionar essas linhas
        googlePlayServicesVersion = "11.8.0"
        androidMapsUtilsVersion = "0.5+"
        }

