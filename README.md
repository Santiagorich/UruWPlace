
# UruOficial template para wplace.live

## Instalación

<p>
		UruOficial funciona en PC y celular. Fue pensado para Chrome, pero también anda en Edge y algunas versiones de Firefox.
		<br>
		Instrucciones para instalar (hacé click en tu navegador):
		<details>
			<summary>
				<b>Chrome</b> <sup>(Click para ver)</sup>
			</summary>
			<a href="https://www.youtube.com/watch?v=gg5oiJcftEc" target="_blank" rel="noopener noreferrer"><img alt="Tutorial" src="https://img.shields.io/badge/Install_Tutorial-gray?style=flat&logo=YouTube&logoColor=white&logoSize=auto&labelColor=darkred"></a>
			<ol>
				<li>Instalá <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo" target="_blank" rel="noopener noreferrer">TamperMonkey</a> en Chrome.</li>
				<li>Hacé click acá para instalar el script: <a href="https://raw.githubusercontent.com/Santiagorich/UruWPlace/refs/heads/master/UruOficial.user.js" target="_blank" rel="noopener noreferrer"><strong>Instalar UruOficial</strong></a></li>
				<li>Actualizá la página de <a href="https://wplace.live/" target="_blank" rel="noopener noreferrer">wplace.live</a>.</li>
			</ol>
		</details>
		<details>
			<summary>
				<b>Edge</b> <sup>(Click para ver)</sup>
			</summary>
			<ol>
				<li>Instalá <a href="https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd" target="_blank" rel="noopener noreferrer">TamperMonkey</a> en Edge.</li>
				<li>Descargá <a href="https://raw.githubusercontent.com/Santiagorich/UruWPlace/refs/heads/master/UruOficial.user.js" target="_blank" rel="noopener noreferrer">UruOficial.user.js</a>.</li>
				<li>Abrí el dashboard de TamperMonkey y arrastrá el archivo ahí.</li>
				<li>Instalá y activá el script.</li>
				<li>Actualizá la página de <a href="https://wplace.live/" target="_blank" rel="noopener noreferrer">wplace.live</a>.</li>
			</ol>
		</details>
		<details>
			<summary>
				<b>Firefox</b> <sup>(Click para ver)</sup>
			</summary>
			<ol>
				<li>Instalá <a href="https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/" target="_blank" rel="noopener noreferrer">TamperMonkey</a> en Firefox.</li>
				<li>Hacé click acá para instalar el script: <a href="https://raw.githubusercontent.com/Santiagorich/UruWPlace/refs/heads/master/UruOficial.user.js" target="_blank" rel="noopener noreferrer"><strong>Instalar UruOficial</strong></a></li>
				<li>Actualizá la página de <a href="https://wplace.live/" target="_blank" rel="noopener noreferrer">wplace.live</a>.</li>
			</ol>
		</details>
		<details>
			<summary>
				<b>Secuencia de comandos/Userscript</b> <sup>(Click para ver)</sup>
			</summary>
			<p>Si ya tenés un gestor de userscripts instalado:</p>
			<ol>
				<li>Abrí el dashboard de tu gestor de userscripts (TamperMonkey, ViolentMonkey, etc.)</li>
				<li>Hacé click en "Crear nuevo script" o "Create new script"</li>
				<li>Copiá y pegá el código de <a href="https://raw.githubusercontent.com/Santiagorich/UruWPlace/refs/heads/master/UruOficial.user.js" target="_blank" rel="noopener noreferrer">UruOficial.user.js</a></li>
				<li>Guardá el script</li>
				<li>Actualizá la página de <a href="https://wplace.live/" target="_blank" rel="noopener noreferrer">wplace.live</a></li>
			</ol>
		</details>
	</p>

¡Listo! El mod carga la plantilla automáticamente y te muestra el overlay para pintar.

## Servidor Live Tracker (Opcional)

UruOficial incluye un sistema para ver quién está online pintando en tiempo real. 

### Para desarrolladores:
1. Navegá a la carpeta `server/`
2. Ejecutá `npm install` y después `npm start`
3. El servidor correrá en `http://localhost:3000`
4. El userscript detectará automáticamente usuarios online

### Configuración de producción:
Para usar en producción, cambiá la URL en el userscript de `localhost:3000` a tu servidor público.

Soporte: [Discord UruOficial](https://discord.gg/uruoficial)

## Credits

- Based on the [Blue Marble](https://github.com/SwingTheVine/Wplace-BlueMarble) userscript by SwingTheVine
- Modified for the Uruguayan community by Santiagorich
- Logo and assets created by the UruOficial team

## License

This project is licensed under the Mozilla Public License 2.0 (MPL-2.0). See the original Blue Marble project for license details.
