import * as yaml from 'js-yaml';

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(param);
  console.log(`Query parameter "${param}":`, value); // Zaloguj wartość parametru
  return value;
}

async function loadYamlFile(argument1: string): Promise<any> {
  const url = `http://83.168.69.206:2005/plugins/getConfig/${argument1}`;
  console.log(`Fetching YAML from URL: ${url}`); // Zaloguj URL przed fetch
  const response = await fetch(url);
  const yamlText = await response.text();

  console.log('YAML Response:', yamlText);  // Zaloguj odpowiedź przed parsowaniem

  if (!yamlText || yamlText.trim() === '') {
    console.error('Received empty response from server for YAML'); // Zaloguj błąd
    throw new Error('Received empty response from server');
  }

  const data = yaml.load(yamlText);
  console.log('Parsed YAML Data:', data);  // Zaloguj sparsowane dane
  return data;
}

async function loadPluginData(argument1: string): Promise<any> {
  const url = `http://83.168.69.206:2005/plugins/get/${argument1}`;
  console.log(`Fetching plugin data from URL: ${url}`); // Zaloguj URL przed fetch
  const response = await fetch(url);
  const dataText = await response.text();

  console.log('Plugin Data Response:', dataText);  // Zaloguj odpowiedź przed parsowaniem

  if (!dataText || dataText.trim() === '') {
    console.error('Received empty response from server for plugin data'); // Zaloguj błąd
    throw new Error('Received empty response from server');
  }

  const data = JSON.parse(dataText);
  console.log('Parsed Plugin Data:', data);  // Zaloguj sparsowane dane
  return data;
}

async function displayYaml() {
  try {
    const argument1 = getQueryParam('name');
    
    if (!argument1) {
      console.error('Parameter "name" is missing in the URL'); // Zaloguj brakujący parametr
      throw new Error('Parameter "name" is missing in the URL');
    }

    console.log(`Loading plugin data for argument1: ${argument1}`); // Zaloguj argument1

    const pluginData = await loadPluginData(argument1);

    const nameSpan = document.getElementById('name');
    const descParagraph = document.getElementById('desc');
    const youtubeIframe = document.getElementById('youtube') as HTMLIFrameElement;

    if (nameSpan) {
      nameSpan.textContent = pluginData.name;
      console.log('Set name in DOM:', pluginData.name); // Zaloguj nazwę wstawioną do DOM
    }

    if (descParagraph) {
      descParagraph.textContent = pluginData.description;
      console.log('Set description in DOM:', pluginData.description); // Zaloguj opis wstawiony do DOM
    }

    if (youtubeIframe) {
      youtubeIframe.src = pluginData.youtube;
      console.log('Set YouTube iframe src:', pluginData.youtube); // Zaloguj link do YouTube
    }

    console.log(`Loading YAML config for argument1: ${argument1}`); // Zaloguj argument1

    const yamlData = await loadYamlFile(argument1);
    const outputDiv = document.getElementById('configYaml');

    if (outputDiv) {
      outputDiv.innerHTML = `<pre>${JSON.stringify(yamlData, null, 2)}</pre>`;
      console.log('Inserted YAML data into DOM'); // Zaloguj dane YAML wstawione do DOM
    }
  } catch (error) {
    console.error('Error loading plugin data or parsing YAML file:', error);
  }
}

window.onload = displayYaml;
